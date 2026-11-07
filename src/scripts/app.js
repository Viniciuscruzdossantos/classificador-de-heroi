/* =====================================================
   INTERFACE DA GUILDA DOS HERÓIS
   Usa as funções do classificador.js para mostrar tudo
   na tela: resultado, escada de níveis e ranking.
   ===================================================== */

const CHAVE_GUILDA = "guilda-dos-herois:ranking";

// Heróis que já vêm na guilda
const HEROIS_INICIAIS = [
  { nome: "Nimue", xp: 10450 },
  { nome: "Lyra", xp: 8750 },
  { nome: "Thorin", xp: 4200 },
  { nome: "Bruto", xp: 1500 },
  { nome: "Zéfiro", xp: 650 },
];

const NOMES_ALEATORIOS = [
  "Kaelen", "Brisa", "Dragomir", "Selene", "Orion", "Mirelle",
  "Tarsis", "Ravena", "Galdino", "Ísis", "Fenrir", "Aurora",
];

// ----- elementos da página -----
const form = document.getElementById("form");
const inputNome = document.getElementById("nome");
const inputXp = document.getElementById("xp");
const erroEl = document.getElementById("erro");
const vazioEl = document.getElementById("vazio");
const conteudoEl = document.getElementById("conteudo");
const resultadoEl = document.getElementById("resultado");
const emblemaEl = document.getElementById("emblema");
const rankEl = document.getElementById("rank");
const mensagemEl = document.getElementById("mensagem");
const xpValorEl = document.getElementById("xp-valor");
const barraEl = document.getElementById("barra");
const progressoEl = document.getElementById("progresso");
const escadaEl = document.getElementById("escada");
const rankingEl = document.getElementById("ranking");

let guilda = carregarGuilda();
let heroiDestaque = null;
let animacaoAtual = 0;

/* ---------- guilda salva no navegador ---------- */

function carregarGuilda() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_GUILDA));
    if (Array.isArray(salvo) && salvo.length > 0) return salvo;
  } catch {
    /* sem localStorage? tudo bem, usa os iniciais */
  }
  return HEROIS_INICIAIS.map((heroi) => ({ ...heroi }));
}

function salvarGuilda() {
  try {
    localStorage.setItem(CHAVE_GUILDA, JSON.stringify(guilda));
  } catch {
    /* ignora */
  }
}

/* ---------- desenho da tela ---------- */

function formatar(numero) {
  return numero.toLocaleString("pt-BR");
}

// LAÇO: desenha a escada com os 8 níveis
function desenharEscada() {
  escadaEl.innerHTML = "";

  for (let i = 0; i < NIVEIS.length; i++) {
    const nivel = NIVEIS[i];
    const proximo = NIVEIS[i + 1];
    const faixa = proximo
      ? `${formatar(nivel.min)} a ${formatar(proximo.min - 1)} XP`
      : `${formatar(nivel.min)}+ XP`;

    const item = document.createElement("li");
    item.className = "escada__item";
    item.dataset.nivel = nivel.nome;
    item.style.setProperty("--cor", nivel.cor);
    item.innerHTML = `
      <span class="orbe" aria-hidden="true">${i + 1}</span>
      <span class="escada__nome">${nivel.nome}</span>
      <span class="escada__faixa">${faixa}</span>
    `;
    escadaEl.appendChild(item);
  }
}

function marcarNivelNaEscada(nomeDoNivel) {
  for (const item of escadaEl.children) {
    item.classList.toggle("ativo", item.dataset.nivel === nomeDoNivel);
  }
}

// LAÇO: desenha o ranking em ordem decrescente de XP
function desenharRanking() {
  const ordenados = [...guilda].sort((a, b) => b.xp - a.xp);
  rankingEl.innerHTML = "";

  for (let i = 0; i < ordenados.length; i++) {
    const heroi = ordenados[i];
    const nivel = buscarNivel(classificarNivel(heroi.xp));

    const item = document.createElement("li");
    item.className = "ranking__item";
    item.style.setProperty("--cor", nivel.cor);
    if (heroi.nome === heroiDestaque) item.classList.add("destaque");

    const posicao = document.createElement("span");
    posicao.className = "ranking__pos";
    posicao.textContent = `${i + 1}º`;

    const nome = document.createElement("span");
    nome.className = "ranking__nome";
    nome.textContent = heroi.nome; // textContent evita injetar HTML pelo nome

    const xp = document.createElement("span");
    xp.className = "ranking__xp";
    xp.textContent = `${formatar(heroi.xp)} XP`;

    const selo = document.createElement("span");
    selo.className = "ranking__selo";
    const orbe = document.createElement("span");
    orbe.className = "orbe orbe--mini";
    orbe.setAttribute("aria-hidden", "true");
    orbe.textContent = NIVEIS.indexOf(nivel) + 1;
    selo.append(orbe, nivel.nome);

    item.append(posicao, nome, xp, selo);
    rankingEl.appendChild(item);
  }
}

