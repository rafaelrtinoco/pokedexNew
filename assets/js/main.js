const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;



function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemonModel) => `
      <li class="pokemon ${pokemonModel.type}">
            <span class="number">#${pokemonModel.number}</span>
            <pan class="name">${pokemonModel.name}</pan>
            <div class="detail">
              <ol class="types">
                ${pokemonModel.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ol>
              <img src="${pokemonModel.photo}"
                alt="${pokemonModel.name}">
            </div>
          </li>
    `
      )
      .join("");

    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit
  if(qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }


  loadPokemonItens(offset, limit);
});
