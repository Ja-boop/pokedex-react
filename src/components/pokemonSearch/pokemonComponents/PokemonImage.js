import React from 'react';

const PokemonImage = (props) => {
    return (

        <div className="result-pokemon-container pokemon-photo-container pokeball-border">
            <img className="pokemon-img" src={props.data.image} alt={props.data.name} ></img>
            <div className="result-pokemon-caption">
                <p className="pokedex-paragraph">{props.data.name} N°{props.data.id}</p>
            </div>
        </div>

    )
}

export default PokemonImage;