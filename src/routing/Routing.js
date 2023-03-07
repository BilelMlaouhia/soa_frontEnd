import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientProfile from "../components/client/ClientProfile";
import Devis from "../components/devis/Devis";
import Home from "../components/home/Home";
import { LoginContainer } from "../components/login/FluidInput";

export default function Routing() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginContainer/>} />
            <Route path="/home/*" element={<Home/>}   />
            <Route path="clients/*" element={<ClientProfile/>}  />
            <Route path="/creeDevis" element={<Devis/>} />
            <Route path="*" element={<LoginContainer/>} />
         
        </Routes>
      </BrowserRouter>
    );
  }