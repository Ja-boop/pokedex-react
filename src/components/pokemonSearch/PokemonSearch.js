import React, { useState } from 'react';
import './pokemonSearch.css';
import pokeapi from '../../pokeapi';
import { useDebouncedFetch } from '../../hooks/useFetchWithCache';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {
    return (
        <input className="search-bar pokeball-border"
            type="text"
            name="searchBar"
            id="search-bar"
            onChange={props.onChange}
            placeholder="¡Busca a tu pokemon preferido y haz click en su nombre!"
        />
    )
};

const PokemonSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, loading } = useDebouncedFetch(pokeapi.searchPokemon, pokeapi.getEachPokemonData, searchTerm, 500);
    let i = 0;

    return (
        <React.Fragment>
            <div className="search-bar-container">
                <FontAwesomeIcon icon={faSearch} className="icon" />
                <SearchBar onChange={(e) => setSearchTerm(e.target.value.toLowerCase().match(/^[A-Za-z-]+/))} value={searchTerm} />
            </div>
            {loading && <p>Cargando</p>}
            {data && (
                <div className="wrapper search-results-container">
                    {data.map((result) => (
                        <div className={"pokemon-" + ++i + " result-pokemon-container pokeball-border"} key={result.id}>
                            <img src={result.image} alt={result.name} width="100%" height="100%" ></img>

                            <div className="result-pokemon-caption">
                                <NavLink to={`/pokemon/${result.id}`}>
                                    <p className="pokedex-paragraph">{result.name}</p>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {error && <div>{error}</div>}
        </React.Fragment>
    )
};

export default PokemonSearch;
