module.exports = class Pokemon {
    constructor({
        id,
        name,
        height,
        weight,
        type,
        abilities,
        evolutionChain,
    }) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.type = type;
        this.abilities = abilities;
        this.evolutionChain = evolutionChain;
    }
};