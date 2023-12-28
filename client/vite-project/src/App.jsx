import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Gallery from "./components/Gallery";
import PostView from "./components/PostView";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import CreatePost from "./components/post/CreatePost";
import EditPost from "./components/post/EditPost";
import { SearchProvider } from "./context/search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch an action to load auth
    dispatch(loadUser());
  }, []);

  return (
    <div
      style={{
        height: "auto",
      }}
    >
      <Toaster />
      <SearchProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
      </SearchProvider>
      <Footer />
    </div>
  );
};

export default App;
