import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
export default function App() {

  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}