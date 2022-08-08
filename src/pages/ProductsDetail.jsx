import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsListThunk } from "../store/slices/productsList.slice";
import { setPurchases } from "../store/slices/purchases.slice";
import "../styles/productDetail.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";

const ProductsDetail = () => {
  const allproducts = useSelector((state) => state.productsListSlice);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getProductsListThunk());
  }, []);

  console.log(productDetail);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const buttonCarouselNext = () => {
    setIndex(index + 1);
  };

  const buttonCarouselPre = () => {
    setIndex(index - 1);
  };

  return (
    <div className="container mt-5 productDetail">
      <div className="container-productDetail">
        {/* <img
          className="image-productDetail"
          src={productDetail?.productImgs}
          alt=""
        /> */}

        <Carousel activeIndex={index} onSelect={handleSelect}>
          {productDetail?.productImgs?.map((img) => (
            <Carousel.Item>
              <img className="d-block  image-productDetail" src={img} alt="First slide" />
            </Carousel.Item>
          ))}
        </Carousel>
       

        <div className="description-productDetail">
          <h1>{productDetail?.title}</h1>
          <p>{productDetail?.description}</p>
          <p>{productDetail?.price}</p>
          <button onClick={() => dispatch(setPurchases(productDetail))}>
            Compra
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
                <Card.Img variant="top" src={product.productImgs} />
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
