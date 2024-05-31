import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Registration/regis";
import Home from "./Pages/home";
import Email from "./Registration/Forgot/email";
import Otp from "./Registration/Forgot/otp";
import Reset from "./Registration/Forgot/reset";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/email" element={<Email />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
