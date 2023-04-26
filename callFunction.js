function callFunction(selectedLevel, palavrasUser) {
  let tabuleiro = [[]];
  let tabuleiroaux = [[]];
  let nrLinhas;
  let nrColunas;
  let nrMaximoPalavras;
  let randomWords = [
    "WEB",
    "REACT",
    "JAVA",
    "NODE",
    "PORTUGAL",
    "ROMANIA",
    "TIMISOARA",
    "COMPONENT",
    "TECHNOLOGIES",
    "SERVER",
  ];
  let palavrasSelecionadas = [];

  

  if (selectedLevel === "1") {
    nrLinhas = 15;
    nrColunas = 15;
    nrMaximoPalavras = 5;
  } else if (selectedLevel === "2") {
    nrLinhas = 25;
    nrColunas = 25;
    nrMaximoPalavras = 7;
  } else if (selectedLevel === "3") {
    nrLinhas = 40;
    nrColunas = 40;
    nrMaximoPalavras = 10;
  }

  function inverteString(s) {
    return s.split("").reverse().join("");
  }

  function encontraLetraRandom() {
    var resultado = "";
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //var caracteres = '';
    var caracteresLength = caracteres.length;

    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteresLength)
    );

    return resultado;
  }

  function encontraNrRandom(max) {
    let nrRandom;
    nrRandom = Math.floor(Math.random() * max);

    return nrRandom;
  }

  function encontraRandomWord(){
    
    let palavras = [...randomWords, ...palavrasUser];
    let posicao;
    do{
      posicao = encontraNrRandom(palavras.length);
    }while(palavrasSelecionadas.includes(palavras[posicao]))
    
    return palavras[posicao];
  }
   

  function encontraTamanhoDaPalavra() {
    let tamanhoPalavra = encontraRandomWord().length;
    return tamanhoPalavra;
  }

  function encontraRandomPosicaoTab() {
    let posicao = Math.floor(Math.random() * nrLinhas);
    return posicao;
  }

  
  function organizaTabuleiro() {
    let nrpalavras = 0;

    do {
      
      let nrRandom = Math.floor(Math.random() * 6);
      console.log(nrRandom);
      if (nrRandom === 0) {
        [tabuleiro, tabuleiroaux] = trocaLetraHorizontal();
      } else if (nrRandom === 1) {
        [tabuleiro, tabuleiroaux] = trocaLetraHorizontalReverse();
      } else if (nrRandom === 2) {
        [tabuleiro, tabuleiroaux] = trocaLetraVertical();
      } else if (nrRandom === 3) {
        [tabuleiro, tabuleiroaux] = trocaLetraVerticalReverse();
      } else if (nrRandom === 4) {
        [tabuleiro, tabuleiroaux] = trocaLetraDiagonal();
      } else if (nrRandom === 5) {
        [tabuleiro, tabuleiroaux] = trocaLetraDiagonalReverse();
      }

      nrpalavras++;
    } while (nrpalavras < nrMaximoPalavras);
  }



  function preencheTabuleiroAuxiliar() {
    console.log("aa")
    console.log(tabuleiro)
    console.log(tabuleiroaux)
    console.log("aa")
    tabuleiroaux = Array(nrLinhas)
      .fill(0)
      .map(() => new Array(nrColunas).fill(0).map(() => " "));
  }

  function preencheTabuleiro() {
    tabuleiro = Array(nrLinhas).fill(0).map( 
      () => new Array(nrColunas).fill(0).map( 
          () => encontraLetraRandom()
      ));

    organizaTabuleiro();
  }

  function trocaLetraHorizontal() {
    let palavra = encontraRandomWord();
    let posicaoC;
    let posicaoL = encontraRandomPosicaoTab();
    let sobreposicao = false;
    do {
      palavra = encontraRandomWord();
      sobreposicao = false;
      posicaoC = encontraRandomPosicaoTab();
      if (posicaoC + palavra.length > nrColunas) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL][posicaoC + p] !== " ") {
          sobreposicao = true;
        }
      }
    } while (posicaoC + palavra.length > nrColunas || sobreposicao);
    palavrasSelecionadas.push(palavra);
    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL][posicaoC + p] === " ") {
        tabuleiroaux[posicaoL][posicaoC + p] = palavra[p];
        tabuleiro[posicaoL][posicaoC + p] = palavra[p];
      }
    }
    return [tabuleiro, tabuleiroaux];
  }

  function trocaLetraHorizontalReverse() {
    let palavra = encontraRandomWord();
    palavra = inverteString(palavra);
    let posicaoC;
    let posicaoL = encontraRandomPosicaoTab();
    let sobreposicao = true;
    do {
      palavra = inverteString(encontraRandomWord());
      sobreposicao = false;
      posicaoC = encontraRandomPosicaoTab();
      if (posicaoC + palavra.length > nrColunas) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL][posicaoC + p] !== " ") {
          sobreposicao = true;
        }
      }
    } while (posicaoC + palavra.length > nrColunas || sobreposicao);
    palavrasSelecionadas.push(inverteString(palavra));
    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL][posicaoC + p] === " ") {
        tabuleiroaux[posicaoL][posicaoC + p] = palavra[p];
        tabuleiro[posicaoL][posicaoC + p] = palavra[p];
      }
    }
    return [tabuleiro, tabuleiroaux];
  }

  function trocaLetraVertical() {
    let palavra = encontraRandomWord();
    let posicaoL;
    let posicaoC = encontraRandomPosicaoTab();
    let sobreposicao = true;
    do {
      palavra = encontraRandomWord();
      sobreposicao = false;
      posicaoL = encontraRandomPosicaoTab();
      if (posicaoL + palavra.length > nrLinhas) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL + p][posicaoC] !== " ") {
          sobreposicao = true;
        }
      }
    } while (posicaoL + palavra.length > nrLinhas || sobreposicao);

    palavrasSelecionadas.push(palavra);
    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL + p][posicaoC] === " ") {
        tabuleiroaux[posicaoL + p][posicaoC] = palavra[p];
        tabuleiro[posicaoL + p][posicaoC] = palavra[p];
      }
    }

    return [tabuleiro, tabuleiroaux];
  }
  function trocaLetraVerticalReverse() {
    let palavra = encontraRandomWord();
    palavra = inverteString(palavra);
    let posicaoC = encontraRandomPosicaoTab();
    let posicaoL;
    let sobreposicao;

    do {
      palavra = inverteString(encontraRandomWord());
      sobreposicao = false;
      posicaoL = encontraRandomPosicaoTab();
      if (posicaoL + palavra.length > nrLinhas) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL + p][posicaoC] !== " ") {
          sobreposicao = true;
        }
      }
    } while (posicaoL + palavra.length > nrLinhas || sobreposicao);
    palavrasSelecionadas.push(inverteString(palavra));

    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL + p][posicaoC] === " ") {
        tabuleiroaux[posicaoL + p][posicaoC] = palavra[p];
        tabuleiro[posicaoL + p][posicaoC] = palavra[p];
      }
    }

    return [tabuleiro, tabuleiroaux];
  }

  function trocaLetraDiagonal() {
    let palavra = encontraRandomWord();
    let posicaoL;
    let posicaoC;
    let sobreposicao = true;
    do {
      palavra = encontraRandomWord();
      sobreposicao = false;
      posicaoL = encontraRandomPosicaoTab();
      posicaoC = encontraRandomPosicaoTab();
      if (
        posicaoL + palavra.length > nrLinhas ||
        posicaoC + palavra.length > nrColunas
      ) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL + p][posicaoC + p] !== " ") {
          sobreposicao = true;
        }
      }
    } while (
      posicaoL + palavra.length > nrLinhas ||
      posicaoC + palavra.length > nrColunas ||
      sobreposicao
    );

    palavrasSelecionadas.push(palavra);
    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL + p][posicaoC + p] === " ") {
        tabuleiroaux[posicaoL + p][posicaoC + p] = palavra[p];
        tabuleiro[posicaoL + p][posicaoC + p] = palavra[p];
      }
    }

    return [tabuleiro, tabuleiroaux];
  }

  function trocaLetraDiagonalReverse() {
    let palavra = encontraRandomWord();
    palavra = inverteString(palavra);
    let posicaoL;
    let posicaoC;
    let sobreposicao = true;
    do {
      palavra = inverteString(encontraRandomWord());
      sobreposicao = false;
      posicaoL = encontraRandomPosicaoTab();
      posicaoC = encontraRandomPosicaoTab();
      if (
        posicaoL + palavra.length > nrLinhas ||
        posicaoC + palavra.length > nrColunas
      ) {
        continue;
      }
      for (let p = 0; p < palavra.length; p++) {
        if (tabuleiroaux[posicaoL][posicaoC + p] !== " ") {
          sobreposicao = true;
        }
      }
    } while (
      posicaoL + palavra.length > nrLinhas ||
      posicaoC + palavra.length > nrColunas ||
      sobreposicao
    );    
    palavrasSelecionadas.push(inverteString(palavra));


    for (let p = 0; p < palavra.length; p++) {
      if (tabuleiroaux[posicaoL + p][posicaoC + p] === " ") {
        tabuleiroaux[posicaoL + p][posicaoC + p] = palavra[p];
        tabuleiro[posicaoL + p][posicaoC + p] = palavra[p];
      }
    }

    return [tabuleiro, tabuleiroaux];
  }
  
  
  preencheTabuleiroAuxiliar();
  preencheTabuleiro();
  return [tabuleiro, palavrasSelecionadas];
}

export default callFunction;
