async function getPokemonTypes(getResource, resource) {
    const POKEMON_TYPES = [];

    for (let i = 0; i < resource.types.length; i++) {
        const type = await getResource(resource.types[i].type.url);
        POKEMON_TYPES.push({ id: type.id, name: type.names[4].name })
    }

    return POKEMON_TYPES;
}

async function getPokemonAbilities(getResource, resource) {
    const POKEMON_ABILITIES = [];

    for (let i = 0; i < resource.abilities.length; i++) {
        const abilitie = await getResource(resource.abilities[i].ability.url);
        POKEMON_ABILITIES.push({ id: abilitie.id, name: abilitie.names[5].name });
    }

    return POKEMON_ABILITIES;
}

async function getEvoChain(getResource, resource) {
    const species = await getResource(resource.species.url);
    const evolutionChain = await getResource(species.evolution_chain.url);

    const POKEMON_EVOLUTION_CHAIN = [];
    const firstChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.species.name}`);

    POKEMON_EVOLUTION_CHAIN.push({ id: firstChain.id, name: firstChain.name, image: firstChain.sprites.other['official-artwork'].front_default || firstChain.sprites.front_default })

    if (evolutionChain.chain.evolves_to.length > 0) {
        const secondChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].species.name}`)
        POKEMON_EVOLUTION_CHAIN.push({ id: secondChain.id, name: secondChain.name, image: secondChain.sprites.other['official-artwork'].front_default || secondChain.sprites.front_default })

        if (evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
            const thirdChain = await getResource(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}`)
            POKEMON_EVOLUTION_CHAIN.push({ id: thirdChain.id, name: thirdChain.name, image: thirdChain.sprites.other['official-artwork'].front_default || thirdChain.sprites.front_default })
        }
    }

    return POKEMON_EVOLUTION_CHAIN;
}

export { getPokemonTypes, getPokemonAbilities, getEvoChain };