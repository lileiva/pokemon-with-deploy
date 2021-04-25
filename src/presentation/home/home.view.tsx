import { Pokemon } from '@domain/entities/pokemon.entity'
import { useObservable } from '@hooks/use-observable'
import { HomeViewModelInterface } from './home.view-model'

interface HomeInterface {
  viewModel : HomeViewModelInterface
}

const PokemonHeroCard = ({ pokemon }: {pokemon: Pokemon}): JSX.Element => (
  <div className="mx-auto border border-gray-600 rounded-md w-72">
    <div>
      {pokemon.name}
    </div>
    <div>
      <img src={pokemon.sprites.frontDefault} alt={`${pokemon.name}`} />
    </div>
    <div>
      {pokemon.weight}
    </div>
    <div>
      {pokemon.abilities.map((ability) => <div key={ability.name}>{ability.name}</div>)}
    </div>
  </div>
)

export const Home = ({ viewModel }: HomeInterface) => {
  const currentPokemon = useObservable(viewModel.currentPokemon$)
  const currentPokemonList = useObservable(viewModel.currentPokemonList$)

  // const handlePokemonInputChange = (value:string) => viewModel.pokemonNameInput$.next(value)

  console.log(currentPokemon)

  return (
    <div className="">
      <div className="grid grid-flow-row gap-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
        {currentPokemonList?.map((pokemon) => (
          <PokemonHeroCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>

    </div>
)
 }
