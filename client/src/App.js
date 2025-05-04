import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Main from "./pages/Main/Main.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart/Cart.jsx";

import Layout from "./components/Layout.jsx";

import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/features/authSlice.js";

import { getCart } from "./redux/features/cartSlice.js";
import { selectUserId } from "./redux/features/authSlice.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  React.useEffect(() => {
    if (userId) {
      dispatch(getCart(userId));
    }
  }, [dispatch, userId]);

  return (
    <Layout>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<Home />} />
        <Route path="main" element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
