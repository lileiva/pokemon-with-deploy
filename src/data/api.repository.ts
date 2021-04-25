import { map, mergeMap } from 'rxjs/operators'
import { get, getList } from './api'
import { Pokemon } from './api/types/pokemon.type'
import { PokemonList } from './api/types/pokemon-list.type'
import { parsePokemonFromApiToPokemonEntity } from './helpers/parse-pokemon-api-to-pokemon-entity'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const ApiRepository = () => ({
  getPokemon: (id:string) => get<Pokemon>(`${BASE_URL}/pokemon/${id}`).pipe(map(parsePokemonFromApiToPokemonEntity)),
  getPokemonList: (limit:number, offset: number) => get<PokemonList>(`${BASE_URL}/pokemon/`, { limit: `${limit}`, offset: `${offset}` }).pipe(
    mergeMap((pokemonList) => getList<Pokemon>(pokemonList.results.map(({ url }) => url))),
    map((pokemonList) => pokemonList.map(parsePokemonFromApiToPokemonEntity)),
  ),
})
