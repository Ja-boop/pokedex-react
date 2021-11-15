import { useEffect, useReducer, useContext } from 'react';
import { CacheContext } from '../CacheContext';
import { getPokemonTypes, getPokemonAbilities, getEvoChain } from './services/getPokemonData.js';

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

export const useDebouncedFetch = (fetchResource, fetchIdResource, param, timeout) => {
    const cache = useContext(CacheContext);
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    // Quise separar el proceso de hacer el objeto POKEMON_DATA en una funcion aparte, pero me hacia el objeto 15 veces al llamar a la funcion 

    useEffect(() => {
        if (cache.state[param]) {
            dispatch({ type: 'SUCCESS', payload: cache.state[param] });
            return;
        };

        const timeoutId = setTimeout(async () => {
            if (param) {
                dispatch({ type: 'LOAD' });
                try {
                    const POKEMON_DATA = [];
                    let pokemones = [];

                    const resource = await fetchResource();
                    const filterPokemones = resource.results.filter(pokemon => {
                        return pokemon.name.includes(param)
                    })

                    const slicePokemones = filterPokemones.slice(0, 15);

                    for (let i = 0; i < slicePokemones.length; i++) {
                        pokemones.push(await fetchIdResource(filterPokemones[i].url))

                        POKEMON_DATA.push({
                            id: pokemones[i].id,
                            name: pokemones[i].name,
                            image: pokemones[i].sprites.other['official-artwork'].front_default || pokemones[i].sprites.front_default,
                        });
                    }
                    
                    dispatch({ type: 'SUCCESS', payload: POKEMON_DATA });
                    cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: POKEMON_DATA } });
                } catch (error) {
                    dispatch({ type: 'FAILURE', payload: error });
                }
            } else {
                dispatch({ type: 'INITIAL' }) // Si pongo initialState, no limpia la pagina al borrar lo escrito en el buscador de pokemones
            }

        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [fetchResource, cache, fetchIdResource, param, timeout]);

    return state;
};

export function useInstantFetch(fetchResource, fetchIdResource, param) {
    const cache = useContext(CacheContext);
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (cache.state[param]) {
            dispatch({ type: 'SUCCESS', payload: cache.state[param] });
            return;
        };

        const fetch = async () => {
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
                cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: pokemones } });
            } catch (error) {
                dispatch({ type: 'FAILURE', payload: error });
            }
        };
        fetch();
    }, [param, cache, fetchResource, fetchIdResource]);

    return state;
};

export const useDebouncedFetchOnlyId = (getResource, fetchIdResource, param, timeout) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    const cache = useContext(CacheContext);

    useEffect(() => {
        if (cache.state[param]) {
            dispatch({ type: 'SUCCESS', payload: cache.state[param] });
            return;
        };


        const timeoutId = setTimeout(async () => {
            if (param) {
                dispatch({ type: 'LOAD' });
                try {
                    const resource = await fetchIdResource(param);
                    const POKEMON_DATA = {
                        id: resource.id,
                        name: resource.name,
                        height: resource.height,
                        weight: resource.weight,
                        image: resource.sprites.other['official-artwork'].front_default || resource.sprites.front_default,
                        tipos: await getPokemonTypes(getResource, resource),
                        habilidades: await getPokemonAbilities(getResource, resource),
                        evoluciones: await getEvoChain(getResource, resource),
                    }

                    console.log(POKEMON_DATA);

                    dispatch({ type: 'SUCCESS', payload: POKEMON_DATA });
                    cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: POKEMON_DATA } });
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
    }, [getResource, cache, fetchIdResource, param, timeout]);

    return state;
};
