import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-6 app-container">
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export default App;