import faker from 'faker'
import { Factory } from 'rosie'
import { EvolutionChain } from '@data/api/types/evolution-chain.type'

const ChainFactory = new Factory<EvolutionChain['chain']>()
  .attr('species', () => ({
    name: faker.name.findName(),
    url: faker.internet.url(),
  }))
  .attr('evolves_to', () => [])

export const EvolutionChainFactory = new Factory<EvolutionChain>()
  .attr('name', faker.name.findName)
  .attr('chain', ChainFactory.build)
