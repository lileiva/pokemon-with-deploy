/* eslint-disable camelcase */
interface Chain {
  species: {
    name: string
    url: string
  }
  evolves_to?:[Chain]
}

export interface EvolutionChain {
  id: string
  name: string
  chain: Chain
}
