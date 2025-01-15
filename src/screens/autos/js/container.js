document.addEventListener("DOMContentLoaded", () => {
  const telaGame = document.getElementById("tela-game");
  const configContainer = document.getElementById("config-container");
  const gearIcon = document.getElementById("gear-icon");
  const tituloBot = document.querySelector("h1");
  const imgagem = document.querySelector(".imgagem");
  const contentArea = document.getElementById("content-area");

  configContainer.style.display = "none";

  const apiUrl = "https://automa-cassinos.dev.br/vericar_ligardesliga";
  const token = localStorage.getItem("authToken");

  if (token) {
    async function checkLigardesliga() {
      try {
        const response = await fetch(`${apiUrl}?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          const ligardesliga = data.ligardesliga;

          if (ligardesliga === 0 || ligardesliga === "0") {
            contentArea.classList.remove("hidden");
          } else {
            contentArea.classList.add("hidden");
          }
        } else {
          console.error("Erro na API:", data.message);
        }
      } catch (error) {
        console.error("Erro ao se conectar à API:", error);
      }
    }

    checkLigardesliga();
  } else {
    console.error("Token não encontrado no localStorage");
  }

  gearIcon.addEventListener("click", () => {
    if (configContainer.style.display === "none") {
      configContainer.style.display = "block";
      telaGame.style.display = "none";
      tituloBot.style.display = "none";
      imgagem.style.display = "none";
      contentArea.classList.add("hidden");
    } else {
      configContainer.style.display = "none";
      telaGame.style.display = "block";
      tituloBot.style.display = "block";
      imgagem.style.display = "block";

      checkLigardesliga();
    }
  });
});
