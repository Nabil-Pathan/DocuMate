import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CreateDocModalProps {
  setShowModal: (show: boolean) => void;
}

const CreateDocModal: React.FC<CreateDocModalProps> = ({ setShowModal }) => {

    const { user } = useUserContext()

    const navigate = useNavigate()

    const [title , setTitle] = useState<String>("")

    const handleCreateDocument = async()=>{
        try {
            
          const config = {
           headers :{
             Authorization : `Bearer ${user?.token}`
           }
          }
          const { data } = await axios.post('/api/doc/create', {title}, config)
          toast.success('Document Created')
          if(data.document){
            navigate(`/document/${data.document._id}`)
          }
       } catch (error) {
         console.log(error);
       }
      }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full max-w-lg mx-auto my-6">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font-semibold">Create a New Document</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black text-center h-6 w-6 text-3xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="docTitle">
                Title of Document
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="docTitle"
                type="text"
                placeholder="Enter document title"
                onChange={(e)=> setTitle(e.target.value) }
              />
            </div>
            {/* footer */}
            <div className="flex items-center justify-around p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="bg-red-600 text-white font-bold uppercase px-8 py-3 text-sm rounded-md shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCreateDocument}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CreateDocModal;
