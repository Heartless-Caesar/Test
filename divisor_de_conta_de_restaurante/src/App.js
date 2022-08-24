import React, { useState } from "react";
import "./App.css";

function App() {
  const [cliente, setCliente] = useState([]);
  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState(0);
  const [nome, setNome] = useState("");
  let clientes = [];
  let produtos = [];

  return (
    <div className="App">
      {/*ADICIONAR NOME CLIENTE*/}
      <input
        value={nome}
        placeholder="Digite o nome do cliente aqui..."
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        value={produto}
        placeholder="Digite o nome do produto aqui..."
        onChange={(e) => setProduto(e.target.value)}
      />
      <input
        value={preco}
        placeholder="Digite o preço do produto aqui..."
        onChange={(e) => setPreco(e.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          clientes.push({ nome: nome, produto: produto, preco: preco })
        }
      >
        Adicionar outro produto
      </button>
      <button
        type="button"
        onClick={() =>
          clientes.push({ nome: nome, produto: produto, preco: preco })
        }
      >
        Adicionar cliente
      </button>
    </div>
  );
}

export default App;
