import { ApiRepository } from '@data/api.repository'
import { EvolutionChainFactory } from '@tests/data/factories/evolution-chain.factory'
import { PokemonFactory } from '@tests/data/factories/pokemon.factory'
import { ResourceListFactory } from '@tests/data/factories/resource-list.factory'
import { mocked } from 'ts-jest/utils'
import { of } from 'rxjs'
import { get, getList } from '../../src/data/api'

jest.mock('../../src/data/api')

describe('Test suite for api repository', () => {
  it('should get a list of list of ids', (done) => {
    const repo = ApiRepository()
    const limit = 3
    const offset = 0

    const mockedResourceList = ResourceListFactory.build({
      results: [{ url: 'https://pokeapi.co/api/v2/evolution-chain/1/' }, { url: 'https://pokeapi.co/api/v2/evolution-chain/2/' }, { url: 'https://pokeapi.co/api/v2/evolution-chain/3/' }],
    })

    const mockedChainList = EvolutionChainFactory.build({
      chain: { species: { name: 'name', url: 'pokemon-species/2' }, evolves_to: [{ species: { url: 'pokemon-species/1', name: 'name' } }] },
    })

    mocked(get).mockReturnValue(of(mockedResourceList))
    mocked(getList).mockReturnValue(of([mockedChainList]))

    repo.getEvolutionListsToPokemonIds(limit, offset).subscribe(
      (result) => {
        expect(get).toBeCalledWith('https://pokeapi.co/api/v2/evolution-chain/', { limit: '3', offset: '0' })
        expect(getList).toBeCalledWith(['https://pokeapi.co/api/v2/evolution-chain/1/', 'https://pokeapi.co/api/v2/evolution-chain/2/', 'https://pokeapi.co/api/v2/evolution-chain/3/'])
        expect(result.flat()).toContain('2')
        expect(result.flat()).toContain('1')
        done()
      },
    )
  })

  it('should parse the pokemon', (done) => {
    const repo = ApiRepository()
    const chainIds = [['1', '2', '3']]

    const mockedPokemonList = PokemonFactory.buildList(3)

    mocked(getList).mockReturnValue(of(mockedPokemonList))

    repo.fromIdsToPokemonList(chainIds).subscribe((mappedPokemon) => {
      mappedPokemon.flat().forEach((pokemon, index) => {
        expect(pokemon.imageUrl).toMatch(mockedPokemonList[index].sprites.front_default)
        done()
      })
    })
  })
})
