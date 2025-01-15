document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken") || "Token não encontrado";
  const connectionStatus = localStorage.getItem("ligarConexao") || "desligado";

  const apiMessage1Div = document.getElementById("api-message1");
  const apiMessage2Div = document.getElementById("api-message2");
  const apiMessage3Div = document.getElementById("api-message3");
  const apiMessage4Div = document.getElementById("api-message4");
  const apiMessage5Div = document.getElementById("api-message5");
  const apiMessage6Div = document.getElementById("api-message6");
  const apiMessage7Div = document.getElementById("api-message7");

  const socketConnection = () => {
    if (token === "Token não encontrado") {
      window.location.href = "../../../../index.html";
      return;
    }

    const socket = io("https://automa-cassinos.dev.br", {
      path: "/socket.io/server2",
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      socket.emit("auth", token);
    });

    socket.on("auth_success", (data) => {});

    if (socket && socket.connected) {
      return;
    }

    socket.on("auth_error", (data) => {});

    socket.on("mensage", (data) => {
      if (data && typeof data === "object") {
        if (data.mensagem) {
          const { mensagem, saldo, stopwin, stoplos } = data;

          console.log(`Mensagem: ${mensagem}`);
          console.log(`Saldo: ${saldo}`);
          console.log(`Stopwin: ${stopwin}`);
          console.log(`Stoplos: ${stoplos}`);

          const bolasHTML = mensagem
            .split("")
            .map((letra) => {
              const cores = { V: "red", A: "blue", E: "yellow" };
              return `<span class="bola" style="background-color: ${
                cores[letra] || "gray"
              };"></span>`;
            })
            .join("");

          apiMessage2Div.innerHTML = `<div class="bolas-container">${bolasHTML}</div>`;
          apiMessage3Div.innerHTML = `<p>${saldo}</p>`;
          apiMessage4Div.innerHTML = `<p>${stopwin}</p>`;
          apiMessage5Div.innerHTML = `<p>${stoplos}</p>`;
        }

        if (data.apostando !== undefined && data.apostando !== null) {
          apiMessage1Div.innerHTML = `<p>${data.apostando}</p>`;
        }
        if (data.valor_apostado !== undefined && data.valor_apostado !== null) {
          apiMessage6Div.innerHTML = `<p>${data.valor_apostado}</p>`;
        }
        if (data.valor_empate !== undefined && data.valor_empate !== null) {
          apiMessage7Div.innerHTML = `<p>${data.valor_empate}</p>`;
        }
      } else {
        apiMessage2Div.innerHTML = `<p style="color: red;">Dados inválidos recebidos (bacbo)</p>`;
      }
    });

    socket.on("connect_error", (error) => {});

    socket.on("disconnect", () => {
      socketConnection();
    });

    return socket;
  };

  const attachButtonEvents = () => {
    document.querySelectorAll(".btn.ligar").forEach((button) => {
      button.addEventListener("click", () => {
        let conecxao = "ligado";
        localStorage.setItem("ligarConexao", conecxao);
        socketConnection();
      });
    });

    document.querySelectorAll(".btn.desligar").forEach((button) => {
      button.addEventListener("click", () => {
        let conecxao = "desligado";
        localStorage.setItem("ligarConexao", conecxao);
      });
    });
  };

  if (connectionStatus === "ligado") {
    socketConnection();
  }

  attachButtonEvents();
});
