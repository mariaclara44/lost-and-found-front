const BASE_URL = "http://localhost:3001";

const input = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const container = document.getElementById("itemsContainer");

async function carregarTodos() {
  const res = await fetch(`${BASE_URL}/itens`);
  const data = await res.json();
  mostrarItens(data.items);
}

async function buscarPorNome() {
  const nome = input.value.trim();

  if (nome === "") return carregarTodos();

  const res = await fetch(`${BASE_URL}/itens?title=${nome}`);
  const data = await res.json();

  mostrarItens(data.items);
}

function mostrarItens(lista) {
  container.innerHTML = "";

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
            <img src="${item.imageUrl}" alt="">
            <h3>${item.title}</h3>
            <p>${item.location}</p>
        `;

    container.appendChild(card);
  });
}

btnBuscar.addEventListener("click", buscarPorNome);
btnTodos.addEventListener("click", carregarTodos);

carregarTodos();
