// base url of the API
const url ='https://pokeapi.co/api/v2/pokemon';

const cardElements = document.querySelectorAll('.pokecard');

// fetch Pokemon data
let fetchPokemonData = (pokemonId) => {
    const apiUrl = `${url}/${pokemonId}`;
    return fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Failed to fetch data with ID ${pokemonId}`);
            }
            return response.json();
        }) 
};

// update Pokemon cards in HTML document
let updatePokemonCard = (cardElement, pokemonData) => {
    if(pokemonData) {
        cardElement.querySelector('h2').textContent = pokemonData.species.name;
        cardElement.querySelector('span').textContent = pokemonData.base_experience;
        cardElement.querySelector('img').src = pokemonData.sprites.front_default;
        const pokemonType = pokemonData.types[0].type.name;
        cardElement.querySelector('.pokemon').classList.add(pokemonType);
    }
}

// decide winner of Pokemon battle
let decideWinner = () => {
    let pokemonOne = cardElements[0].querySelector('h2').textContent.trim();
    let pokemonTwo = cardElements[1].querySelector('h2').textContent.trim();
    let pokemonOneStat = parseInt(cardElements[0].querySelector('span').textContent.trim());
    let pokemonTwoStat = parseInt(cardElements[1].querySelector('span').textContent.trim());

    if (pokemonOneStat > pokemonTwoStat) {
        cardElements[1].style.scale = '.7';
    } else if (pokemonOneStat < pokemonTwoStat) {
        cardElements[0].style.scale = '.7';
    } else {
        alert ("It's a tie!")
    }

    console.log(pokemonOne);
    console.log(pokemonTwo);
    console.log(pokemonOneStat);
    console.log(pokemonTwoStat);
}

// display random Pokemon in targeted HTML elements
let displayRandomPokemon = () => {
    cardElements.forEach(cardElement => {
        const randomPokemonId = Math.floor(Math.random() * 151) + 1;
        fetchPokemonData(randomPokemonId)
            .then(pokemonData => {
                updatePokemonCard(cardElement, pokemonData);
            })
            .catch(error => {
                console.log(error.message);
            })
    });

    const battlefield = document.getElementById('battlefield');
    const startInterface = document.getElementById('startInterface');
    const pokemonLogo = document.getElementById('pokemonlogo');
    const gameTitle = document.getElementById('headingOne');

    startInterface.style.display = 'none';
    battlefield.style.display = 'flex';
    pokemonLogo.style.scale = '.7';
    gameTitle.style.scale = '.7';
    gameTitle.style.marginTop = '-2.3rem';
}

// start game
const startBtn = document.getElementById('pokeball');
startBtn.addEventListener('click', displayRandomPokemon);

// reshuffle Pokemon battle pair
const reshuffleBtn = document.getElementById('shuffleBtn');
reshuffleBtn.addEventListener('click', displayRandomPokemon);

// start battle
const battleBtn = document.getElementById('battleBtn');
battleBtn.addEventListener('click', decideWinner);