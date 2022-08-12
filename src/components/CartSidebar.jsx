import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buyCart, getCartThunk } from "../store/slices/cart.slice";
import { useNavigate } from "react-router-dom";
import "../styles/cartSidebar.css";

const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // const [numeration , setNumeration] = useState(0)
   

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  console.log(productsCart);

  
    
    // setNumeration(numeration +1)

  const getTotal = (product) =>{
    let results = 0
    for (let i = 0; i < product.length; i++) {
      results += (product[i].productsInCart.quantity * parseInt(product[i].price))  
    }
    return results
  }

  return (
    <Offcanvas show={show} onHide={handleClose} scroll={true} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><b className="title-cart">My Cart</b></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
   
        {productsCart?.map((productCart) => (
          
          <div className="body-cart" key={productCart.id}>
            <div className="product-cart">
          
            {/* <h4 >Product N°{()=>setNumeration(numeration + 1)}</h4>
            <h4>{numeration}</h4> */}
            <span><b>Category: </b>{productCart.brand}</span>
            
            <a onClick={() => navigate(`/products/${productCart.id}`)}>
            <b>Product :</b> {productCart.title}
            </a> 
            <a> <b>Quantity products:</b> {productCart.productsInCart?.quantity}</a>
            <hr />
            <b>Unit price $ {productCart.price}</b>
            <hr />
            <b>Sub Total Price $ {productCart.productsInCart.quantity * parseInt(productCart.price)} </b>
              </div>
            
            {/* pendiente logo de eliminar */}
          
          </div>
        ))}
         <hr />
        <b>Total Cart $ {getTotal(productsCart)}</b>
        <hr />
        <button className="button-buy" onClick={() => dispatch(buyCart())}>
          buy Cart
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
