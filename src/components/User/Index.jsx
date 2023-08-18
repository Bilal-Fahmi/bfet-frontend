import { Link } from "react-router-dom"

function Index() {
    return (
        <div className="w-full">
            <h1 className="text-center semibold mt-5 mb-5">Master Mind & Body.</h1>
            <div className="grid grid-cols-2 h-80">
                <Link className="text-white flex items-center justify-center  text-4xl extrabold" style={{
                    background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(/pic/fitmind.jpg)',
                    backgroundPosition: 'center',
                    backgroundSize:'cover'
                }}>Fit Mind</Link>

                <Link className="text-white flex items-center justify-center text-center text-4xl extrabold" style={{
                    background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/pic/fitbody.jpg) ',
                    backgroundPosition: 'center',
                    backgroundSize:'cover'
                }}>Fit Body</Link>


            </div>
        </div>
    )
}

export default Index
