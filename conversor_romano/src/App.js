import React, { useState } from "react";
import "./App.css";

const converterParaArabico = (str) => {
  const numeraisRomanos = [
    "CM",
    "M",
    "CD",
    "D",
    "XC",
    "C",
    "XL",
    "L",
    "IX",
    "X",
    "IV",
    "V",
    "I",
  ];

  const valoresCorrespondentes = [
    900, 1000, 400, 500, 90, 100, 40, 50, 9, 10, 4, 5, 1,
  ];

  let indice,
    num = 0;

  //PADRONIZA LETRAS PARA COMAPRAÇÃO
  str = str.toUpperCase();

  //LAÇO DE REPETIÇÃO PARA DETERMINAR A STRING FINAL
  for (let idx in numeraisRomanos) {
    //ENCONTRA O INDICE NA STRING DOS VALORES ROMANOS
    indice = str.indexOf(numeraisRomanos[idx]);

    //ENQUANTO O INDICE FOR VALIDO...
    while (indice !== -1) {
      //SOMA O VALOR A VARIAVEL NUMERICA
      num += parseInt(valoresCorrespondentes[idx]);

      //TORNA O ELEMENTO NA STRING DE INPUT UM "-" PARA NÃO SER COMPUTADO NOVAMENTE
      str = str.replace(numeraisRomanos[idx], "-");

      //NOVO INDICE É GERADO VISTO QUE APÓS SER COMPUTADO O ANTERIOR SE TORNA UM TRAÇO("-")
      indice = str.indexOf(numeraisRomanos[idx]);
    }
  }

  //RETORNA O NUMERO QUANDO O INDICE NÃO FOR MAIOR QUE -1
  return num;
};

/* 
 
 O NUMERO INSERIDO COMO INPUT É DETERMINADO DE ACORDO COM SEU VALOR
 E AO COMPUTAR O VALOR DE STRING O NÚMERO SOFRE DECREMENTOS ATÉ ATINGIR
 0, AO FINAL RETORNANDO O VALOR NUMÉRICO.   
*/
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

  return romanNumeral;
};

function App() {
  //DISPLAY VALOR ROMANO
  const [valor, setValor] = useState(0);

  //DISPLAY DO INPUT NUMERICO PARA ROMANO
  const [inputValor, setInputValor] = useState(0);

  //DISPLAY DO INPUT ROMANO PARA NUMERICO
  const [strValue, setStrValue] = useState("");

  //DISPLAY DO VALOR ARABICO
  const [valorArabico, setValorArabico] = useState(0);

  return (
    <div className="App">
      <div className="">Número natural para romano</div>
      <div className="display">{valor}</div>
      <div className="input-container">
        <input
          type="text"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
          placeholder="Digite um numero natural..."
          className="input"
        />
        <button
          type="button"
          onClick={() => setValor(converterParaRomano(inputValor))}
          className="btn"
        >
          Converter
        </button>
      </div>
      <div>
        <div className="roman-calc">Número romano para natural</div>
        <div className="display">{valorArabico}</div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite numerais romanos..."
            value={strValue}
            onChange={(e) => setStrValue(e.target.value)}
            className="input"
          />
          <button
            type="button"
            onClick={() => setValorArabico(converterParaArabico(strValue))}
            className="btn"
          >
            Converter
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
