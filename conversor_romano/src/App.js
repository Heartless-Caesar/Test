import React, { useState } from "react";
import "./App.css";

const converterParaRomano = (num) => {
  let romanNumeral = "";

  while (num !== 0) {
    if (num >= 1000) {
      romanNumeral += "M";
      num -= 1000;
    } else if (num >= 900) {
      romanNumeral += "CM";
      num -= 900;
    } else if (num >= 500) {
      romanNumeral += "D";
      num -= 500;
    } else if (num >= 400) {
      romanNumeral += "CD";
      num -= 400;
    } else if (num >= 100) {
      romanNumeral += "C";
      num -= 100;
    } else if (num >= 90) {
      romanNumeral += "XC";
      num -= 90;
    } else if (num >= 50) {
      romanNumeral += "L";
      num -= 50;
    } else if (num >= 40) {
      romanNumeral += "XL";
      num -= 40;
    } else if (num >= 10) {
      romanNumeral += "X";
      num -= 10;
    } else if (num >= 9) {
      romanNumeral += "IX";
      num -= 9;
    } else if (num >= 5) {
      romanNumeral += "V";
      num -= 5;
    } else if (num >= 4) {
      romanNumeral += "IV";
      num -= 4;
    } else {
      romanNumeral += "I";
      num -= 1;
    }
  }
  console.log(romanNumeral);
  return romanNumeral;
};

const converterParaNumeral = () => {};

function App() {
  const [valor, setValor] = useState(0);
  const [inputValor, setInputValor] = useState(0);

  return (
    <div className="App">
      <div className="display">{valor}</div>
      <div className="input-container">
        <input
          type="text"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setValor(converterParaRomano(inputValor))}
        >
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;
