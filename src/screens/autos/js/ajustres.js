async function verEstrategias() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  try {
    const response = await fetch(
      `https://automa-cassinos.dev.br/estrategias?token=${token}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    const ul = document.getElementById("estrategiasSalvas");
    ul.innerHTML = "";

    if (response.ok) {
      if (data.estrategias && data.estrategias.length > 0) {
        data.estrategias.forEach((estrategia, index) => {
          const li = document.createElement("li");
          li.textContent = estrategia;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "X";
          deleteButton.onclick = () => deletarEstrategia(index);
          li.appendChild(deleteButton);

          ul.appendChild(li);
        });
      } else {
        ul.innerHTML = "<li>Nenhuma estratégia salva.</li>";
      }
    } else {
      alert("Erro ao buscar estratégias: " + data.message);
    }

    const dadosResponse = await fetch(
      `https://automa-cassinos.dev.br/dados?token=${token}`
    );
    const dados = await dadosResponse.json();
    console.log(dados.e0);
    if (dadosResponse.ok) {
      document
        .getElementById("modalEstrategias")
        .querySelector("h1").innerHTML = `
      <span class="stop-win">Stop Win: <span class="valor-branco">${dados.stopwin}</span></span>
      <span class="stop-los">Stop Los: <span class="valor-branco">${dados.stoplos}</span></span> |
      <span class="ciclo">Ciclo: <span class="valor-branco">${dados.ciclo} ${dados.ciclo1}</span></span>|
      <span class="ciclo">Pós Los: <span class="valor-branco">${dados.poslos} ${dados.poslos1}</span></span> 
       `;

      document
        .getElementById("modalEstrategias")
        .querySelector(
          "h1:nth-of-type(2)"
        ).innerHTML = `<span class="apostas">Aposta Inicial: <span class="valor-branco">${dados.g0} | G1: ${dados.g1} | G2: ${dados.g2} | G3: ${dados.g3} | G4: ${dados.g4} | G5: ${dados.g5}</span></span>`;
      document
        .getElementById("modalEstrategias")
        .querySelector(
          "h1:nth-of-type(3)"
        ).innerHTML = `<span class="apostas-empate">Aposta Empate: <span class="valor-branco">${dados.e0} | G1: ${dados.e1} | G2: ${dados.e2} | G3: ${dados.e3} | G4: ${dados.e4} | G5: ${dados.e5}</span></span>`;

      document.getElementById("modalEstrategias").style.display = "block";
    } else {
      alert("Erro ao buscar dados: ");
    }
  } catch (error) {
    alert("Erro ao buscar estratégias.");
  }
}

async function liga() {
  const imgagem = document.querySelector(".imgagem");
  imgagem.style.display = "none";
  document.getElementById("content-area").classList.remove("hidden");
  const token = localStorage.getItem("authToken");
  const userID = localStorage.getItem("userID");

  if (!token || !userID) {
    return;
  }

  try {
    const requestBody = JSON.stringify({ ligadesliga: 0 });

    const response = await fetch(
      `https://automa-cassinos.dev.br/ligar_robo_bacbo?token=${token}&userID=${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao ligar.");
    }

    const data = await response.json();
    Swal.fire({
      icon: "success",
      text: "Robô Ligado com sucesso!",
      confirmButtonText: "Ok",
    });
  } catch (error) {
    alert("Erro ao Ligar. Tente novamente.");
  }
}

async function desliga() {
  const imgagem = document.querySelector(".imgagem");
  imgagem.style.display = "block";
  document.getElementById("content-area").classList.add("hidden");
  const token = localStorage.getItem("authToken");
  const userID = localStorage.getItem("userID");

  if (!token || !userID) {
    return;
  }

  try {
    const requestBody = JSON.stringify({ ligadesliga: 1 });

    const response = await fetch(
      `https://automa-cassinos.dev.br/desligar_robo_bacbo?token=${token}&userID=${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao desligar.");
    }

    const data = await response.json();
    Swal.fire({
      icon: "success",
      text: "Robô Desligado com sucesso!",
      confirmButtonText: "Ok",
    });
  } catch (error) {
    alert("Erro ao Desligar. Tente novamente.");
  }
}

/*****************************/
function verificarPoslos(input) {
  const valor = parseInt(input.value);
  const mensagem = document.getElementById("mensagemErroStop9");

  mensagem.textContent = "";

  if (input.value === "") {
    return;
  }

  if (isNaN(valor)) {
    mensagem.textContent = "Valor inválido! Deve ser um número.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (valor < 1 || valor > 5) {
    mensagem.textContent = "Valor inválido! Deve ser entre 1 e 5.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }
}
function ativarPoslos() {
  const poaslos = document.getElementById("poses").value;
  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  if (!poaslos) {
    alert("Por favor, insira um ciclo válido.");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/posloses?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ poslos: "sim", poslos1: poaslos }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao ativar pos los.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Ciclo ativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao ativar ciclo. Tente novamente.");
    });
}

