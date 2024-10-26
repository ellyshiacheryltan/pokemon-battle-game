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
    const pokecards = document.querySelectorAll('.pokecard');
    const thunder = document.getElementById('thunder');
    const whiteScreen = document.getElementById('white-screen');
    const cardBackground = document.querySelectorAll('.pokemon');
    const imgBackground = document.querySelectorAll('.img');
    const controlBtns = document.querySelectorAll('.control_btns');
    const VStext = document.getElementById('vs-text');

    pokecards.forEach(card => {
        card.classList.add('animate');
    })

    function thunderStrike() {
        thunder.style.zIndex = '2';
        thunder.style.animation = 'blinking .5s linear forwards';
    }

    function removeThunder() {
        thunder.style.zIndex = '-1';
        thunder.style.opacity = '0';
        thunder.style.animation = '';
    }

    function showWhiteScreen() {
        whiteScreen.style.zIndex = '3';
        whiteScreen.style.opacity = '1';
    }

    function removeWhiteScreen() {
        whiteScreen.style.opacity = '0';
        whiteScreen.style.zIndex = '-1';
    }

    function prepareBattlefield() {
        cardBackground[0].className = 'battleCard one';
        cardBackground[1].className = 'battleCard two';

        imgBackground.forEach(img => {
            img.classList.remove('img');
        })

        controlBtns.forEach(btn => {
            btn.style.display = 'none';
        })

        VStext.style.display = 'none';
    }

    setTimeout(thunderStrike, 400);
    setTimeout(removeThunder, 1000);
    setTimeout(showWhiteScreen, 450);
    setTimeout(removeWhiteScreen, 1000);
    setTimeout(prepareBattlefield, 1000);

    // let pokemonOne = cardElements[0].querySelector('h2').textContent.trim();
    // let pokemonTwo = cardElements[1].querySelector('h2').textContent.trim();
    // let pokemonOneStat = parseInt(cardElements[0].querySelector('span').textContent.trim());
    // let pokemonTwoStat = parseInt(cardElements[1].querySelector('span').textContent.trim());

    // if (pokemonOneStat > pokemonTwoStat) {
    //     cardElements[1].style.scale = '.7';
    // } else if (pokemonOneStat < pokemonTwoStat) {
    //     cardElements[0].style.scale = '.7';
    // } else {
    //     alert ("It's a tie!")
    // }

    // console logs to check if correct data is successfully retrieved
    // console.log(pokemonOne);
    // console.log(pokemonTwo);
    // console.log(pokemonOneStat);
    // console.log(pokemonTwoStat);
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

    // const battlefield = document.getElementById('battlefield');
    // const startInterface = document.getElementById('startInterface');
    // const pokemonLogo = document.getElementById('pokemonlogo');
    // const gameTitle = document.getElementById('headingOne');

    // startInterface.style.display = 'none';
    // battlefield.style.display = 'flex';
    // pokemonLogo.style.scale = '.7';
    // gameTitle.style.scale = '.7';
    // gameTitle.style.marginTop = '-2.3rem';
}

// // start game
// const startBtn = document.getElementById('pokeball');
// startBtn.addEventListener('click', displayRandomPokemon);

// // reshuffle Pokemon battle pair
// const reshuffleBtn = document.getElementById('shuffleBtn');
// reshuffleBtn.addEventListener('click', displayRandomPokemon);

// start battle
const battleBtn = document.getElementById('battleBtn');
battleBtn.addEventListener('click', decideWinner);

// display random pokemons on load
window.addEventListener('load', displayRandomPokemon);