/* eslint-disable jsx-a11y/control-has-associated-label */
import { UIEvent, useState } from 'react'
import { Pokemon } from '@domain/entities/pokemon.entity'
import { useObservable } from '@hooks/use-observable'
import { RightArrow } from '@presentation/icons/right-arrow'
import { LeftArrow } from '@presentation/icons/left-arrow'
import { Loading } from '@presentation/icons/animated-loading'
import { HomeViewModelInterface } from './home.view-model'

interface HomeInterface {
  viewModel : HomeViewModelInterface
}

const PokemonHeroCard = ({ pokemon }: {pokemon: Pokemon}): JSX.Element => (
  <div className="w-64 ">
    <div className="border-b border-yellow-500">
      <img className="mx-auto" src={pokemon.sprites.frontDefault} alt={`${pokemon.name}`} />
    </div>
    <div className="p-4">
      <div>
        {pokemon.name}
      </div>
      <div>
        {pokemon.weight}
      </div>
    </div>
  </div>
)

const PokemonEvolutionsCard = ({ pokemonList }:{pokemonList: Pokemon[]}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const increment = () => {
    setCurrentIndex((currentIndex + 1) % pokemonList.length)
  }

  const decrement = () => {
    if (currentIndex === 0) setCurrentIndex(pokemonList.length - 1)
    else {
      setCurrentIndex((currentIndex - 1) % pokemonList.length)
    }
  }

  return (
    <div className="flex flex-col mx-auto border border-yellow-500 rounded-md justify-items-center ">
      {pokemonList.map((i, index) => (
        <div key={i.id} className={index === currentIndex ? 'transition ease-in-out duration-700' : 'hidden'}>
          <PokemonHeroCard pokemon={i} />
        </div>
      ))}
      {pokemonList.length > 1
    ? (
      <div className="flex flex-row justify-center w-full ">
        <button className="flex items-center justify-start w-full h-12 bg-yellow-500 border border-yellow-700 hover:bg-yellow-700" type="button" onClick={decrement}><LeftArrow /></button>
        <button className="flex items-center justify-end w-full h-12 bg-yellow-500 border border-yellow-700 hover:bg-yellow-700" type="button" onClick={increment}><RightArrow /></button>
      </div>
      ) : null}

    </div>
)
}

export const Home = ({ viewModel }: HomeInterface) => {
  const currentPokemonList = useObservable(viewModel.currentPokemonList$)
  const isFetching = useObservable(viewModel.fetching$)

  const handleScroll = (e:UIEvent<HTMLDivElement>) => {
    if (isFetching) return
    const { scrollHeight, scrollTop } = e.currentTarget
    console.log(scrollHeight - scrollTop)
    console.log(e.currentTarget.offsetHeight)
    if (scrollHeight - scrollTop < e.currentTarget.offsetHeight + 20) viewModel.getMore$.next()
  }

  // const handlePokemonInputChange = (value:string) => viewModel.pokemonNameInput$.next(value)

  console.log(currentPokemonList)

  return (
    <div className="h-screen overflow-y-auto" onScroll={handleScroll}>
      <div className="grid grid-flow-row gap-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {currentPokemonList?.map((pokemonList) => (
          <PokemonEvolutionsCard pokemonList={pokemonList} key={pokemonList[0].id} />
        ))}
      </div>
      <div className="h-32 ">

        {isFetching ? <Loading /> : null }
      </div>

    </div>
)
 }
