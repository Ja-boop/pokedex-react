import React from 'react';
import Slider from 'react-touch-drag-slider';
import { NavLink } from 'react-router-dom';

const PokemonEvolutionChain = (props) => {
    return (
        <>
            <h1 className="section-title" >Evoluciones</h1>
            <div className="result-pokemon-container slide-container pokeball-border">
                <Slider
                    activeIndex={0}
                    threshHold={100}
                    transition={0.5}
                    scaleOnDrag={false}
                >
                    {props.data.evoluciones.map(evolucion => (
                        <div className="slide-caption-image" key={evolucion.id}>
                            <NavLink to={`/pokemon/${evolucion.id}`}>
                                <img src={evolucion.image} key={evolucion.id} alt={evolucion.name} />
                            </NavLink>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="evolutions-container">
                {props.data.evoluciones.map(evolucion => (
                    <div className="result-pokemon-container pokeball-border" key={evolucion.id} >
                        <img className="evolution-img" src={evolucion.image} key={evolucion.id} alt={evolucion.name} />
                        <div className="result-pokemon-caption">
                            <NavLink to={`/pokemon/${evolucion.id}`}>
                                <p className="pokedex-paragraph">{evolucion.name} N°{evolucion.id}</p>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PokemonEvolutionChain;