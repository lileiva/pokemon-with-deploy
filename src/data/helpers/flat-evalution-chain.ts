import { EvolutionChain } from '@data/api/types/evolution-chain.type'

const flatChain = (chain: EvolutionChain['chain']):EvolutionChain['chain'][] => {
  if (!chain.evolves_to) return [chain]
  const flatEvolves = chain.evolves_to.map((i) => flatChain(i)).flat()
  return [chain, flatEvolves].flat()
}

export const flatEvolutionChainNames = (evolutionChain: EvolutionChain): string[] => {
  const chain = flatChain(evolutionChain.chain)
  return chain.map((i) => i.species.name)
}
