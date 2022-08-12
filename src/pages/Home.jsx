import React, { useEffect, useState } from "react";
import {
  filterCategoryThunk,
  filterHeadlineThunk,
  getProductsListThunk,
} from "../store/slices/productsList.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const productsList = useSelector((state) => state.productsListSlice);
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  useEffect(() => {
    dispatch(getProductsListThunk());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  // console.log(categories);

  return (
    <div className="container mt-5">
      <Row>
        <Col lg={3}>
          <ListGroup as="ul">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                as="li"
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
   

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchValue(e.target.value)}
              value={capitalizeFirstLetter(searchValue)}
            />
            <Button
              variant="outline-Dark"
              className="btn btn-secondary"
              id="button-addon2"
              onClick={() => dispatch(filterHeadlineThunk(searchValue))}
            >
              Button
            </Button>
          </InputGroup>

          <Row xs={1} md={2} xl={3} className="g-4">
            {productsList?.map((product) => (
              <div
                key={product?.id}
                onClick={() => navigate(`/products/${product?.id}`)}
              >
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        className="imgProducts"
                        src={product.productImgs}
                      />

                      <Card.Title>{product?.title}</Card.Title>
                      <Card.Text> Price</Card.Text>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
