import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buyCart, getCartThunk } from "../store/slices/cart.slice";
import { useNavigate } from "react-router-dom";
import "../styles/cartSidebar.css";

const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
 

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  console.log(productsCart);

  return (
    <Offcanvas show={show} onHide={handleClose} scroll={true} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><b>Cart</b></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        {productsCart?.map((productCart) => (
          <div className="body-cart" key={productCart.id}>
            <span>{productCart.brand}</span>
            <b onClick={() => navigate(`/products/${productCart.id}`)}>
              {productCart.title}
            </b>
            <a>Quantity products: {productCart.productsInCart.quantity}</a>
            <b>{productCart.price}</b>
            <hr />
            {/* pendiente logo de eliminar */}
       
          </div>
        ))}
        <button className="button-buy" onClick={() => dispatch(buyCart())}>
          buy Cart
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
