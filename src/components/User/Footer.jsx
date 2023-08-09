

function Footer(){
    return(
        <div className="bg-black text-white flex flex-row p-10 ">
            <ul className="list-none ">
                <h1 className="semibold">About</h1>
                <li className="light">Our values</li>
                <li className="light">Privacy policy</li>
                <li className="light">Terms & Conditions</li>
            </ul>

            <ul className="list-none ml-5 ">
            <h1 className="semibold">Help</h1>
                <li className="light">Refund policy</li>
                <li className="light">Contact us</li> 
            </ul>
        </div>
    )
}

export default Footer