import { Pokemon } from '@domain/entities/pokemon.entity'
import { PokemonUseCaseInterface } from '@domain/use-cases/pokemon.use-case'
import {
 Observable, ReplaySubject, BehaviorSubject, from, of,
} from 'rxjs'
import {
 debounceTime, mergeMap, map, tap, catchError, filter,
} from 'rxjs/operators'

export interface HomeViewModelInterface {
  pokemonNameInput$: ReplaySubject<string>
  getMore$: BehaviorSubject<void>
  currentPokemon$: Observable<Pokemon>
  currentPokemonList$: Observable<Pokemon[][]>
  fetching$: Observable<Boolean>
}

export const HomeViewModel = (pokemonUseCase: PokemonUseCaseInterface): HomeViewModelInterface => {
  let number = 0
  const fetching$ = new BehaviorSubject<boolean>(true)
  const pokemonNameInput$ = new ReplaySubject<string>(1)
  const getMore$ = new BehaviorSubject<void>(undefined)

  const currentPokemon$ = pokemonNameInput$.pipe(
    debounceTime(500),
    mergeMap((id) => pokemonUseCase.getPokemon(id).pipe(catchError(() => of(undefined)))),
    filter((i) => i !== undefined),
    map((pokemon) => pokemon as Pokemon),
  )

  const currentPokemonList$ = getMore$.pipe(
    tap(() => {
      fetching$.next(true)
    }),
    map(() => {
      number += 20
      return number
    }),
    mergeMap(() => pokemonUseCase
    .getEvolutionLists(number, 0).pipe(catchError(() => of(undefined)))),
    tap(() => {
      fetching$.next(false)
    }),
    filter((i) => i !== undefined),
    map((pokemonList) => pokemonList as Pokemon[][]),
    )

  return {
    pokemonNameInput$,
    currentPokemon$,
    currentPokemonList$,
    getMore$,
    fetching$: from(fetching$),
  }
}