function animarXp(alvo) {
  const id = ++animacaoAtual;
  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduzido) {
    xpValorEl.textContent = formatar(alvo);
    return;
  }

  const duracao = 900;
  const inicio = performance.now();

  function passo(agora) {
    if (id !== animacaoAtual) return; // veio um resultado mais novo
    const t = Math.min(1, (agora - inicio) / duracao);
    const suave = 1 - Math.pow(1 - t, 3);
    xpValorEl.textContent = formatar(Math.round(alvo * suave));
    if (t < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

function mostrarResultado(nome, xp) {
  const nomeDoNivel = classificarNivel(xp);
  const { atual, proximo, porcentagem, faltam } = calcularProgresso(xp);

  vazioEl.hidden = true;
  conteudoEl.hidden = false;

  // cor e brilho do cartão mudam conforme o nível
  resultadoEl.style.setProperty("--cor", atual.cor);
  resultadoEl.classList.toggle("radiante", nomeDoNivel === "Radiante");
  conteudoEl.classList.remove("surgir");
  void conteudoEl.offsetWidth; // reinicia a animação de entrada
  conteudoEl.classList.add("surgir");

  emblemaEl.textContent = NIVEIS.indexOf(atual) + 1;
  rankEl.textContent = atual.nome;

  // Mensagem do desafio: "O Herói de nome **{nome}** está no nível de **{nivel}**"
  const nomeEl = document.createElement("strong");
  nomeEl.textContent = nome;
  const nivelEl = document.createElement("strong");
  nivelEl.textContent = nomeDoNivel;
  mensagemEl.replaceChildren("O Herói de nome ", nomeEl, " está no nível de ", nivelEl);

  animarXp(xp);

  barraEl.style.width = "0%";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => (barraEl.style.width = `${porcentagem}%`))
  );

  progressoEl.textContent = proximo
    ? `Faltam ${formatar(faltam)} XP para ${proximo.nome}`
    : "Nível máximo alcançado! Uma verdadeira lenda.";

  marcarNivelNaEscada(nomeDoNivel);
}

/* ---------- ações ---------- */

function registrarHeroi(nome, xp) {
  // se o herói já existe, atualiza o XP; senão, adiciona na guilda
  const existente = guilda.find((h) => h.nome.toLowerCase() === nome.toLowerCase());
  if (existente) {
    existente.nome = nome;
    existente.xp = xp;
  } else {
    guilda.push({ nome, xp });
  }
  heroiDestaque = nome;
  salvarGuilda();
  desenharRanking();
}

function mostrarErro(texto) {
  erroEl.textContent = texto;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  const xp = Number(inputXp.value);

  if (nome === "") {
    mostrarErro("Dê um nome ao seu herói.");
    inputNome.focus();
    return;
  }
  if (inputXp.value === "" || !Number.isInteger(xp) || xp < 0) {
    mostrarErro("Informe um XP inteiro, de 0 para cima.");
    inputXp.focus();
    return;
  }

  mostrarErro("");
  mostrarResultado(nome, xp);
  registrarHeroi(nome, xp);
});

document.getElementById("aleatorio").addEventListener("click", () => {
  const nome = NOMES_ALEATORIOS[Math.floor(Math.random() * NOMES_ALEATORIOS.length)];
  const xp = Math.floor(Math.random() * 12001); // de 0 a 12.000

  inputNome.value = nome;
  inputXp.value = xp;
  mostrarErro("");
  mostrarResultado(nome, xp);
  registrarHeroi(nome, xp);
});

document.getElementById("limpar").addEventListener("click", () => {
  guilda = HEROIS_INICIAIS.map((heroi) => ({ ...heroi }));
  heroiDestaque = null;
  salvarGuilda();
  desenharRanking();
});

desenharEscada();
desenharRanking();
