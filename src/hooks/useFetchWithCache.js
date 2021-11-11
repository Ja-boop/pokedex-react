import { useEffect, useReducer, useContext } from 'react';
import { CacheContext } from '../CacheContext';

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

    useEffect(() => {
        if (cache.state[param]) {
            dispatch({ type: 'SUCCESS', payload: cache.state[param] });
            return;
        };

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
                    cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: pokemones } });
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
