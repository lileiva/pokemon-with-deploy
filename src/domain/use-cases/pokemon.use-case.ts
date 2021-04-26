import { PokemonRepositoryInterface } from '@domain/repository-interfaces/pokemon-repository.interface'

export const PokemonUseCase = (pokemonRepository: PokemonRepositoryInterface) => ({
  getEvolutionLists: pokemonRepository.getEvolutionLists,
})

export interface PokemonUseCaseInterface extends ReturnType<typeof PokemonUseCase> {}
