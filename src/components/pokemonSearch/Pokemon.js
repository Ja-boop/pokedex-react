import React from 'react';
import pokeapi from '../../pokeapi';
import { NavLink, useParams } from 'react-router-dom';
import { FetchOnlyId } from '../../hooks/useSimpleFetch';
import Slider from 'react-touch-drag-slider';
import './pokemonSearch.css';
import './pokemon.css';

const POKEMON_TIPOS = {
    'Acero': "https://static.wikia.nocookie.net/espokemon/images/d/d9/Tipo_acero.gif",
    'Agua': "https://static.wikia.nocookie.net/espokemon/images/9/94/Tipo_agua.gif",
    'Bicho': "https://static.wikia.nocookie.net/espokemon/images/f/fe/Tipo_bicho.gif",
    'Dragon': "https://static.wikia.nocookie.net/espokemon/images/0/01/Tipo_drag%C3%B3n.gif",
    'Eléctrico': "https://static.wikia.nocookie.net/espokemon/images/1/1b/Tipo_el%C3%A9ctrico.gif",
    'Fantasma': "https://static.wikia.nocookie.net/espokemon/images/4/47/Tipo_fantasma.gif",
    'Fuego': "https://static.wikia.nocookie.net/espokemon/images/c/ce/Tipo_fuego.gif",
    'Hada': "https://static.wikia.nocookie.net/espokemon/images/b/bc/Tipo_hada.gif",
    'Hielo': "https://static.wikia.nocookie.net/espokemon/images/4/40/Tipo_hielo.gif",
    'Lucha': "https://static.wikia.nocookie.net/espokemon/images/b/b7/Tipo_lucha.gif",
    'Normal': "https://static.wikia.nocookie.net/espokemon/images/3/32/Tipo_normal.gif",
    'Planta': "https://static.wikia.nocookie.net/espokemon/images/d/d6/Tipo_planta.gif",
    'Psíquico': "https://static.wikia.nocookie.net/espokemon/images/1/15/Tipo_ps%C3%ADquico.gif",
    'Roca': "https://static.wikia.nocookie.net/espokemon/images/e/e0/Tipo_roca.gif",
    'Siniestro': "https://static.wikia.nocookie.net/espokemon/images/8/82/Tipo_siniestro.gif",
    'Tierra': "https://static.wikia.nocookie.net/espokemon/images/1/1d/Tipo_tierra.gif",
    'Veneno': "https://static.wikia.nocookie.net/espokemon/images/1/10/Tipo_veneno.gif",
    'Volador': "https://static.wikia.nocookie.net/espokemon/images/e/e1/Tipo_volador.gif",
    '???': "https://static.wikia.nocookie.net/espokemon/images/5/5d/Tipo_%3F%3F%3F.gif",
}

function insertDecimal(num) {
    return (num / 10).toFixed(1);
}

const Pokemon = () => {
    const { id } = useParams();
    const { data, error, loading } = FetchOnlyId(pokeapi.searchPokemon, pokeapi.getPokemonById, id, 500);

    if (loading) return <p>Cargando</p>;

    if (error) return 'Something went wrong';

    if (data)
        return (
            <>
                <div className="results-container">


                    <div className="pokemon-div">
                        <div className="result-pokemon-container pokemon-photo-container">
                            <img className="pokemon-img" src={data.resource.sprites.other['official-artwork'].front_default || data.resource.sprites.front_default} alt={data.resource.name} ></img>
                            <div className="result-pokemon-caption">
                                <p>{data.resource.name} N°{data.resource.id}</p>
                            </div>
                        </div>
                    </div>




                    <div className="pokemon-divtwo">

                        <div className="result-pokemon-container pokemon-data-container">
                            <div className=" pokemon-body-container">
                                <div className="pokemon-info pokemon-body-info">
                                    <span>Altura: {insertDecimal(data.resource.height)} m</span>

                                    <span>Peso: {insertDecimal(data.resource.weight)} kg</span>
                                </div>
                            </div>

                            <div className="pokemon-types-container">
                                <div className="pokemon-types">
                                    {data.tipos.map(tipo => (
                                        <img className="type-img" src={POKEMON_TIPOS[tipo]} alt={tipo} key={tipo} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="result-pokemon-container pokemon-data-container">

                            <h2 className="section-title" >Habilidades</h2>
                            <div className="pokemon-body-container">
                                <div className="pokemon-info pokemon-body-info">


                                    {data.habilidades.map(habilidad => (

                                        <span>{habilidad}</span>

                                    ))}

                                </div>
                            </div>

                        </div>
                    </div>




                </div>

                <h1 className="section-title" >Evoluciones</h1>
                <div className="result-pokemon-container slide-container">

                    <Slider
                        activeIndex={0}
                        threshHold={100}
                        transition={0.5}
                        scaleOnDrag={false}
                    >
                        {data.evoluciones.map(evolucion => (
                            <div className="slide-caption-image">
                                <img src={evolucion.sprites.other['official-artwork'].front_default || evolucion.sprites.front_default} key={evolucion.id} alt={evolucion.name} />
                            </div>
                        ))}
                    </Slider>

                </div>

                <div className="evolutions-container">
                    {data.evoluciones.map(evolucion => (
                        <div className="result-pokemon-container">
                            <img className="evolution-img" src={evolucion.sprites.other['official-artwork'].front_default || evolucion.sprites.front_default} key={evolucion.id} alt={evolucion.name} />
                        </div>
                    ))}
                </div>

            </>
        );
    return null;


};

export default Pokemon;