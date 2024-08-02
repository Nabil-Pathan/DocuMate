import { Oval } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className='min-h-screen mx-auto flex justify-center items-center'>
            <Oval
                visible={true}
                height="80"
                width="80"
                  color="#424242"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader