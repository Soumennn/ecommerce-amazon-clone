import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter';
import Image from "next/image";
import { useDispatch } from "react-redux";
import {addToBasket, removeFromBasket} from "../slices/basketSlice"

function CheckoutProduct({

    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime

    }) 
    
    {

    const dispatch = useDispatch();    

    const addItemToCart = () => {

        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime

        }
        // pushing item into redux
        dispatch(addToBasket(product));

    };

    const removeItemFromCart = () => {
        // remove item from redux
        dispatch(removeFromBasket({id}))
    }


    return (
        <div className="grid grid-cols-5">
            <Image src={image} width={200} height={200} objectFit = "contain"/>
            
            {/* Middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>

                <div className='flex'>
                {Array(rating).fill().map((_,i)=> (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))
                 }
                </div>

                 <p className='text-xs mt-2 my-2 line-clamp-3 text-justify'>{description}</p>

                <Currency quantity={price*100} currency="INR" />

                {hasPrime && ( 
                    <div className="flex items-center space-x-2 mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500 italic"> Free Delivery on this product</p>
                    </div> 
                )}

            </div>

            {/* right add & remove buttons */}
            <div className='flex flex-col space-y-2 m-auto justify-self-end' >
                <button onClick={addItemToCart} className="button">Add to Cart</button>
                <button onClick={removeItemFromCart} className="button">Remove</button>
            </div>
           
            
        </div>
    )
}

export default CheckoutProduct
