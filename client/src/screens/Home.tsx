import  { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CreateDocModal from '../components/CreateDocModal'
import DocumentImage from "../images/document2.png"
import Loader from '../components/Loader'

interface DocumentType {
  _id : string
  title : string
  data: any;
  owner: string;
  collaborators : string[]
}

const Home = () => {

  const { user } = useUserContext()

  const [loading , setLoading] = useState(false)


  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState<DocumentType[]>([])


  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`/api/doc/getall`,config)
      setDocuments(data.documents);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  useEffect(() => {
    if (user) {
      fetchDocuments()
    }
  }, [user])


  return (
    <>
      {
        showModal ? (<CreateDocModal setShowModal={setShowModal} />)  : loading ? (<Loader/>) :(
          <div className='container mx-auto md:px-10 px-4 md:py-8 py-3'>
            <div className='grid md:grid-cols-5 grid-cols-2'>
              <button onClick={() => setShowModal(true)}>
                <div className='bg-gray-200  flex items-center justify-center py-12'>
                  <FontAwesomeIcon className='text-3xl' icon={faPlus} />
                </div>
              </button>

              {
                documents.map((document : DocumentType)=>{
                  return (
                    <>
                    <Link to={`/document/${document._id}`}>
                     <div className='p-3 flex flex-col items-center justify-center '>
                      <img className='h-28 w-28' src={DocumentImage} alt="" />
                      <h1 className='text-center  font-bold'>{document.title}</h1>
                     </div>
                     </Link>
                     </>
                  )
                })
              }
            </div>
          </div>
        )
      }

    </>
  )
}

export default Home