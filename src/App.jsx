import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/common/Header";
import Profile from "./pages/Profile";
export default function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/me" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}