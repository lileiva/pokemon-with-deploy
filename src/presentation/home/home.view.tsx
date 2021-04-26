import {
  UIEvent, useState, ChangeEvent, useEffect,
} from 'react'
import { useObservable } from '@hooks/use-observable'
import { Loading } from '@presentation/icons/animated-loading'
import { HomeViewModelInterface } from './home.view-model'
import { HomeFilters } from './components/home-filters.component'
import { PokemonEvolutionsCard } from './components/pokemon-evolutions-card'

interface HomeInterface {
  viewModel : HomeViewModelInterface
}

const parseStringToNumber = (value : string) => {
  if (value === '') return undefined
  return Number(value)
}

export const Home = ({ viewModel }: HomeInterface) => {
  const [weight, setWeight] = useState({ min: undefined, max: undefined })
  const [height, setHeight] = useState({ min: undefined, max: undefined })
  const currentPokemonList = useObservable(viewModel.currentPokemonList$)
  const types = useObservable(viewModel.types$)
  const isFetching = useObservable(viewModel.fetching$)

  const handleScroll = (e:UIEvent<HTMLDivElement>) => {
    if (isFetching) return
    const { scrollHeight, scrollTop } = e.currentTarget
    if (scrollHeight - scrollTop < e.currentTarget.offsetHeight + 20) viewModel.getMore$.next()
  }

  const handleSelect = (value?: string) => {
    if (value === 'undefined') {
      viewModel.pokemonTypeInput$.next(undefined)
      return
    }
    viewModel.pokemonTypeInput$.next(value)
  }

  const handleChange = (type: string) => (name:string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'weight') {
      setWeight((prev) => ({ ...prev, [name]: parseStringToNumber(e.target.value) }))
    } else {
      setHeight((prev) => ({ ...prev, [name]: parseStringToNumber(e.target.value) }))
    }
  }

  useEffect(() => {
    viewModel.pokemonWeightInput$.next(weight)
  }, [weight])

  useEffect(() => {
    viewModel.pokemonHeightInput$.next(height)
  }, [height])

  const handleWeightChange = handleChange('weight')
  const handleHeightChange = handleChange('height')

  return (
    <>
      <div className="h-screen overflow-y-auto " onScroll={handleScroll}>
        <HomeFilters
          types={types}
          handleSelect={handleSelect}
          handleHeightChange={handleHeightChange}
          handleWeightChange={handleWeightChange}
        />
        <div className="grid grid-flow-row gap-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {currentPokemonList?.map((pokemonList) => (
            <PokemonEvolutionsCard pokemonList={pokemonList} key={pokemonList[0].id} />
          ))}
        </div>
        <div className="h-32 ">
          {isFetching ? <Loading /> : null }
        </div>
      </div>
    </>
  )
}
