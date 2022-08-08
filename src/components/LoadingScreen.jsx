import React from "react";
import "../styles/loadingScreen.css";
import Spinner from 'react-bootstrap/Spinner';
const LoadingScreen = () => {
  return (
    <div className="overlay">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingScreen;
