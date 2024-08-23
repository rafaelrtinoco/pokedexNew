
//objeto
const pokeApi = {}

function nossoModeloPokemon(detalhePokemon) {
  const pokemonModel = new Pokemon() 
  pokemonModel.number = detalhePokemon.order
  pokemonModel.name = detalhePokemon.name
  
  const types = detalhePokemon.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types //destructing pegando primeiro type de types

  pokemonModel.types = types
  pokemonModel.type = type

  pokemonModel.photo = detalhePokemon.sprites.other.dream_world.front_default

  return pokemonModel
}

//metodo do objeto
pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json(''))
  .then(nossoModeloPokemon)
}

//metodo do objeto
pokeApi.getPokemons = (offset = 0, limit = 15) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then((response) => response.json())     
    .then((data) =>  data.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
      
}