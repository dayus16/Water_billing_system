import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import { ToastContainer } from "react-toastify";
import Taxpayer from "./Components/Taxpayer";
// import Building from "./Components/Building";
// import Assessment from "./Components/Assessment";
// import Bill from "./Components/Bill";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/layout" element={<Layout />}></Route>
          <Route path="/taxpayer" element={<Taxpayer />}>
          {/* <Route path="/building" element={<Building/>}/>
          <Route path="/bill" element={<Bill/>}/>
          <Route path="/assessment" element={<Assessment/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
