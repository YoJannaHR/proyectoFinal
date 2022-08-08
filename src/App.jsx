
import { HashRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { Home, Login, ProductsDetail, Purchases, Cart } from "./pages";
import {LoadingScreen, NavBar} from './components'
import {useSelector} from 'react-redux'

function App() {

const isLoading = useSelector(state =>state.isLoading)
 

  return (
    
    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:id" element={<ProductsDetail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/purchases" element={<Purchases/>}/>
          <Route path="/cart" element={<Cart/>}/>
 
      </Routes>
    </HashRouter>

  )
}

export default App
