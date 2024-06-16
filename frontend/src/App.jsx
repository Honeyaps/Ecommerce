import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin/admin";
import AdminForm from "./Admin/form";
import Main from "./Model/main";
import CartModal from "./Pages/cart";
import Newin from "./Pages/newin";
import Email from "./Registration/Forgot/email";
import Otp from "./Registration/Forgot/otp";
import Reset from "./Registration/Forgot/reset";
import Registration from "./Registration/regis";
import Viewcard from "./Pages/viewcard";

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
        <Route path="/newin" element={<Newin />}></Route>
        <Route path="/cart" element={<CartModal />}></Route>
        <Route path="/viewcard" element={<Viewcard />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
