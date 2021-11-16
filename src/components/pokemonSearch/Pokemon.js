import React from 'react';
import pokeapi from '../../pokeapi';
import { useParams } from 'react-router-dom';
import { useDebouncedFetchOnlyId } from '../../hooks/useFetchWithCache';
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
    const { data, error, loading } = useDebouncedFetchOnlyId(pokeapi.searchPokemon, pokeapi.getPokemonById, id, 500);

    if (loading) return <p>Cargando</p>;

    if (error) return 'Something went wrong';

    if (data)
        return (
            <>
                <div className="results-container">

                    <div className="pokemon-div">
                        <div className="result-pokemon-container pokemon-photo-container pokeball-border">
                            <img className="pokemon-img" src={data.image} alt={data.name} ></img>
                            <div className="result-pokemon-caption">
                                <p className="pokedex-paragraph">{data.name} N°{data.id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pokemon-divtwo">
                        <div className="result-pokemon-container pokemon-data-container pokeball-border">
                            <div className=" pokemon-body-container">
                                <div className="pokemon-info pokemon-body-info">
                                    <span>Altura: {insertDecimal(data.height)} m</span>

                                    <span>Peso: {insertDecimal(data.weight)} kg</span>
                                </div>
                            </div>

                            <div className="pokemon-types-container">
                                <div className="pokemon-types">
                                    {data.tipos.map(tipo => (
                                        <img className="type-img" src={POKEMON_TIPOS[tipo.name]} alt={tipo.name} key={tipo.id} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="result-pokemon-container pokemon-data-container pokeball-border">

                            <h2 className="section-title" >Habilidades</h2>
                            <div className="pokemon-body-container">
                                <div className="pokemon-info pokemon-body-info">
                                    {data.habilidades.map(habilidad => (
                                        <span key={habilidad.id} >{habilidad.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>




                </div>

                <h1 className="section-title" >Evoluciones</h1>
                <div className="result-pokemon-container slide-container pokeball-border">

                    <Slider
                        activeIndex={0}
                        threshHold={100}
                        transition={0.5}
                        scaleOnDrag={false}
                    >
                        {data.evoluciones.map(evolucion => (
                            <div className="slide-caption-image" key={evolucion.id}>
                                <img src={evolucion.image} key={evolucion.id} alt={evolucion.name} />
                            </div>
                        ))}
                    </Slider>

                </div>

                <div className="evolutions-container">
                    {data.evoluciones.map(evolucion => (
                        <div className="result-pokemon-container pokeball-border" key={evolucion.id} >
                            <img className="evolution-img" src={evolucion.image} key={evolucion.id} alt={evolucion.name} />
                        </div>
                    ))}
                </div>

            </>
        );
    return null;


};

export default Pokemon;
