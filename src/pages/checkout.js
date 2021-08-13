import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from 'react-currency-formatter';
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { session, useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const total = useSelector(selectTotal);
    const items = useSelector(selectItems);
    const [session] = useSession();

    const createCheckoutSession = async ()=> {
        const stripe = await stripePromise;

        // call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
            items: items,
            email: session.user.email
        });

        // redirect user/checkout to Stripe Checkout: 
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if(result.error) alert(result.error);
        
    };

    return (
        <div className="bg-gray-100">
            <Header /> 

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left Section */}
                <div className='flex-grow m-5 sm'>
                    <Image 
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 mt-5 space-y-10 bg-white'>
                        <h2 className='text-3xl border-b pb-4 font-bold text-blue text-indigo-800' >
                            {items.length === 0
                            ? "Your Cart is Empty"
                            : "Shopping Cart"}
                        </h2>  

                        {items.map((item,i)=> (
                            <CheckoutProduct  
                                key = {i}
                                id = {item.id}
                                title = {item.title}
                                rating = {item.rating}
                                price = {item.price}
                                description = {item.description}
                                category = {item.category}
                                image = {item.image}
                                hasPrime = {item.hasPrime}
                            
                            />
                        ))}
                    </div>
                </div>



                {/* Right Section */}
                
                    {items.length > 0 && (
                        <div className='flex flex-col bg-white p-10 shadow-md'>
                            <>
                                <h2 className='whitespace-nowrap'>
                                    Subtotal ({items.length} items): &nbsp; 
                                    <span className="font-bold">
                                    <Currency quantity={total*100} currency="INR"/>
                                    </span>
                                </h2>

                                <button 
                                role = 'link'
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 
                                ${!session && 
                                'from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed'
                                }`} 
                                >
                                    {!session ? "Sign in to checkout":"Proceed to checkout"};

                                </button>
                            
                            </>

                        </div>
                    )}
                

            </main>
        </div>
    );
}

export default Checkout
