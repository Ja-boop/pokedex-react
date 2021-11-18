import React from 'react';

const PokemonAbilities = (props) => {
    return (
        <div className="result-pokemon-container pokemon-data-container pokeball-border">
            <h2 className="section-title" >Habilidades</h2>
            <div className="pokemon-body-container">
                <div className="pokemon-info pokemon-body-info">
                    {props.data.habilidades.map(habilidad => (
                        <span key={habilidad.id} >{habilidad.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PokemonAbilities;