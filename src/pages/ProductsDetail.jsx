import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsListThunk } from "../store/slices/productsList.slice";
import { Card, Col, Row, Carousel } from "react-bootstrap";
import { addCarThunk } from "../store/slices/cart.slice";
import "../styles/productDetail.css";

const ProductsDetail = () => {
  const allproducts = useSelector((state) => state.productsListSlice);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsListThunk());
  }, []);

  useEffect(() => {
    const productFind = allproducts.find(
      (productItem) => productItem.id === Number(id)
    );
    setProductDetail(productFind);

    const filterdProducts = allproducts.filter(
      (productItem) => productItem.category.id === productFind.category.id
    );
    setSuggestedProducts(filterdProducts);
  }, [allproducts, id]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const addCart = () => {
    alert("Añadido a cart");
    const cart = {
      id: productDetail.id,
      quantity: quantity,
    };

    dispatch(addCarThunk(cart));
  };

  return (
    <div className="container mt-5 productDetail">
      <div className="container-productDetail" >
        <Carousel className="img"  activeIndex={index} onSelect={handleSelect} variant="dark">
          {productDetail?.productImgs?.map((img) => (
            <Carousel.Item  key={img} >
              <img
                className="d-block image-productDetail"
                src={img}
                alt="First slide"
              
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="description-productDetail">
          <h1>{productDetail?.title}</h1>
          <p>{productDetail?.description}</p>
          <h3>
            <span>$</span>
            {productDetail?.price}
          </h3>
          <input
            className="form-control me-sm-2"
            type="number"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            buy now
          </button>
        </div>
      </div>

      {/* productos relacionados */}
      <h4>Discover similar items</h4>
      <Row xs={1} md={2} className="g-4">
        {suggestedProducts.map((product) => (
          <div
            onClick={() => navigate(`/products/${product.id}`)}
            key={product.id}
          >
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={product.productImgs}
                  className="similar-items"
                />
                <Card.Body>
                  <Card.Title> {product.title}</Card.Title>
                  <Card.Text>
                    <span>Price</span>
                    <br /> <span>${product.price}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default ProductsDetail;
