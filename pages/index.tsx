import Head from 'next/head'
import { Home as HomeView } from '@presentation/home/home.view'

import { ApiRepository } from '@data/api.repository'
import { PokemonUseCase } from '@domain/use-cases/pokemon.use-case'
import { HomeViewModel } from '@presentation/home/home.view-model'

const apiRepository = ApiRepository()
const pokemonUseCase = PokemonUseCase(apiRepository)
const homeViewModel = HomeViewModel(pokemonUseCase)

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView viewModel={homeViewModel} />

    </div>
  )
}
