export class Pokemon {
    "name": string;
}

export class PokemonList {
    "name": string;
    "url": string;
}

export class Limit {
    "count": number;
    "next": string | null;
    "previous": string | null;
    "results": PokemonList[];
}