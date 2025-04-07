import React, { Suspense, lazy, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import ProtectWrapper from "./components/Protect/ProtectWrapper";
import { StoreContext } from "./Context/StoreContext";


const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const Verify = lazy(() => import ("./pages/Verify/Verify"));
const MyOrders = lazy(() => import ("./pages/MyOrders/MyOrders"));


const App = () => {
  // const [showLogin, setShowLogin] = useState(false);
  const { showLogin, setShowLogin } = useContext(StoreContext);

  return (
    <BrowserRouter>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route
            path="/cart"
            element={
              <ProtectWrapper>
                <Cart />
              </ProtectWrapper>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectWrapper>
                <PlaceOrder />
              </ProtectWrapper>
            }
          />

          <Route
            path="/verify"
            element={
            <ProtectWrapper>
                <Verify/>
            </ProtectWrapper>
            }
          />

          <Route
            path="/myorders"
            element={
            <ProtectWrapper>
               <MyOrders/>
            </ProtectWrapper>
           }
          />
          
          
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
