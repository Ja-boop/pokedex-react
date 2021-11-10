import { useState, useEffect, useReducer } from "react";

export const useFetchOnChange = (fetchResource, fetchIdResource, param, timeout) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (param) {
                setLoading(true);
                setError(null);
                setData(null);

                try {
                    let pokemones = [];
                    const resource = await fetchResource();
                    const filterPokemones = resource.results.filter(pokemon => {
                        return pokemon.name.includes(param)
                    })

                    const slicePokemones = filterPokemones.slice(0, 15);

                    for (let i = 0; i < slicePokemones.length; i++) {
                        pokemones.push(await fetchIdResource(filterPokemones[i].url))
                    }

                    setData(pokemones);
                } catch (error) {
                    setError(error);
                }

                setLoading(false)
            } else {
                setData(null);
                setError(null);
            }
        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [fetchResource, fetchIdResource, param, timeout]);

    return { data, error, loading };
};

// REDUCER

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'INITIAL':
            return { ...state, loading: false, data: null, error: null };
        case 'LOAD':
            return { ...state, loading: true, data: null, error: null };
        case 'SUCCESS':
            return { ...state, loading: false, data: payload, error: null };
        case 'FAILURE':
            return { ...state, loading: false, data: null, error: payload };
        default:
            return state;
    }
};

export const useFetchReducer = (fetchResource, fetchIdResource, param, timeout) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (param) {
                dispatch({ type: 'LOAD' });
                try {
                    let pokemones = [];
                    const resource = await fetchResource();
                    const filterPokemones = resource.results.filter(pokemon => {
                        return pokemon.name.includes(param)
                    })

                    const slicePokemones = filterPokemones.slice(0, 15);

                    for (let i = 0; i < slicePokemones.length; i++) {
                        pokemones.push(await fetchIdResource(filterPokemones[i].url))
                    }

                    dispatch({ type: 'SUCCESS', payload: pokemones });
                } catch (error) {
                    dispatch({ type: 'FAILURE', payload: error });
                }
            } else {
                dispatch({ type: 'INITIAL' })
            }

        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [fetchResource, fetchIdResource, param, timeout]);

    return state;
};

export const FetchOnlyId = (getResource, fetchIdResource, param, timeout) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (param) {
                dispatch({ type: 'LOAD' });
                try {
                    const resource = await fetchIdResource(param);
                    const POKEMON_TYPES = [];
                    const POKEMON_ABILITIES = [];
                    const POKEMON_EVOLUTION_CHAIN = [];

                    console.log(resource)

                    for (let i = 0; i < resource.types.length; i++) {
                        const type = await getResource(resource.types[i].type.url);
                        POKEMON_TYPES.push(type.names[4].name)
                    }

                    for (let i = 0; i < resource.abilities.length; i++) {
                        const abilitie = await getResource(resource.abilities[i].ability.url);
                        POKEMON_ABILITIES.push(abilitie.names[5].name);
                    }

                    const species = await getResource(resource.species.url);
                    const evolutionChain = await getResource(species.evolution_chain.url);



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

                    const POKEMON_DATA = {
                        resource,
                        tipos: POKEMON_TYPES,
                        habilidades: POKEMON_ABILITIES,
                        evoluciones: POKEMON_EVOLUTION_CHAIN,
                    }

                    dispatch({ type: 'SUCCESS', payload: POKEMON_DATA });
                } catch (error) {
                    dispatch({ type: 'FAILURE', payload: error });
                }
            } else {
                dispatch({ type: 'INITIAL' })
            }

        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [getResource, fetchIdResource, param, timeout]);

    return state;
};
