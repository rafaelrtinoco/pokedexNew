
function convertPokemnToHtml(pokemonModel) {
  return `
  <li class="pokemon ${pokemonModel.type}">
        <span class="number">#${pokemonModel.number}</span>
        <pan class="name">${pokemonModel.name}</pan>
        <div class="detail">
          <ol class="types">
            ${pokemonModel.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemonModel.photo}"
            alt="${pokemonModel.name}">
        </div>
      </li>
  `
}

const pokemonList = document.getElementById('pokemonList');


pokeApi.getPokemons()
.then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemnToHtml).join('')
})

  
