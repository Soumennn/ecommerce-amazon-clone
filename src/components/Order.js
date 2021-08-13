import moment from "moment";
import Currency from 'react-currency-formatter'

function Order( {id, amount, amountShipping, items, timestamp, images})
{
    return (
        <div className="relative border rounded-md ">
            <div className="flex items-start  space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className='text-xs font-bold mb-1'> ORDER PLACED :</p>
                    <p className='text-xs ' > {moment.unix(timestamp).format('DD MMM YYYY')} </p>
                </div>

                <div>
                    <p className='text-xs font-bold mb-1'> TOTAL :</p>
                    <p className='text-xs'> <Currency quantity= {amount} currency='INR' />
                        - Express Delivery ( Between 2 - 5 days ) 
                    </p>
                    <p className='text-xs'>
                        <Currency quantity={amountShipping} currency='INR' />
                        &nbsp; ( Shipping Rate )
                    </p>
                </div>

                
                <p className="absolute text-xs font-semibold text-red-800 top-2 right-2 w-40 lg: w-75 truncate self-end whitespace-nowrap">  ORDER # {id} </p>
                <p className='self-end font-bold text-blue-800 text-lg flex-1 text-right'> {items.length} Items </p>  
            </div>


            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map(image => (
                        <img src={image} className='h-20 sm:h-32 object-contain'/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Order