function desativarPoslos() {
  const poaslos = document.getElementById("poses").value;
  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  if (!poaslos) {
    alert("Por favor, insira um ciclo válido.");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/posloses?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ poslos: "nao", poslos1: poaslos }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao desativar pós los.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Pós los desativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao desativar pós los. Tente novamente.");
    });
}
/*******************************************/
function verificarCiclo(input) {
  const valor = parseInt(input.value);
  const mensagem = document.getElementById("mensagemErroStop6");

  mensagem.textContent = "";

  if (input.value === "") {
    return;
  }

  if (isNaN(valor)) {
    mensagem.textContent = "Valor inválido! Deve ser um número.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (valor < 1 || valor > 5) {
    mensagem.textContent = "Valor inválido! Deve ser entre 1 e 5.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }
}
function ativarCiclo() {
  const cicloValue = document.getElementById("ciclos").value;
  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  if (!cicloValue) {
    alert("Por favor, insira um ciclo válido.");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/ciclo?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ciclo: "sim", ciclo1: cicloValue }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao ativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Ciclo ativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao ativar ciclo. Tente novamente.");
    });
}

function desativarCiclo() {
  const cicloValue = document.getElementById("ciclos").value;
  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  if (!cicloValue) {
    alert("Por favor, insira um ciclo válido.");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/ciclo?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ciclo: "nao", ciclo1: cicloValue }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao desativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Ciclo desativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao desativar ciclo. Tente novamente.");
    });
}
function validarAposta(input) {
  const valor = parseFloat(input.value);
  const mensagem = document.getElementById("mensagemErroStop1");

  mensagem.textContent = "";

  if (input.value === "") {
    return;
  }

  if (valor < 0 || isNaN(valor)) {
    mensagem.textContent =
      "Valor inválido! Deve ser um número maior ou igual a 0.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (Math.abs(valor % 2.5) > 0.001) {
    mensagem.textContent =
      "Valor inválido! Apenas 0 ou múltiplos de 2.5 são permitidos.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }
}
document.getElementById("salvarBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const g0 = parseFloat(document.getElementById("g0").value) || 0;
  const g1 = parseFloat(document.getElementById("g1").value) || 0;
  const g2 = parseFloat(document.getElementById("g2").value) || 0;
  const g3 = parseFloat(document.getElementById("g3").value) || 0;
  const g4 = parseFloat(document.getElementById("g4").value) || 0;
  const g5 = parseFloat(document.getElementById("g5").value) || 0;

  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  fetch(`https://automa-cassinos.dev.br/adicionar_valores?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ g0, g1, g2, g3, g4, g5 }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        Swal.fire({
          icon: "success",
          text: "Valores salvos com sucesso.",
          confirmButtonText: "Ok",
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});

document.getElementById("salvarBtn1").addEventListener("click", function (e) {
  e.preventDefault();

  const e0 = parseFloat(document.getElementById("e0").value) || 0;
  const e1 = parseFloat(document.getElementById("e1").value) || 0;
  const e2 = parseFloat(document.getElementById("e2").value) || 0;
  const e3 = parseFloat(document.getElementById("e3").value) || 0;
  const e4 = parseFloat(document.getElementById("e4").value) || 0;
  const e5 = parseFloat(document.getElementById("e5").value) || 0;

  const token = localStorage.getItem("authToken");

  if (!token) {
    return;
  }

  fetch(`https://automa-cassinos.dev.br/adicionar_valores_e?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ e0, e1, e2, e3, e4, e5 }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        Swal.fire({
          icon: "success",
          text: "Valores salvos com sucesso.",
          confirmButtonText: "Ok",
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});

function verificarStops(input) {
  const stopWin = parseFloat(document.getElementById("stopWin").value);
  const stopLoss = parseFloat(document.getElementById("stopLoss").value);
  const mensagem = document.getElementById("mensagemErroStop");

  mensagem.textContent = "";

  if (input.value === "") {
    return;
  }

  if (
    parseFloat(input.value) < 0 ||
    !Number.isInteger(parseFloat(input.value))
  ) {
    mensagem.textContent =
      "Valor inválido! Deve ser um número inteiro maior ou igual a 0.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (input.id === "stopLoss" && stopLoss > stopWin) {
    mensagem.textContent = "Stop Loss não pode ser maior que Stop Win.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (input.id === "stopWin" && stopWin <= stopLoss) {
    mensagem.textContent = "Stop Win deve ser maior que Stop Loss.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }
}
async function salvarStops() {
  const stopWin = document.getElementById("stopWin").value;
  const stopLoss = document.getElementById("stopLoss").value;
  const token = localStorage.getItem("authToken");

  if (!stopWin || !stopLoss) {
    Swal.fire({
      icon: "warning",
      text: "Por favor, insira os valores de Stop Win e Stop Loss.",
      confirmButtonText: "Ok",
    });
    return;
  }

  if (!token) {
    alert("Error.");
    return;
  }

  try {
    const response = await fetch(
      `https://automa-cassinos.dev.br/stops?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stopWin, stopLoss }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Stop Win e Stop Loss salvos com sucesso!");
      document.getElementById("stopWin").value = "";
      document.getElementById("stopLoss").value = "";
    } else {
      alert("Erro ao salvar os stops: ");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao salvar os stops.");
  }
}

function validarEstrategia(input) {
  const regex = /^[AVE]+=[AVE]=\d+$/;
  const valor = input.value;
  const mensagem = document.getElementById("mensagemErro");

  if (valor === "") {
    mensagem.textContent = "";
  } else if (regex.test(valor)) {
    const partes = valor.split("=");
    const numeroFinal = parseInt(partes[2], 10);

    if (numeroFinal <= 5) {
      mensagem.textContent = "Estratégia válida!";
      mensagem.style.color = "green";
    } else {
      mensagem.textContent = "O número não pode ser maior que 5!";
      mensagem.style.color = "red";
    }
  } else {
    mensagem.textContent = "Formato inválido! Ex: AAVA=V=2, EEVA=A=5";
    mensagem.style.color = "red";
  }
}

async function salvarEstrategia() {
  const estrategia = document.getElementById("estrategia").value;
  const token = localStorage.getItem("authToken");

  if (!estrategia) {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios",
      text: "Por favor, insira uma estratégia.",
      confirmButtonText: "Entendido",
      customClass: {
        popup: "custom-swal", // Classe personalizada
        title: "custom-swal-title", // Classe personalizada para o título
        confirmButton: "custom-swal-confirm", // Classe personalizada para o botão
      },
    });

    return;
  }

  if (!token) {
    alert("Error");
    return;
  }

  try {
    const response = await fetch(
      `https://automa-cassinos.dev.br/estrategias?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estrategia }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      document.getElementById("estrategia").value = "";
      document.getElementById("mensagemErro").textContent = "";
    } else {
      alert("Erro ao salvar a estratégia: " + data.message);
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao salvar a estratégia.");
  }
}

function fecharModal() {
  document.getElementById("modalEstrategias").style.display = "none";
}

async function deletarEstrategia(index) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Error.");
    return;
  }

  try {
    const response = await fetch(
      `https://automa-cassinos.dev.br/estrategias/${index}?token=${token}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (response.ok) {
      verEstrategias();
    } else {
      alert("Erro ao deletar a estratégia: ");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar a estratégia.");
  }
}
/************************************************* */
/*************************************************** */
function verificarDemo(input) {
  const valor = parseInt(input.value);
  const mensagem = document.getElementById("mensagemErroStop9");

  mensagem.textContent = "";

  if (input.value === "") {
    return;
  }

  if (input.value.includes("-")) {
    mensagem.textContent = "Valor inválido! Não é permitido o sinal negativo.";
    input.value = input.value.replace("-", "");
    mensagem.style.color = "red";
    return;
  }

  if (isNaN(valor)) {
    mensagem.textContent = "Valor inválido! Deve ser um número.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (valor < 0) {
    mensagem.textContent = "Valor inválido! Deve ser maior que 0.";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }

  if (valor < 1 || valor > 500000000) {
    mensagem.textContent =
      "Valor fora do limite permitido (entre 1 e 500000000).";
    input.value = "";
    mensagem.style.color = "red";
    return;
  }
}
function ativarDemo() {
  const demoValue = document.getElementById("saldo").value;
  const user_id = localStorage.getItem("userID");

  if (!user_id) {
    return;
  }

  if (!demoValue) {
    alert("Por favor, insira um ciclo válido.");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/saldo_demo?user_id=${user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usar_demo: "ativa",
      valor_demo: demoValue,
      user_id: user_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao ativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Ciclo ativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao ativar ciclo. Tente novamente.");
    });
}

function desativarDemo() {
  const user_id = localStorage.getItem("userID");
  if (!user_id) {
    return;
  }

  fetch(
    `https://automa-cassinos.dev.br/desativa_saldo_demo?user_id=${user_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usar_demo: "desativada", user_id: user_id }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao desativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "Ciclo desativado com sucesso!",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao desativar ciclo. Tente novamente.");
    });
}

/*********************************** */
/************************************ */
async function enviar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user_id = localStorage.getItem("userID");

  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios",
      text: "Por favor, preencha os campos.",
      confirmButtonText: "Entendido",
    });
    return;
  }

  if (!user_id) {
    alert("Error.");
    return;
  }

  try {
    const response = await fetch(
      `https://automa-cassinos.dev.br/casas?user_id=${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          user_id: user_id,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Dados enviados com sucesso!");
      document.getElementById("email").value = ""; // Limpa os campos
      document.getElementById("password").value = "";
    } else {
      alert("Erro ao enviar: ");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar.");
  }
}

function cobrirEmpate() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Token não encontrado no localStorage");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/empate?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ empate: "sim" }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao ativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "O empate vai ser coberto",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      alert("Erro ao cobrir empate");
    });
}

function naoEmpate() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Token não encontrado no localStorage");
    return;
  }

  fetch(`https://automa-cassinos.dev.br/empate?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ empate: "nao" }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao desativar ciclo.");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "O empate não vai ser coberto.",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      alert("Erro ao cobrir empate");
    });
}
