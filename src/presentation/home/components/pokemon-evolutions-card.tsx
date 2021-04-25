/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react'
import { Pokemon } from '@domain/entities/pokemon.entity'
import { RightArrow } from '@presentation/icons/right-arrow'
import { LeftArrow } from '@presentation/icons/left-arrow'
import { PokemonCard } from './pokemon-card'

export const PokemonEvolutionsCard = ({ pokemonList }:{pokemonList: Pokemon[]}): JSX.Element => {
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
          <PokemonCard pokemon={i} />
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
