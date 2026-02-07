let pokemonID = 1;
carregarPokemon();

async function procurarPokemon(pokemonID) {
    try {
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        const dados = await request.json();
        return {
            id: dados.id,
            nome: dados.name,
            imagem: dados.sprites.front_default
        }
    } catch (error) {
        console.log("Erro encontrado! Erro:", error.message);
        return null;
    }
};

const idPokemon = document.querySelector('.id-pokemon');
const nomePokemon = document.querySelector('.nome-pokemon');
const imgPokemon = document.querySelector('.img-pokemon');

async function carregarPokemon() {
    const resultado = await procurarPokemon(pokemonID);
    if (!resultado) return;
    
    idPokemon.textContent = `#${resultado.id}`;
    nomePokemon.textContent = resultado.nome;
    imgPokemon.src = resultado.imagem;
}

function anteriorPokemon() {
    if (pokemonID > 1) {
        pokemonID--;
        carregarPokemon();
    }
}

function proximoPokemon() {
    pokemonID++;
    carregarPokemon();
}