import { PokemonRepositoryInterface } from '@domain/repository-interfaces/pokemon-repository.interface'

export const PokemonUseCase = (pokemonRepository: PokemonRepositoryInterface) => ({
  getPokemon: pokemonRepository.getPokemon,
  getPokemonList: pokemonRepository.getPokemonList,
  getEvolutionLists: pokemonRepository.getEvolutionLists,
})

export interface PokemonUseCaseInterface extends ReturnType<typeof PokemonUseCase> {}
