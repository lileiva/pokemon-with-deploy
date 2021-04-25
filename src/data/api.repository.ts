import { map, mergeMap } from 'rxjs/operators'
import { flatEvolutionChainNames } from '@data/helpers/flat-evalution-chain'
import { forkJoin, of } from 'rxjs'
import { get, getList } from './api'
import { Pokemon } from './api/types/pokemon.type'
import { ResourceList } from './api/types/resource-list.type'
import { EvolutionChain } from './api/types/evolution-chain.type'
import { parsePokemonFromApiToPokemonEntity } from './helpers/parse-pokemon-api-to-pokemon-entity'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const ApiRepository = () => ({
  getPokemon: (id:string) => get<Pokemon>(`${BASE_URL}/pokemon/${id}`).pipe(map(parsePokemonFromApiToPokemonEntity)),
  getPokemonList: (limit:number, offset: number) => get<ResourceList>(`${BASE_URL}/pokemon/`, { limit: `${limit}`, offset: `${offset}` }).pipe(
    mergeMap((pokemonList) => getList<Pokemon>(pokemonList.results.map(({ url }) => url))),
    map((pokemonList) => pokemonList.map(parsePokemonFromApiToPokemonEntity)),
  ),
  getEvolutionLists: (limit:number, offset: number) => get<ResourceList>(`${BASE_URL}/evolution-chain/`, { limit: `${limit}`, offset: `${offset}` }).pipe(
    mergeMap(
      (evolutionChainList) => {
        if (evolutionChainList.results.length === 0) return of([])

        return getList<EvolutionChain>(evolutionChainList.results.map(
          ({ url }) => url,
        ))
      },
    ),
    map((evolutionChain) => evolutionChain.map(flatEvolutionChainNames)),
    mergeMap((evolutionChainUrl) => {
      if (evolutionChainUrl.length === 0) return of([])
      const getUrls = evolutionChainUrl.map((names) => getList<Pokemon>(names.map((i) => `${BASE_URL}/pokemon/${i}`)).pipe(
        map((pokemonList) => pokemonList.map(parsePokemonFromApiToPokemonEntity)),
      ))
      return forkJoin(getUrls)
    }),
  ),
})
