import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import "../styles/purchases.css";

const Purchases = () => {
const purchases = useSelector(state =>state.purchases)    

const dispatch = useDispatch();
console.log( purchases)

useEffect( () => {

    dispatch(getPurchasesThunk())
},[])
    return (
        <div className="container mt-5">
            <div className='largo'>
            <h1>My purchases</h1>
            {
                   purchases?.length?(
                   
                        purchases.map((purchase) => (
                        
                            <div className='order' key={purchase.id}>
                                <div className='header-orders'>
                                <div> <span>Order Number:</span> {purchase.id}</div>
                               
                                <div><span> Order Date: </span>{purchase.createdAt.slice (0,10)}</div>
                                 
                                </div>
                                <hr />
                                {
                                    purchase.cart.products.map((product) => (
                                        <div className='body-orders' key={product.id}>
                                            <h4 className='title-order'>{product.title}</h4>
                                            <span className='quantity-order'>{product.productsInCart.quantity}</span>
                                            <span className='price-order'>${product.price}</span>
                                        </div>
                                    ))
                                }
                               
                            </div>
                        ))
        
                        ):(<p>No products yet</p>)
                     
            }
          </div>
        </div>
    );
};

export default Purchases;