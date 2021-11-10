const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9000';

const getResource = async (resourceUrl) => {
    const response = await fetch(resourceUrl);
    if(!response.ok) {
        throw new Error('API Error');
    }

    return response.json();
};

const pokeapi = {
    searchPokemon: (url) => 
        getResource(url || BASE_URL),
    getEachPokemonData: (url) => getResource(url),
    getPokemonById: (id) => getResource(`https://pokeapi.co/api/v2/pokemon/${id}`)
};

export default pokeapi;
