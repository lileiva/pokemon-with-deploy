import { UIEvent, useState } from 'react'
import { Pokemon } from '@domain/entities/pokemon.entity'
import { useObservable } from '@hooks/use-observable'

import { HomeViewModelInterface } from './home.view-model'

interface HomeInterface {
  viewModel : HomeViewModelInterface
}

const PokemonHeroCard = ({ pokemon }: {pokemon: Pokemon}): JSX.Element => (
  <div className="w-64 ">
    <div className="">
      <div className="">
        <img className="mx-auto" src={pokemon.sprites.frontDefault} alt={`${pokemon.name}`} />
      </div>
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
    <div className="flex flex-row mx-auto border border-gray-600 rounded-md justify-items-center ">
      <div className="flex flex-col justify-center w-6 border-r border-gray-600"><button className="h-full" type="button" onClick={decrement}>{'<'}</button></div>
      {pokemonList.map((i, index) => (
        <div key={i.id} className={index === currentIndex ? '' : 'hidden'}>
          <PokemonHeroCard pokemon={i} />
        </div>
))}

      <div className="flex flex-col justify-center w-6 border-l border-gray-600"><button className="h-full" type="button" onClick={increment}>{'>'}</button></div>
    </div>
)
}

export const Home = ({ viewModel }: HomeInterface) => {
  const currentPokemonList = useObservable(viewModel.currentPokemonList$)

  const handleScroll = (e:UIEvent<HTMLDivElement>) => {
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

    </div>
)
 }
