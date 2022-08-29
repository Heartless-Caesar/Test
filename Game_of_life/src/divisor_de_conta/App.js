import React, { useState } from "react";
import "./App.css";
import Select from "react-select";

function App() {
  const [selectValue, setSelectValue] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [produto, setProduto] = useState("");
  const [servicePrice, setServicePrice] = useState(false);
  const [preco, setPreco] = useState(0);
  const [value, setValue] = useState(0);
  const [nome, setNome] = useState("");
  let clientes = [];

  //ADICIONA UM PRODUTO A UM VETOR DE PRODUTOS SIMILAR A UM CATALOGO DINAMICO
  const addProduct = ({ produto, preco }) => {
    if (produto.length > 0) {
      const produtosAtualizados = [
        ...produtos,
        { label: produto, value: preco },
      ];
      setProdutos(produtosAtualizados);
    }
    console.log(produtos);
    setProduto("");
    setPreco("");
  };

  //ADICIONA UM CLIENTE A LISTA DE CLIENTES DO PEDIDO ATUAL
  const addCliente = ({ nome }) => {
    const clientesAtualizados = [...cliente, { nome }];

    setCliente(clientesAtualizados);
    console.log(cliente);
    setNome("");
  };

  //ADICIONA O PRODUTO A CONTA DE UM CLIENTE DO ATUAL PEDIDO
  const addToBill = ({ nome, counter }) => {
    if (nome.length > 0) {
      console.log(nome);
      setPedidos((res) => [...res, { nome, counter, ...produtos }]);
      console.log(pedidos);
    }
  };

  //VERIFCA AS CONDIÇÕES ESTABEELCIDAS PARA COMPUTAR O CUSTO DE CADA PEDIDO
  const calcularCusto = () => {
    let total = 0;
    let sum = 0;
    for (let index = 0; index < cliente.length; index++) {
      const element = cliente[index];
      const selectElm = pedidos[index];

      console.log(element);
      console.log(selectElm);

      console.log(`Element : ${element.nome}, ${selectElm.counter}`);
      console.log(element);
      //FAZER COM QUE ENCONTRE O PRODUTO DO PEDIDO NO VETOR DE PRODUTOS
      for (let idx = 0; idx < produtos.length; idx++) {
        if (element[nome] === selectElm[idx][nome]) {
          if (pedidos[index].label === element[idx]?.nome) {
            sum = pedidos.reduce(
              (prev, next) => prev + selectElm[idx].value,
              0
            );
          }
          sum += selectElm[index].counter;
          console.log(total);
        }
      }
    }
    setValue(total);
  };
  //ATUALIZA PARA VERIFICAR SE O CLIENTE IRA PAGAR A TAXA DE SERVIÇO OU NÃO
  const handleServicePrice = () => {
    if (servicePrice === false) {
      setServicePrice(true);
    } else {
      setServicePrice(false);
    }
  };

  return (
    <div className="App">
      {/*ADICIONAR PRODUTO*/}
      <div className="product-div">
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
          onClick={() => addProduct({ produto: produto, preco: preco })}
          className="btn"
        >
          Adicionar outro produto
        </button>
      </div>
      <div className="input-div">
        {/*ADICIONAR CLIENTE*/}
        <input
          value={nome}
          placeholder="Digite o nome do cliente aqui..."
          onChange={(e) => setNome(e.target.value)}
          className="input"
        />
        <div className="insert-product">
          <Select options={produtos} className="select" />
          <button
            type="button"
            className="btn"
            onClick={() => addToBill({ nome: nome, counter: 0 })}
          >
            Adicionar ao pedido deste cliente
          </button>
          <div className="checkbox-div">
            <label for="service-checkbox">Irá pagar a taxa de serviço?</label>
            <input
              type="checkbox"
              className="service-checkbox"
              onClick={() => handleServicePrice()}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => addCliente({ nome: nome, counter: 0 })}
        >
          Adicionar novo cliente
        </button>
        <button type="button" className="btn" onClick={calcularCusto}>
          Concluir pedido
        </button>
      </div>
      <div className="product-div">
        Produtos inseridos:
        {produtos.map((e) => {
          const { label, value } = e;
          return (
            <div>
              <div>
                {label} - {value}
              </div>
            </div>
          );
        })}
      </div>
      <div>Valor total: {value}</div>
    </div>
  );
}

export default App;
