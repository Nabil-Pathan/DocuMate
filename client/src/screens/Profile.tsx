"use client"

import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import axios from 'axios'
import Loader from '../components/Loader'

const Profile = () => {
  const { user, setUser } = useUserContext()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(user?.user?.name)
  const [email, setEmail] = useState(user?.user?.email)
  const [pic, setPic] = useState(user?.user?.pic)
  const [file, setFile] = useState<File | null>()
  const [uploading, setUploading] = useState(false)
  // const [filePer, setFilePer] = useState<number | null>()
  const [password, setPassword] = useState("")
  const [loading , setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (user && user.user) {
      setName(user.user.name)
      setEmail(user.user.email)
      setPic(user.user.pic)
    } else {
      // Fetch user data from local storage if available
      const storedUser = JSON.parse(localStorage.getItem("userInfo") || '{}')
      if (storedUser && storedUser.user) {
        setUser(storedUser)
        setName(storedUser.user.name)
        setEmail(storedUser.user.email)
        setPic(storedUser.user.pic)

      }
    }
  }, [user, setUser])

  const handleLogout = () => {
    try {
      localStorage.removeItem("userInfo")
      setUser(null)
      toast.success("Logout Successful")
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
        // setFilePer(progress)
      }, (error) => {
        console.log(error)
        setUploading(false)
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setPic(downloadUrl)
            setUploading(false)
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleUpdate = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.post(`/api/user/update`, { name, email, password, pic }, config)
      setUser({
        user: data.user,
        token: user?.token // retain the current token
      })
      localStorage.setItem("userInfo", JSON.stringify({
        user: data.user,
        token: user?.token
      }))
      setLoading(false)
      toast.success("Profile updated successfully")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
    {
      loading ? (
        <Loader/>
      ) : (
        <div className='min-h-screen flex flex-col items-center bg-gray-100 py-8'>
      <div className='w-full md:max-w-md rounded-lg p-6'>
        {
          user && user.user ? (
            <>
              <div className='flex flex-col items-center mb-6'>
                <input
                  hidden accept='image/*'
                  ref={fileRef}
                  className='hidden' type="file"
                  onChange={handleFileChange} />
                <img onClick={() => fileRef.current && fileRef.current.click()} src={pic} alt="Profile Picture" className='cursor-pointer h-24 w-24 rounded-full object-cover mb-4' />

                {
                  uploading && (
                    <h1 className='text-xl mt-3'>Uploading...</h1>
                  )
                }
                <h1 className='text-3xl font-bold text-center mb-2'>Hello, {user.user.name}</h1>
                <p className='text-gray-600 text-center'>{user.user.email}</p>
              </div>
              <form onSubmit={handleUpdate} className='space-y-4'>
                <div>
                  <label htmlFor='name' className='block text-gray-700 font-semibold mb-1'>Name</label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-gray-700 font-semibold mb-1'>Email</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div>
                  <label htmlFor='password' className='block text-gray-700 font-semibold mb-1'>Password</label>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <button
                    type='submit'
                    className='bg-gray-800 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Update
                  </button>
                </div>
              </form>
              <div className='mt-6'>
                <button
                  onClick={handleLogout}
                  className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <h1 className='text-center text-gray-700'>Loading...</h1>
          )
        }
      </div>
    </div>
      )
    }
    
    </>
  )
}

export default Profile
