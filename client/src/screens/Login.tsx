import { Link } from "react-router-dom"
import { FormEvent, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext"
import OAuth from "../components/OAuth";

interface FormDataType {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate()

    const { setUser } = useUserContext()

    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            console.log(formData);
            const { data } = await axios.post("/api/auth/login", formData)
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data))
            setUser({
                user : data.user,
                token : data.token
            })
            toast.success("Login Successful")
            navigate('/')
        } catch (error: any) {
            console.log(error);
        }
    }




    return (
        <div className='p-3 max-w-lg container mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='email'
                    className='border outline-none p-3 rounded-lg'
                    id='email'
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />


                <input
                    type={'password'}
                    placeholder="password"
                    className="border w-full outline-none p-3 rounded-lg pr-10"
                    id="password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />



                <button
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {/* {loading ? 'Loading...' : 'Sign Up'} */} Login
                </button>


                <OAuth/>
                {/* <OAuth /> */}
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Already Have an account?</p>
                <Link to={'/signup'}>
                    <span className='text-blue-700'>Sign up</span>
                </Link>
            </div>
        </div>
    )
}

export default Login
