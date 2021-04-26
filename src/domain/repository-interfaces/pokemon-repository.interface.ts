import { Pokemon } from '@domain/entities/pokemon.entity'
import { Observable } from 'rxjs'

// eslint-disable-next-line no-unused-vars
type getEvolutionLists = (limit:number, offset:number) => Observable<Pokemon[][]>

export interface PokemonRepositoryInterface {
  getEvolutionLists: getEvolutionLists
}
