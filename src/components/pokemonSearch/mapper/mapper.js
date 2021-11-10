import PokemonEntity from "../entity/pokemon";

function fromDataToEntity({
    'official-artwork': image,
}) {
    return new PokemonEntity({
        image,
    });
};

export default fromDataToEntity;
