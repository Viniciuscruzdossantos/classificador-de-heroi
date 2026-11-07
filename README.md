# ⚔️ Guilda dos Heróis: Classificador de Nível

Um classificador de nível de herói feito com **HTML, CSS e JavaScript puro**, sem frameworks e sem nenhuma biblioteca de fora. Você informa o **nome** e a **experiência (XP)** do seu herói e descobre em qual dos 8 níveis ele está, de **Ferro** até **Radiante**.

> 🎯 Este projeto é a minha resolução do desafio **"Classificador de Nível de Herói"** da **DIO**, feita do zero, com um visual e recursos criados por mim, inspirado na estética **Frutiger Aero**.

---

## 🎮 Como usar

1. Digite o **nome** do seu herói.
2. Digite a quantidade de **XP**.
3. Clique em **Classificar** e veja o nível, a mensagem do desafio e quanto falta para o próximo nível.
4. Sem ideias? Clique em **Herói aleatório** e deixe a sorte decidir.

A mensagem exibida segue exatamente o que o desafio pede:

> O Herói de nome **{nome}** está no nível de **{nivel}**

---

## 🏅 Os níveis

| Nível | XP |
|---|---|
| Ferro | até 1.000 |
| Bronze | 1.001 a 2.000 |
| Prata | 2.001 a 5.000 |
| Ouro | 5.001 a 7.000 |
| Platina | 7.001 a 8.000 |
| Ascendente | 8.001 a 9.000 |
| Imortal | 9.001 a 10.000 |
| Radiante | 10.001 ou mais |

> 📝 **Observação:** o desafio diz "menor que 1.000" para Ferro e começa o Bronze em 1.001, então o valor exato de **1.000 XP** ficou sem regra. Eu decidi que ele conta como **Ferro**.

---

## ✨ O que eu criei de diferente

- **Visual Frutiger Aero**: céu azul, painéis de vidro translúcido, botões brilhantes em "gel", bolhas flutuando e colinas verdes, no estilo clássico dos anos 2000.
- **Esfera brilhante com cor própria** para cada nível (numerada de 1 a 8), e o cartão do resultado muda de cor conforme o herói.
- **Contador de XP animado** e **barra de progresso** até o próximo nível, com o aviso de quanto XP falta.
- **Escada de níveis** que destaca o nível do herói classificado.
- **Ranking da Guilda**: cada herói classificado entra no ranking, ordenado por XP. A guilda já começa com 5 heróis.
- **Herói aleatório** para testar rapidinho.
- **Salva no navegador**: o ranking continua lá quando você volta (botão **Restaurar** volta ao início).
- **Brilho dourado** especial para quem chega ao nível **Radiante**.
- **Validação**: avisa se faltar o nome ou se o XP for inválido.
- **Responsivo** (funciona no celular) e **acessível** (teclado, leitor de tela e `prefers-reduced-motion`).

---

## 🎨 Sobre o visual: Frutiger Aero

**Frutiger Aero** é um estilo de design muito popular entre o fim dos anos 2000 e o início dos 2010. Ele mistura tecnologia com natureza e é fácil de reconhecer:

| Característica | Como foi feita aqui, só com CSS |
|---|---|
| Céu azul e colinas verdes | `linear-gradient` no fundo e formas arredondadas para as colinas. |
| Vidro translúcido | `backdrop-filter: blur()` e fundos semitransparentes nos cartões. |
| Brilho "de gel" nos botões | Um gradiente com um reflexo branco no topo, feito com `::before`. |
| Esferas brilhantes | Vários `radial-gradient` empilhados, com a cor do nível calculada por `color-mix()`. |
| Bolhas flutuando | Círculos com gradiente e uma animação `@keyframes` subindo pela tela. |
| Barra de progresso em "tubo" | Fundo com sombra interna e um reflexo que passa pela barra. |

---

## 🧠 Os conceitos do desafio, e onde estão no código

O desafio pedia quatro conceitos. Todos estão no arquivo `src/scripts/classificador.js`:

| Conceito | Onde aparece | Explicação simples |
|---|---|---|
| **Variáveis** | `nomeHeroi`, `xpHeroi`, `nivel` | Guardam o nome, o XP e o nível do herói. |
| **Operadores** | `<=`, `-`, `/`, `*` em `classificarNivel` e `calcularProgresso` | Comparam o XP com os limites e calculam a % da barra de progresso. |
| **Estruturas de decisão** | cadeia `if / else if / else` em `classificarNivel` | Olha o XP e escolhe um, e só um, dos 8 níveis. |
| **Laços de repetição** | `for` no teste dos limites e no `app.js` | Percorrem listas: testam várias entradas, desenham a escada e o ranking. |

### Como a decisão funciona
O computador lê as condições de cima para baixo e para na primeira que for verdadeira:

```js
if (xp <= 1000) {
  nivel = "Ferro";
} else if (xp <= 2000) {
  nivel = "Bronze";
} // ... e assim por diante
else {
  nivel = "Radiante";
}
```

Por isso não precisa escrever "entre 1.001 e 2.000": se o XP chegou no segundo `if`, ele já é maior que 1.000.

---

## 🛠️ Tecnologias usadas

| Tecnologia | Para que serve neste projeto |
|---|---|
| **HTML** | Estrutura da página: formulário, resultado, escada e ranking. |
| **CSS** | Visual Frutiger Aero: vidro translúcido (`backdrop-filter`), gradientes brilhantes, esferas, bolhas e animações. |
| **JavaScript** | A lógica do desafio e a interface: classifica, calcula, desenha e salva. |

---

## ▶️ Como rodar

Não precisa instalar nada.

**No navegador:** abra o arquivo `index.html`.

**No terminal (com Node.js):** roda a versão de console, que mostra a mensagem do desafio e testa os limites de cada nível:

```bash
node src/scripts/classificador.js
```

Se você usa o **VS Code**, também pode usar a extensão **Live Server**.

---

## 📁 Estrutura do projeto

```
├── index.html                  # estrutura da página
├── README.md                   # este arquivo
└── src
    ├── scripts
    │   ├── classificador.js    # lógica do desafio (roda no navegador e no Node)
    │   └── app.js              # interface: resultado, escada e ranking
    └── styles
        ├── reset.css           # zera estilos padrão do navegador
        └── style.css           # visual e animações
```

---

## 🙌 Créditos

O desafio **Classificador de Nível de Herói** foi proposto pela **[DIO](https://www.dio.me/)**. Obrigado pela proposta, ela é ótima para praticar lógica de programação! 👏

O código, o visual e os recursos extras desta versão são de minha autoria.

---

## 👨‍💻 Autor

Feito por **Vinícius Cruz dos Santos**

[![GitHub](https://img.shields.io/badge/GitHub-Viniciuscruzdossantos-181717?logo=github)](https://github.com/Viniciuscruzdossantos)
