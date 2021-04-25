/* eslint-disable camelcase */
interface Reference {
  name: string
  url: string
}

interface PokemonAbility {
  name: string
  is_hidden: boolean
  slot: number
  ability: Reference
}

interface PokemonForm {
  name: string
  url: string
}

interface PokemonStat{
  base_stat: number
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
  base_experience: number
  height: number
  order: number
  weight: number
  abilities: PokemonAbility[]
  forms: PokemonForm[]
  sprites: {
    front_default: string
  }
  species:{
    name: string
    url: string
  }
  stats: PokemonStat[]
  types: PokemonType[]
}
