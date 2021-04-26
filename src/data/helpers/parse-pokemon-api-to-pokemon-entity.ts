import { Pokemon as PokemonDTO } from '@data/api/types/pokemon.type'
import { Pokemon } from '@domain/entities/pokemon.entity'

const parsePokemonTypes = (typesDTO: PokemonDTO['types']):Pokemon['types'] => new Set(typesDTO.map((type) => type.type.name))

export const parsePokemonFromApiToPokemonEntity = (pokemonDTO : PokemonDTO): Pokemon => ({
  ...pokemonDTO,
  types: parsePokemonTypes(pokemonDTO.types),
  weight: Number(pokemonDTO.weight),
  height: Number(pokemonDTO.height),
  imageUrl: pokemonDTO.sprites.front_default,
})
