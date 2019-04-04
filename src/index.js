document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  renderManyPokemonCards(POKEMON)
  document.getElementById('pokemon-search-input').addEventListener('keyup', renderFilteredCards)
})

// Event listener callback for filtering pokemon cards by search input value
function renderFilteredCards(e) {
  e.preventDefault()
  const searchQuery = e.target.value
  const filteredPokemon = POKEMON.filter(singlePokemon => singlePokemon.name.includes(searchQuery))
  renderManyPokemonCards(filteredPokemon)
}

function flipPokemonCard(e) {
  e.preventDefault()
  let pokemonImage
  if (!e.target.querySelector('img')) {
    pokemonImage = e.target
  }  else {
    pokemonImage = e.target.querySelector("img");
  }
  
  // Note: What if I expected a match to id 0? Loose type comparison would match an empty string. 
  const chosenPokemon = POKEMON.find(singlePokemon => singlePokemon.id === parseInt(pokemonImage.dataset.id))
  
  if (pokemonImage.dataset.action === 'flip') {
      pokemonImage.src = chosenPokemon.sprites.back
      pokemonImage.dataset.action = 'flop'
  } else {
    pokemonImage.src = chosenPokemon.sprites.front
    pokemonImage.dataset.action = 'flip'
  }
  
}

// Renders each pokemon card to screen, or message is no results found
function renderManyPokemonCards(allPokemon) {
  if (allPokemon.length < 1) {
    noResultsFound()
  } else {
    document.getElementById("pokemon-container").innerHTML = "";
    allPokemon.forEach(singlePokemon => renderSinglePokemonCard(singlePokemon))
  }
}

// Wap wap whaaaaa
function noResultsFound() {
  document.getElementById("pokemon-container").innerHTML = "No Mons' Here";
}

// Creates an html pokemon card from pokemon object and appends it to the page
// Cards will be rendered in the order of the array returned from the initial fetch
function renderSinglePokemonCard(singlePokemon) {

  const pokedex = document.getElementById('pokemon-container')
  const pokemonCard = document.createElement('div')

  pokemonCard.classList.add('pokemon-card')
  pokemonCard.innerHTML = `<div class="pokemon-frame">
      <h1 class="center-text">${singlePokemon.name}</h1>
      <div class="pokemon-image">
        <img data-id="${singlePokemon.id}" data-action="flip" class="toggle-sprite" src="${singlePokemon.sprites.front}">
      </div>
    </div>`
    pokemonCard.addEventListener('click', flipPokemonCard)
    pokedex.append(pokemonCard)
}