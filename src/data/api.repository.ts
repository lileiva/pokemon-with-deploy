import { map, mergeMap } from 'rxjs/operators'
import { flatEvolutionChainIds } from '@data/helpers/flat-evolution-chain'
import { forkJoin } from 'rxjs'
import { get, getList } from './api'
import { Pokemon } from './api/types/pokemon.type'
import { ResourceList } from './api/types/resource-list.type'
import { EvolutionChain } from './api/types/evolution-chain.type'
import { parsePokemonFromApiToPokemonEntity } from './helpers/parse-pokemon-api-to-pokemon-entity'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const ApiRepository = () => {
  const getEvolutionListsToPokemonIds = (limit:number, offset: number) => get<ResourceList>(`${BASE_URL}/evolution-chain/`, { limit: `${limit}`, offset: `${offset}` }).pipe(
    mergeMap(
      (evolutionChainList) => getList<EvolutionChain>(evolutionChainList.results.map(
        ({ url }) => url,
      )),
    ),
    map((evolutionChain) => evolutionChain.map(flatEvolutionChainIds)),
  )

  const fromIdsToPokemonList = (evolutionChainIds: string[][]) => {
    const getUrls = evolutionChainIds.map((names) => getList<Pokemon>(names.map((i) => `${BASE_URL}/pokemon/${i}`)).pipe(
      map((pokemonList) => pokemonList.map(parsePokemonFromApiToPokemonEntity)),
    ))
    return forkJoin(getUrls)
  }

  return {
    getEvolutionListsToPokemonIds,
    fromIdsToPokemonList,
    getEvolutionLists: (limit:number, offset: number) => getEvolutionListsToPokemonIds(
      limit, offset,
    ).pipe(
      mergeMap(fromIdsToPokemonList),
    ),
  }
}
