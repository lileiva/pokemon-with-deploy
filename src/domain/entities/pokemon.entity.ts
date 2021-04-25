interface Reference {
  name: string
}

interface PokemonAbility {
  name: string
  isHidden: boolean
  slot: number
  ability: Reference
}

interface PokemonForm {
  name: string
  url: string
}

interface PokemonStat{
  baseStat: number
  effort: number
  stat : Reference
}

interface PokemonType {
  slot: number
  type: Reference
}

export interface Pokemon {
  id: number
  name: string
  baseExperience: number
  height: number
  order: number
  weight: number
  abilities: PokemonAbility[]
  forms: PokemonForm[]
  sprites: {
    frontDefault: string
  }
  species:{
    name: string
    url: string
  }
  stats: PokemonStat[]
  types: PokemonType[]
}
