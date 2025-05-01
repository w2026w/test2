import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

import Layout from "./components/Layout.jsx";

import { useDispatch } from "react-redux";
import { getMe } from "./redux/features/authSlice.js";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<Home />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
