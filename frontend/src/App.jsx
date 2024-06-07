import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Registration/regis";
import Home from "./Pages/home";
import Email from "./Registration/Forgot/email";
import Otp from "./Registration/Forgot/otp";
import Reset from "./Registration/Forgot/reset";
import Main from "./Model/main";
import AdminForm from "./Admin/form";
import Admin from "./Admin/admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/email" element={<Email />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
        <Route path="/adminlogin" element={<AdminForm />}></Route>
        <Route path="/admin" element={<Admin />}></Route>

        
      </Routes>
    </BrowserRouter>
  );
}
