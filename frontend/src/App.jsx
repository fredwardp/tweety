import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataContext, TokenDataContext } from "./context/Context";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <TokenDataContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login " element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/verifyEmail" element={<VerifyEmai />} />
          </Routes>
        </BrowserRouter>
      </TokenDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
