import { Pokemon as PokemonDTO } from '@data/api/types/pokemon.type'
import { Pokemon } from '@domain/entities/pokemon.entity'

const parsePokemonAbilities = (abilitiesDTO: PokemonDTO['abilities']):Pokemon['abilities'] => abilitiesDTO.map((abilityDTO) => ({
  ...abilityDTO,
  isHidden: abilityDTO.is_hidden,
}))

const parsePokemonStats = (statsDTO: PokemonDTO['stats']):Pokemon['stats'] => statsDTO.map((statDTO) => ({
  ...statDTO,
  baseStat: statDTO.base_stat,
}))

const parsePokemonTypes = (typesDTO: PokemonDTO['types']):Pokemon['types'] => new Set(typesDTO.map((type) => type.type.name))

export const parsePokemonFromApiToPokemonEntity = (pokemonDTO : PokemonDTO): Pokemon => ({
  ...pokemonDTO,
  baseExperience: pokemonDTO.base_experience,
  abilities: parsePokemonAbilities(pokemonDTO.abilities),
  sprites: {
    frontDefault: pokemonDTO.sprites.front_default,
  },
  stats: parsePokemonStats(pokemonDTO.stats),
  types: parsePokemonTypes(pokemonDTO.types),
  weight: Number(pokemonDTO.weight),
  height: Number(pokemonDTO.height),
})
