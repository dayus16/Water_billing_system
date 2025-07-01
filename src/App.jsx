import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import { ToastContainer } from "react-toastify";
import Taxpayer from "./Components/Taxpayer";
import Building from "./Components/Building";
import Nopage from "./Components/Nopage";
import Assessment from "./Components/Assessment";
import Bill from "./Components/Bill";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/taxpayer"
            element={
              <ProtectedRoute>
                <Taxpayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/building"
            element={
              <ProtectedRoute>
                <Building />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bill"
            element={
              <ProtectedRoute>
                <Bill />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
