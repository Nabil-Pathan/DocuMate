import { useCallback, useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { Delta } from 'quill/core';
import { useSocket } from '../hooks/UseSocket';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Document = () => {
    const SAVE_INTERVAL_MS = 2000;
    const { id } = useParams();
    const [quill, setQuill] = useState<Quill>();
    const socket = useSocket();

    const { user } = useUserContext()


    const fetchDocument = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }
            const { data } = await axios.get(`/api/doc/get/${id}`, config)
            if (quill) {
                quill.setContents(data.document.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (quill && user) {
            fetchDocument()
        }
    }, [quill, user])

    useEffect(() => {
        if (socket == null || quill == null) return;

        socket.emit('join-document', id, user?.user.name);
        const handler = (delta: Delta, oldDelta : Delta ,source: string) => {
            if (source !== 'user') return;
              // Log oldDelta to avoid unused variable error
            console.log('Previous Changes:', oldDelta);
            socket.emit('send-changes', id, delta);            
        };
        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const receiveHandler = (delta: Delta) => {
            quill.updateContents(delta);
        };

        socket.on('receive-changes', receiveHandler);

        return () => {
            socket.off('receive-changes', receiveHandler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', id, quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quill]);


    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (username: string) => {
            if (username !== user?.user.name) {
                toast.success(`${username} joined the document`);
            }
        }

        socket.on("user-joined", handler)

        return () => {
            socket.off("user-joined", handler)
        }
    }, [socket, quill])

    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ align: [] }],
        ['image', 'blockquote', 'code-block'],
        ['clean'],
    ];

    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (wrapper == null) return;

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);

        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
        setQuill(q);
    }, []);


    const handleCopyUrl = async () => {
        const url = window.location.href
        await navigator.clipboard.writeText(url)
        toast.success("Url Copied")
    }


    const handleDownload = () => {
        if (!quill) return

        const doc = document.createElement("html")
        const body = document.createElement("body")
        const head = document.createElement("head")

        const style = document.createElement("style")

        style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
        }
    `;

        head.appendChild(style)
        body.innerHTML = quill.root.innerHTML
        doc.appendChild(head)
        doc.appendChild(body)

        const blob = new Blob(['<!DOCTYPE html>', doc.outerHTML], {
            type: 'application/msword',
        });

        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = 'document.doc'
        a.click();
        URL.revokeObjectURL(url);

    }

    return (
        <>

            <div className='flex items-center justify-end gap-4 px-4 py-3'>
                <button onClick={handleCopyUrl} className='bg-blue-600 text-white px-4 py-3 rounded mb-2'>Share</button>

                <button onClick={handleDownload} className='bg-green-600 text-white px-4 py-3 rounded mb-2'>Download</button>

            </div>
            <div className='container' ref={wrapperRef}>
            </div>
        </>

    );
};

export default Document;
