import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabuleiro from "./game/Game";
import Divisor from "./divisor_de_conta/divisor";
import Conversor from "./conversor_numeral_romano/conversor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tabuleiro />} />
        <Route path="/Conversor" element={<Conversor />} />
        <Route path="/Divisor" element={<Divisor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
