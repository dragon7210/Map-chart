import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Back from "./pages/back/back";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back" element={<Back />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
