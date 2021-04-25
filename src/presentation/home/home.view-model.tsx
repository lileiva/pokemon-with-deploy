import { Pokemon } from '@domain/entities/pokemon.entity'
import { PokemonUseCaseInterface } from '@domain/use-cases/pokemon.use-case'
import { Observable, ReplaySubject } from 'rxjs'
import { debounceTime, mergeMap } from 'rxjs/operators'

export interface HomeViewModelInterface {
  pokemonNameInput$: ReplaySubject<string>
  currentPokemon$: Observable<Pokemon>
  currentPokemonList$: Observable<Pokemon[]>
}

export const HomeViewModel = (pokemonUseCase: PokemonUseCaseInterface): HomeViewModelInterface => {
  const pokemonNameInput$ = new ReplaySubject<string>(1)
  const currentPokemon$ = pokemonNameInput$.pipe(
    debounceTime(500),
    mergeMap((id) => pokemonUseCase.getPokemon(id)),
  )

  const currentPokemonList$ = pokemonUseCase.getPokemonList(10, 0)
  return {
    pokemonNameInput$,
    currentPokemon$,
    currentPokemonList$,
  }
}
