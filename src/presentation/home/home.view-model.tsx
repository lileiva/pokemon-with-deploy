import { Pokemon } from '@domain/entities/pokemon.entity'
import { PokemonUseCaseInterface } from '@domain/use-cases/pokemon.use-case'
import { PokemonTypes } from '@presentation/constants/pokemon.types'
import {
  Observable, ReplaySubject, BehaviorSubject, from, of, combineLatest, interval,
} from 'rxjs'
import {
  mergeMap, map, tap, catchError, filter, share, skip, take,
} from 'rxjs/operators'

interface RangeInterface {
  min?: number
  max?: number
}
export interface HomeViewModelInterface {
  pokemonTypeInput$: BehaviorSubject<string | undefined >
  pokemonHeightInput$: ReplaySubject<RangeInterface>
  pokemonWeightInput$: ReplaySubject<RangeInterface>
  getMore$: BehaviorSubject<void>
  currentPokemonList$: Observable<Pokemon[][]>
  fetching$: Observable<Boolean>
  types$: BehaviorSubject<Set<string>>
}

const NUMBER_OF_VALUES = 20

const isBetween = (value:number, { min, max }:RangeInterface) => {
  if (min && max) {
    return value >= min && value <= max
  }
  if (max) {
    return value <= max
  }
  if (min) {
    return value >= min
  }
  return true
}

export const HomeViewModel = (pokemonUseCase: PokemonUseCaseInterface): HomeViewModelInterface => {
  let requestedTimes = -1
  const fetching$ = new BehaviorSubject<boolean>(true)
  let loadCompleted = false
  const getMore$ = new BehaviorSubject<void>(undefined)
  const pokemonTypeInput$ = new BehaviorSubject<string | undefined>(undefined)
  const pokemonHeightInput$ = new ReplaySubject<RangeInterface>(1)
  const pokemonWeightInput$ = new ReplaySubject<RangeInterface>(1)
  const types$ = new BehaviorSubject<Set<string>>(PokemonTypes)

  let pokemonList:Pokemon[][] = []

  const currentPokemonList$:Observable<Pokemon[][]> = getMore$.pipe(
    tap(() => {
      fetching$.next(true)
    }),
    map(() => {
      requestedTimes += 1
      return requestedTimes
    }),
    mergeMap(() => pokemonUseCase
      .getEvolutionLists(NUMBER_OF_VALUES, NUMBER_OF_VALUES * requestedTimes).pipe(tap(() => {
        fetching$.next(false)
      }), catchError(() => of(undefined)))),
    filter((i) => i !== undefined),
    map((requestedPokemonList) => {
      pokemonList = [...pokemonList, ...requestedPokemonList as Pokemon[][]]
      if (requestedPokemonList?.length !== NUMBER_OF_VALUES) {
        loadCompleted = true
      }
      return pokemonList
    }),
    mergeMap((allPokemonList) => combineLatest([pokemonTypeInput$,
      pokemonHeightInput$, pokemonWeightInput$])
      .pipe(
        map(([type, heightRange, weightRange]) => allPokemonList
          .map((evolutionList) => evolutionList
            .filter(({ height }) => isBetween(height, heightRange))
            .filter(({ weight }) => isBetween(weight, weightRange))
            .filter(({ types }) => types.has(`${type}`) || type === undefined))),
      )),
    map((allPokemonList) => allPokemonList
      .filter((evolutionList) => evolutionList.length > 0) as Pokemon[][]),
  ).pipe(
    share(),
  )

  interval(1000).pipe(skip(1), take(20)).subscribe(
    {
      next: () => {
        getMore$.next()
      },
      complete: () => fetching$.next(false),
    },
  )

  return {
    pokemonTypeInput$,
    pokemonHeightInput$,
    pokemonWeightInput$,
    currentPokemonList$,
    getMore$,
    fetching$: from(fetching$).pipe(map((value) => (loadCompleted ? false : value))),
    types$,
  }
}
