import { useState, useEffect, useReducer } from "react";
import { getPokemonTypes, getPokemonAbilities, getEvoChain } from './services/getPokemonData.js';

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
                dispatch({ type: 'INITIAL' }) // Si pongo initialState, no limpia la pagina al borrar lo escrito en el buscador de pokemones
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
                    const POKEMON_DATA = {
                        resource,
                        tipos: await getPokemonTypes(getResource, resource),
                        habilidades: await getPokemonAbilities(getResource, resource),
                        evoluciones: await getEvoChain(getResource, resource),
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

