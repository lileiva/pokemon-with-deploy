import { Pokemon } from '@domain/entities/pokemon.entity'
import { Observable } from 'rxjs'

// eslint-disable-next-line no-unused-vars
type getPokemonType = (T:string) => Observable<Pokemon>

// eslint-disable-next-line no-unused-vars
type getPokemonListType = (limit:number, offset:number) => Observable<Pokemon[]>

// eslint-disable-next-line no-unused-vars
type getEvolutionLists = (limit:number, offset:number) => Observable<Pokemon[][]>

export interface PokemonRepositoryInterface {
  getPokemon : getPokemonType
  getPokemonList: getPokemonListType
  getEvolutionLists: getEvolutionLists
}
