interface Reference {
  name: string
  url: string
}

interface PokemonType {
  slot: number
  type: Reference
}

export interface Pokemon {
  id: string
  name: string
  height: number
  weight: number
  types: PokemonType[]
  sprites: {
    frontDefault: string
  }
}
