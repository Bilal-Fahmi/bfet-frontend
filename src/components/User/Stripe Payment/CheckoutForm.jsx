import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function CheckoutForm() {
    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <Button disabled={isProcessing} id="submit">
                    <span>
                        {isProcessing?"Processing...":"Pay now"}
                    </span>
                </Button>
                {message && <div id="payment-message">{ message}</div>}
            </form>
        </div>
    )
}


