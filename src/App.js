import './firebase';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./SplashScreen";
import Login from "./Login";
import Signup from "./Signup";
import MainPage from "./MainPage";
import AddContact from "./AddContact";
import Rescue from "./Rescue";
import About from "./About";
import Profile from "./Profile";
import SOS from "./SOS";
import EditProfile from "./EditProfile";
import OneTap from "./OneTap";
import Dashboard from "./Dashboard";
import Alert from "./Alert";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/onetap" element={<OneTap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;