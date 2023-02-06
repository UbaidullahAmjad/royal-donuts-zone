
const OrderDetails = ({confirmedOrder}) => {


    return (
        <div className='order'>
            <h2>Order Details</h2>
            <div className='order-toppings'>
                <h3>Toppings:</h3>
                <ul className='order-toppings-list'>
                   {confirmedOrder.glaze.length > 0 &&
                    <li>{confirmedOrder.glaze[0].name}</li>
                   }
                   {
                    confirmedOrder.topping.length > 0 &&
                    confirmedOrder.topping.map((item)=>{
                        return <li>{item.name}</li>
                    })
                   }
                   {confirmedOrder.sauce.length > 0 &&
                    <li>{confirmedOrder.sauce[0].name}</li>
                   }
                   {
                    confirmedOrder.filling.length > 0 &&
                    <li>{confirmedOrder.filling[0].name}</li>
                   }
                  
                </ul>
            </div>
    
            <div className='order-price'>
                <h3>Total Price:</h3>
                <p className='price'>
                  {confirmedOrder.total}
                </p>
                
                <button
                    className='btn order-btn'
                    aria-label='Confirm Order'
                    disabled = {confirmedOrder.glaze.length == 0 && confirmedOrder.topping.length == 0 && confirmedOrder.sauce.length == 0 && confirmedOrder.filling.length == 0 }
                >
                    Order
                </button>
                
            </div>
        </div>
    );
}

export default OrderDetails