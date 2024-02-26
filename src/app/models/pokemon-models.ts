export class Pokemon {
  'id': string;
  'name': string;
  'sprite': string;
  'types': {
    type_1: string
    type_2: string | null
  };
}

export class PokemonList {
  'name': string;
  'url': string;
}

export class PokemonTypeList {
  'pokemon': {
    name: string;
    url: string;
  };
}

export class Limit {
  'count': number;
  'next': string | null;
  'previous': string | null;
  'results': PokemonList[];
}
