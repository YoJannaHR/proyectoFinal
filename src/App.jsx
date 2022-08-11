import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, ProductsDetail, Purchases} from "./pages";
import { LoadingScreen, NavBar, ProtectedRoutes, Footer } from "./components";
import { useSelector } from "react-redux";


function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="app">
    <HashRouter >
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}> 
        
        <Route path="/purchases" element={<Purchases />} />
        </Route>
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
     

    </HashRouter>
    <Footer/>
    </div>
     
  );
}

export default App;
