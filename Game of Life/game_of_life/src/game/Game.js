import React from "react";
import "../styles/game-styles.css";

const celulasize = 20;
const tabuleiroWidth = 800;
const tabuleiroHeight = 600;

class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${celulasize * x + 1}px`,
          top: `${celulasize * y + 1}px`,
          width: `${celulasize - 1}px`,
          height: `${celulasize - 1}px`,
        }}
      />
    );
  }
}

class Tabuleiro extends React.Component {
  constructor() {
    super();
    //DETERMINA LARGURA DAS CELUALS
    this.rows = tabuleiroHeight / celulasize;

    //DETERMINA ALTURA DAS CELULAS
    this.cols = tabuleiroWidth / celulasize;

    //CRIA UM NOVO TABULEIRO
    this.tabuleiro = this.criarTabuleiroVazio();
  }

  /*STATE DO COMPONENTE QUE DETERMINA SE UM TABULEIRO ESTÁ POPULADO OU NÃO
   O INTERVALO DE TEMPO QUE O JOGADOR COLOCOU PARA AS GERAÇÕES MUDAREM E 
   UMA BOOLEAN PARA DETERMIANR SE O JOGO ESTÁ EM EXECUÇÃO OU NÃO
  */
  state = { celulas: [], interval: 100, isRunning: false };

  //INICIA UM TABULEIRO VAZIO E DETERMINA SE AS CELULAS SÃO VIZINHAS OU NÃO
  executarIteracao() {
    let novoTabuleiro = this.criarTabuleiroVazio();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let vizinhos = this.calcularVizinhos(this.tabuleiro, x, y);
        if (this.tabuleiro[y][x]) {
          if (vizinhos === 2 || vizinhos === 3) {
            novoTabuleiro[y][x] = true;
          } else {
            novoTabuleiro[y][x] = false;
          }
        } else {
          if (!this.tabuleiro[y][x] && vizinhos === 3) {
            novoTabuleiro[y][x] = true;
          }
        }
      }
    }

    //ATUALIZA O TABULEIRO DE ACORDO COM AS CÉLULAS ATIVAS
    this.tabuleiro = novoTabuleiro;

    //CRIA NOVAS CÉLULAS
    this.setState({ celulas: this.criarCelulas() });

    //PERCORRE AS DIFERENTES GERAÇÕES
    this.timeoutHandler = window.setTimeout(() => {
      this.executarIteracao();
    }, this.state.interval);
  }

  //INICIA O JOGO
  iniciarJogo = () => {
    this.setState({ isRunning: true });
    this.executarIteracao();
  };

  //PARA O JOGO
  pararJogo = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  //TRATA A MUDANÇA DE GERAÇÕES
  tratarMudancaIntervalo = (event) => {
    this.setState({ interval: event.target.value });
  };

  //CRIA UM NOVO TABULEIRO VAZIO
  criarTabuleiroVazio = () => {
    let tabuleiro = [];
    for (let y = 0; y < this.rows; y++) {
      tabuleiro[y] = [];

      for (let x = 0; x < this.cols; x++) {
        tabuleiro[y][x] = false;
      }
    }

    return tabuleiro;
  };

  //CRIA CADA CELULA
  criarCelulas = () => {
    let celulas = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.tabuleiro[y][x]) {
          celulas.push({ x, y });
        }
      }
    }
    return celulas;
  };

  //IDENTIFICA CADA LOCALIZAÇÃO DE CADA CELULA NA PÁGINA
  getElementOffset = () => {
    this.rect = this.tabuleiroRef.getBoundingClientRect();
    this.doc = document.documentElement;
    return {
      x: this.rect.left + window.pageXOffset - this.doc.clientLeft,
      y: this.rect.top + window.pageYOffset - this.doc.clientTop,
    };
  };

  //TRATA AS CÉLULAS QUE FORAM SELECIONADAS E AS QUE NÃO PARA RENDERIZAR
  tratarClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / celulasize);
    const y = Math.floor(offsetY / celulasize);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.tabuleiro[y][x] = !this.tabuleiro[y][x];
    }
    this.setState({ celulas: this.criarCelulas() });
  };

  /* CALCULA CELULAS VIZINHAS*/
  calcularVizinhos(tabuleiro, x, y) {
    let vizinhos = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        tabuleiro[y1][x1]
      ) {
        vizinhos++;
      }
    }

    return vizinhos;
  }

  //RESETA O TABULEIRO E AS SUAS CÉLULAS
  tratarVazio = () => {
    this.tabuleiro = this.criarTabuleiroVazio();
    this.setState({ celulas: this.criarCelulas() });
  };

  //INICIA O JOGO COM CÉLULAS ALEATÓRIAS ATIVADAS/RENDERIZADAS
  tratarAleatorio = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.tabuleiro[y][x] = Math.random() >= 0.5;
      }
    }

    this.setState({ celulas: this.criarCelulas() });
  };

  render() {
    const { celulas, interval, isRunning } = this.state;
    return (
      <div>
        {/*RENDERIZAÇÃO DO TABULEIRO*/}
        <div
          className="board"
          style={{
            width: tabuleiroWidth,
            height: tabuleiroHeight,
            backgroundSize: `${celulasize}px ${celulasize}px`,
            marginTop: "1%",
          }}
          onClick={this.tratarClick}
          ref={(n) => {
            this.tabuleiroRef = n;
          }}
        >
          {/*CELULAS*/}
          {celulas.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>
        {/*CONTROLES PARA INICIAR OU PARAR O JOGO*/}
        <div className="controls">
          Update every
          <input
            value={this.state.interval}
            onChange={this.tratarMudancaIntervalo}
            className="update-time"
          />
          msec
          {isRunning ? (
            <button className="button" onClick={this.pararJogo}>
              Parar
            </button>
          ) : (
            <button className="button" onClick={this.iniciarJogo}>
              Executar
            </button>
          )}
          <button className="button" onClick={this.tratarAleatorio}>
            Iniciar células
          </button>
          <button className="button" onClick={this.tratarVazio}>
            Reset
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Tabuleiro;
