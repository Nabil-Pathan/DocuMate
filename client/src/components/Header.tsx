import { Link } from 'react-router-dom'
import { useUserContext } from "../context/UserContext"


const Header = () => {

  const { user } = useUserContext()




  return (
    <header className='bg-gray-300 sticky top-0 z-50 md:px-8 px-3 shadow-md'>
    <div className='flex justify-between items-center  mx-auto p-3'>
      <Link to='/'>
        <h1 className='font-bold text-xl sm:text-xl flex flex-wrap'>
          <span className='text-gray-500'>Google</span>
          <span className='text-gray-500'> Docs</span>
        </h1>
      </Link>
      {/* <ul className='flex justify-between gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline  font-medium hover:underline'>
            Home
          </li>
        </Link>
        <Link to='/problems'>
          <li className='hidden sm:inline  font-medium  hover:underline'>
            Problems
          </li>
        </Link>

      </ul> */}

      {
        user !== null  ? (
          <>
          <Link to='/profile'>
           <img  className='h-12 w-12 object-cover cursor-pointer rounded-full' src={user?.user?.pic} alt="image" />
           </Link>
          </>
        ) : (
          <Link className='bg-slate-100 px-4 py-2 rounded-md font-semibold' to='/login'>
           Login
          </Link>
        )
      }

       
    </div>
  </header>
  )
}

export default Header