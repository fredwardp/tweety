import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  UserDataContext,
  TokenDataContext,
  AllUserDataContext,
  ReloadContext,
  ReloadProfile,
} from "./context/Context";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import AuthRequired from "./components/Authrequired";
import ProfileReload from "./pages/ProfileReload/ProfileReload";
import ExplorePage from "./pages/ExplorePage/ExplorePage";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [allUser, setAllUser] = useState();
  const [reload, setReload] = useState(true);
  const [reloadProfile, setReloadProfile] = useState(true);
  return (
    <ReloadProfile.Provider value={{ reloadProfile, setReloadProfile }}>
      <ReloadContext.Provider value={{ reload, setReload }}>
        <AllUserDataContext.Provider value={{ allUser, setAllUser }}>
          <UserDataContext.Provider value={{ user, setUser }}>
            <TokenDataContext.Provider value={{ token, setToken }}>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <AuthRequired>
                        <Home />
                      </AuthRequired>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile/:id"
                    element={
                      <AuthRequired>
                        <Profile />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/profile/reload/:id"
                    element={
                      <AuthRequired>
                        <ProfileReload />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/explore"
                    element={
                      <AuthRequired>
                        <ExplorePage />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/verifyEmail"
                    element={
                      <AuthRequired>
                        <VerifyEmail />{" "}
                      </AuthRequired>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </TokenDataContext.Provider>
          </UserDataContext.Provider>
        </AllUserDataContext.Provider>
      </ReloadContext.Provider>
    </ReloadProfile.Provider>
  );
}

export default App;
