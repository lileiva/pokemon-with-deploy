import { Pokemon } from '@domain/entities/pokemon.entity'
import { PokemonUseCaseInterface } from '@domain/use-cases/pokemon.use-case'
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs'
import { debounceTime, mergeMap, map } from 'rxjs/operators'

export interface HomeViewModelInterface {
  pokemonNameInput$: ReplaySubject<string>
  getMore$: BehaviorSubject<void>
  currentPokemon$: Observable<Pokemon>
  currentPokemonList$: Observable<Pokemon[][]>
}

export const HomeViewModel = (pokemonUseCase: PokemonUseCaseInterface): HomeViewModelInterface => {
  let number = 0
  const pokemonNameInput$ = new ReplaySubject<string>(1)
  const getMore$ = new BehaviorSubject<void>(undefined)
  const currentPokemon$ = pokemonNameInput$.pipe(
    debounceTime(500),
    mergeMap((id) => pokemonUseCase.getPokemon(id)),
  )

  const currentPokemonList$ = getMore$.pipe(
    map(() => {
      number += 20
      return number
    }),
    mergeMap(() => pokemonUseCase.getEvolutionLists(number, 0)),
    )
  return {
    pokemonNameInput$,
    currentPokemon$,
    currentPokemonList$,
    getMore$,
  }
}
