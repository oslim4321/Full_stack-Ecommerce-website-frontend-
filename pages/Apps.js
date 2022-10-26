import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Description from '../interface/Products/Description'
import { GlobalDisplayAlert } from '../Context/Alert'
import Home from '../interface/HomePage/Home'
import Navbar from '../interface/NavbarItem/Navbar'
import DisplayErrorAlert from '../interface/NotFound/DisplayErrorAlert'
import Errorpage from '../interface/NotFound/Errorpage'
import Products from '../interface/Products/Products'
import ProductOverView from '../interface/Products/ProductOverView'
import Checkout from '../interface/Products/Checkout'
import SignUp from '../interface/Registration/SignUp'
import FailedPaymet from '../interface/Products/Payment/FailedPaymet'
import SuccessPayment from '../interface/Products/Payment/SuccessPayment'
import Login from '../interface/Registration/Login'
import UserOrdersProducts from '../interface/Products/Order/UserOrdersProducts'
function App() {
  const { alert, showAlert } = GlobalDisplayAlert()
  return (
    <>
      {
        alert.show && <DisplayErrorAlert {...alert} removeAlert={showAlert} />
      }

      <Router>
        <div className='pb-5'><Navbar /></div>
        <Routes>
          {/* <Route path='/' element={<Home />}></Route> */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/descript/:id' element={<Description />}></Route>
          <Route path='/product/:id' element={<Products />}></Route>
          <Route path='/ProductOverView' element={<ProductOverView />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/order' element={<UserOrdersProducts />}></Route>
          <Route path='/SuccessPayment' element={<SuccessPayment />}></Route>
          <Route path='/FailedPaymet' element={<FailedPaymet />}></Route>
          <Route path='/Signup' element={<SignUp />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='*' element={<Errorpage />}></Route>

        </Routes>
      </Router>

    </>
  )
}

export default App