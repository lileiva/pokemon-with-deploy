import { PokemonUseCase } from '@domain/use-cases/pokemon.use-case'

describe('check implementation of the use case', () => {
  it('should call repository correctly', () => {
    const repository = {
      getEvolutionLists: jest.fn(),
    }
    const pokemonUseCase = PokemonUseCase(repository)
    pokemonUseCase.getEvolutionLists(0, 0)
    expect(repository.getEvolutionLists).toBeCalledWith(0, 0)
  })
})
