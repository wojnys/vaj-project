import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="w-screen">
            <Navbar />
        </div>
    );
}

export default App;
