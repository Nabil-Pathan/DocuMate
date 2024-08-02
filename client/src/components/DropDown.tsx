import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate}  from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Dropdown = ( { open , imageUrl }: { open: boolean , imageUrl : string | undefined}) => {

  const { setUser } = useUserContext()

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e : any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);


  const  handleLogout = ()=>{
    localStorage.removeItem("userInfo")
    setIsOpen(!open)
    setUser(null)
    navigate('/login')
    toast.success("Logout Success")
  }

  return (
    <div ref={dropdownRef} className={`${open ? 'z-[-1]' : 'z-0'} relative inline-block text-left`}>
      <div>
        {/* <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon className='text-xl' icon={faEllipsisVertical} />
        </button> */}

        <img
         onClick={toggleDropdown}
         className='h-10 w-10 rounded-full object-cover cursor-pointer' src={imageUrl} alt="" />
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            
            <Link
              to='/profile'
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={()=> setIsOpen(!isOpen)}
            >
              Profile
            </Link>

            <button
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;