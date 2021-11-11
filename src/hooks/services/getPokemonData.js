async function getPokemonTypes(getResource, resource) {
    const POKEMON_TYPES = [];

    for (let i = 0; i < resource.types.length; i++) {
        const type = await getResource(resource.types[i].type.url);
        POKEMON_TYPES.push(type)
    }

    return POKEMON_TYPES;
}

async function getPokemonAbilities(getResource, resource) {
    const POKEMON_ABILITIES = [];

    for (let i = 0; i < resource.abilities.length; i++) {
        const abilitie = await getResource(resource.abilities[i].ability.url);
        POKEMON_ABILITIES.push(abilitie);
    }

    return POKEMON_ABILITIES;
}

async function getEvoChain(getResource, resource) {
    const species = await getResource(resource.species.url);
    const evolutionChain = await getResource(species.evolution_chain.url);

    const POKEMON_EVOLUTION_CHAIN = [];
    const firstChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.species.name}`);
    let secondChain = [];
    let thirdChain = [];

    POKEMON_EVOLUTION_CHAIN.push(firstChain)

    if (evolutionChain.chain.evolves_to.length > 0) {
        secondChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].species.name}`)
        POKEMON_EVOLUTION_CHAIN.push(secondChain)

        if (evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
            thirdChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}`)
            POKEMON_EVOLUTION_CHAIN.push(thirdChain)
        }
    }

    return POKEMON_EVOLUTION_CHAIN;
}

export { getPokemonTypes, getPokemonAbilities, getEvoChain };