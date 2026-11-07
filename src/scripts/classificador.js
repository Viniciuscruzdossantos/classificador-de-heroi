/* =====================================================
   CLASSIFICADOR DE NÍVEL DE HERÓI
   Aqui fica a LÓGICA do desafio. Este arquivo funciona
   no navegador (junto com o app.js) e também no Node:
       node src/scripts/classificador.js
   ===================================================== */

// Tabela com os dados de cada nível (nome, cor da esfera e XP mínimo)
const NIVEIS = [
  { nome: "Ferro", cor: "#7d8b99", min: 0 },
  { nome: "Bronze", cor: "#cf7a35", min: 1001 },
  { nome: "Prata", cor: "#9fb2c4", min: 2001 },
  { nome: "Ouro", cor: "#eab308", min: 5001 },
  { nome: "Platina", cor: "#14b8a6", min: 7001 },
  { nome: "Ascendente", cor: "#3fba4a", min: 8001 },
  { nome: "Imortal", cor: "#6d5ce8", min: 9001 },
  { nome: "Radiante", cor: "#ffc400", min: 10001 },
];

// ESTRUTURA DE DECISÃO: descobre o nível a partir do XP.
// Obs.: o desafio não diz onde fica exatamente 1.000 XP. Aqui ele conta como Ferro.
function classificarNivel(xp) {
  let nivel;

  if (xp <= 1000) {
    nivel = "Ferro";
  } else if (xp <= 2000) {
    nivel = "Bronze";
  } else if (xp <= 5000) {
    nivel = "Prata";
  } else if (xp <= 7000) {
    nivel = "Ouro";
  } else if (xp <= 8000) {
    nivel = "Platina";
  } else if (xp <= 9000) {
    nivel = "Ascendente";
  } else if (xp <= 10000) {
    nivel = "Imortal";
  } else {
    nivel = "Radiante";
  }

  return nivel;
}

// Procura na tabela os dados (cor, XP mínimo...) de um nível pelo nome
function buscarNivel(nome) {
  return NIVEIS.find((nivel) => nivel.nome === nome);
}

// OPERADORES: calcula quanto falta para o próximo nível (e a % da barra)
function calcularProgresso(xp) {
  const atual = buscarNivel(classificarNivel(xp));
  const proximo = NIVEIS[NIVEIS.indexOf(atual) + 1];

  // Radiante é o último nível: não existe "próximo"
  if (!proximo) {
    return { atual, proximo: null, porcentagem: 100, faltam: 0 };
  }

  const tamanhoDoNivel = proximo.min - atual.min;
  const xpNoNivel = xp - atual.min;
  const porcentagem = Math.round((xpNoNivel / tamanhoDoNivel) * 100);

  return {
    atual,
    proximo,
    porcentagem: Math.min(100, Math.max(0, porcentagem)),
    faltam: proximo.min - xp,
  };
}

// Mensagem exigida pelo desafio
function montarMensagem(nome, nivel) {
  return `O Herói de nome **${nome}** está no nível de **${nivel}**`;
}

/* ---------- Modo console (Node) ---------- */
if (
  typeof require !== "undefined" &&
  typeof module !== "undefined" &&
  require.main === module
) {
  // VARIÁVEIS: nome e XP do herói
  const nomeHeroi = "Aragorn";
  const xpHeroi = 7500;

  console.log(montarMensagem(nomeHeroi, classificarNivel(xpHeroi)));

  // LAÇO DE REPETIÇÃO: testa os valores de fronteira de cada nível
  const testes = [0, 1000, 1001, 2000, 2001, 5000, 5001, 7000, 7001, 8000, 8001, 9000, 9001, 10000, 10001];
  console.log("\nTeste dos limites:");
  for (let i = 0; i < testes.length; i++) {
    console.log(`XP ${testes[i]} -> ${classificarNivel(testes[i])}`);
  }
}

if (typeof module !== "undefined") {
  module.exports = { NIVEIS, classificarNivel, buscarNivel, calcularProgresso, montarMensagem };
}
