import React from 'react';
import pokeapi from '../../pokeapi';
import { useParams } from 'react-router-dom';
import { useDebouncedFetchOnlyId } from '../../hooks/useFetchWithCache';
import './pokemonSearch.css';
import './pokemon.css';
import PokemonPhysique from './pokemonComponents/PokemonPhysique';
import PokemonImage from './pokemonComponents/PokemonImage';
import PokemonAbilities from './pokemonComponents/PokemonAbilities';
import PokemonEvolutionChain from './pokemonComponents/PokemonEvolutionChain';


const Pokemon = () => {
    const { id } = useParams();
    const { data, error, loading } = useDebouncedFetchOnlyId(pokeapi.searchPokemon, pokeapi.getPokemonById, id, 500);

    if (loading) return <p>Cargando</p>;

    if (error) return 'Something went wrong';

    if (data)
        return (
            <>
                <div className="results-container">
                    <div className="pokemon-div">
                        <PokemonImage data={data} />
                    </div>
                    <div className="pokemon-divtwo">
                        <PokemonPhysique tipos={data.tipos} data={data} />
                        <PokemonAbilities data={data} />
                    </div>
                </div>

                <PokemonEvolutionChain data={data} />
            </>
        );
    return null;


};

export default Pokemon;
