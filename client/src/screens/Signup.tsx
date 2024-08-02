import { Link } from "react-router-dom"
import { FormEvent, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface FormDataType {
    name : string;
    email : string;
    password : string;
}


const Signup = () => {


    const navigate = useNavigate()

    const [formData , setFormData] = useState<FormDataType>({
        name : "",
        email : "",
        password : ""
    })

    const handleSubmit = async (e : FormEvent)=>{
        try {
             e.preventDefault()
            //  console.log(formData);
             const { data } = await axios.post("/api/auth/signup",  formData)
             console.log(data.user);
             toast.success("Signup Successful")
             navigate('/')
        } catch (error:any) {
             console.log(error.message);
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='username'
        className='border p-3 outline-none rounded-lg'
        id='username'
        onChange={(e)=> setFormData({...formData , name : e.target.value}) }
      />
      <input
        type='email'
        placeholder='email'
        className='border outline-none p-3 rounded-lg'
        id='email'
        onChange={(e)=> setFormData({...formData , email: e.target.value}) }

      />
      <input
        type='password'
        placeholder='password'
        className='border outline-none p-3 rounded-lg'
        id='password'
        onChange={(e)=> setFormData({...formData , password : e.target.value}) }

      />

      <button
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 font-semibold'
      >
        Signup
      </button>
      {/* <OAuth/> */}
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={'/login'}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
    </div>
    
  </div>
  )
}

export default Signup