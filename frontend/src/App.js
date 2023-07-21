import "./App.css";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js"
import Homepage from "./Pages/home.js";
import Aboutpage from "./Pages/Aboutpage.js";
import Contactpage from "./Pages/Contactpage.js";
import Signuppage from "./Pages/signuppage.js";
import Loginpage from "./Pages/Loginpage.js";
import ForgetPasswordPage from "./Pages/forget-password.js";
import ResetPasswordPage from "./Pages/reset-password.js";
import Dashboard from "./Pages/Dashboard.js";
import Notfoundpage from "./Pages/notfoundpage.js";
import VerificationSuccessPage from "./Pages/verification-succes.js";
import PdfViewPage from "./Pages/Pdf-view-page.js";
import ProtectedRoute from "./ProtectedRoute.js";
import AdminProtectedRoute from "./AdminProtectedRoute.js";
import VerifySuccess from "./VerifySuccess.js";
import {AppProvider} from "./searchContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
   <AppProvider>
    <div className="App">
      <Navbar/>
    <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/signup" element={<ProtectedRoute
          Component={Signuppage}/>} />
          <Route path="/login" element={<ProtectedRoute Component={Loginpage}/>} />
          <Route path="/forget-password" element={<ForgetPasswordPage/>} />
          <Route path="/reset-password/:token" element={<ProtectedRoute Component={ResetPasswordPage}/>} />
          <Route path="/dashboard" element={<AdminProtectedRoute
          Component={Dashboard}/>} />
          <Route path="/verify-success" element={<VerifySuccess
          Component={VerificationSuccessPage}/>} />
          <Route path="/pdf-view-page/:id" element={<PdfViewPage/>} />
          <Route path="/*" element={<Notfoundpage />} />
        </Routes>
         </div>
        <Footer/>
       </div>
        </AppProvider>
      </Router>
  );
}

export default App;
