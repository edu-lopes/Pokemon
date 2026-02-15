let pokemonID = 1;
carregarPokemon();

async function procurarPokemon(pokemonID) {
    try {
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        const dados = await request.json();
        return {
            id: dados.id,
            nome: dados.name,
            imagem: dados.sprites.front_default,
            tipo: dados.types.map(t => t.type.name),
            habilidade: dados.abilities.map(h => h.ability.name),
            status: dados.stats.map(s => ({
                name: s.stat.name,
                base_stat: s.base_stat
            }))
        }
    } catch (error) {
        console.log("Erro encontrado! Erro:", error.message);
        return null;
    }
};

const idPokemon = document.querySelector('.id-pokemon');
const nomePokemon = document.querySelector('.nome-pokemon');
const imgPokemon = document.querySelector('.img-pokemon');
const tipoPokemon = document.querySelector('.tipo-pokemon');
const habilidadePokemon = document.querySelector('.hability-pokemon');
const hpPokemon = document.querySelector('.hp');
const attackPokemon = document.querySelector('.attack');
const defensePokemon = document.querySelector('.defense');
const attackSpecialPokemon = document.querySelector('.special-attack');
const defenseSpecialPokemon = document.querySelector('.special-defense');
const speedPokemon = document.querySelector('.speed');

async function carregarPokemon() {
    const resultado = await procurarPokemon(pokemonID);
    if (!resultado) return;

    idPokemon.textContent = `#${resultado.id}`;
    nomePokemon.textContent = resultado.nome;
    imgPokemon.src = resultado.imagem;

    tipoPokemon.innerHTML = resultado.tipo.join(' | ');
    habilidadePokemon.innerHTML = resultado.habilidade.join(' | ');
    hpPokemon.textContent = `${resultado.status[0].name}: ${resultado.status[0].base_stat}`;
    attackPokemon.textContent = `${resultado.status[1].name}: ${resultado.status[1].base_stat}`;
    defensePokemon.textContent = `${resultado.status[2].name}: ${resultado.status[2].base_stat}`;
    attackSpecialPokemon.textContent = `${resultado.status[3].name}: ${resultado.status[3].base_stat}`;
    defenseSpecialPokemon.textContent = `${resultado.status[4].name}: ${resultado.status[4].base_stat}`;
    speedPokemon.textContent = `${resultado.status[5].name}: ${resultado.status[5].base_stat}`;
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