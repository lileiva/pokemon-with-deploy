import faker from 'faker'
import { Factory } from 'rosie'
import { Pokemon } from '@data/api/types/pokemon.type'

const TypeFactory = new Factory<Pokemon['types'][0]>()
  .attr('slot', faker.datatype.number)
  .attr('type', () => ({
    name: faker.name.findName(),
    url: faker.internet.url(),
  }))

export const PokemonFactory = new Factory<Pokemon>()
  .attr('name', faker.name.findName)
  .attr('height', faker.datatype.number)
  .attr('weight', faker.datatype.number)
  .attr('sprites', () => ({ frontDefault: faker.internet.url() }))
  .attr('types', () => TypeFactory.buildList(4))
