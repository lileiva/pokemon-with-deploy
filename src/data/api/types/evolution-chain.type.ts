/* eslint-disable camelcase */
interface Chain {
  species: {
    name: string
    url: string
  }
  evolves_to?: Chain[]
}

export interface EvolutionChain {
  name: string
  chain: Chain
}
