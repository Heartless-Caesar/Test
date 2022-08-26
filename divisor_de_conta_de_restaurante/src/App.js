import React, { useState } from "react";
import "./App.css";

function App() {
  const [cliente, setCliente] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState(0);
  const [nome, setNome] = useState("");
  let clientes = [];

  /*
    TODO: ADICIONAR PRODUTOS EM SEU VETOR & BUSCAR PELO NOME DO CLIENTE A FIM DE GERAR SUA CONTA
    E POSTERIORMENTE TRATAR COMO ADICIONAR NOVOS CLIENTES, FINALMENTE CALCULANDO O VALOR QUE CADA UM
    TEM A PAGAR. 
  */
  const addProduct = ({ nome, produto, preco }) => {
    if (produto.length > 0) {
      const produtosAtualizados = [...produtos, { nome, produto, preco }];
      setProdutos(produtosAtualizados);
    }

    console.log(produtos);
    setProduto("");
    setPreco("");
  };

  const addCliente = ({ nome, produto, preco }) => {};

  return (
    <div className="App">
      <div className="input-div">
        {/*ADICIONAR NOME CLIENTE*/}
        <input
          value={nome}
          placeholder="Digite o nome do cliente aqui..."
          onChange={(e) => setNome(e.target.value)}
          className="input"
        />
        <input
          value={produto}
          placeholder="Digite o nome do produto aqui..."
          onChange={(e) => setProduto(e.target.value)}
          className="input"
        />
        <input
          value={preco}
          placeholder="Digite o preço do produto aqui..."
          onChange={(e) => setPreco(e.target.value)}
          className="input"
        />
        <button
          type="button"
          onClick={() =>
            addProduct({ nome: nome, produto: produto, preco: preco })
          }
          className="btn"
        >
          Adicionar outro produto
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => addCliente({ nome: nome })}
        >
          Adicionar cliente
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => addCliente({ nome: nome })}
        >
          Concluir pedido
        </button>
      </div>
      <div className="product-div">
        {produtos.map((e) => {
          const { nome, produto, preco } = e;
          return (
            <div>
              <div>
                cliente {nome} : {produto} - {preco}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
