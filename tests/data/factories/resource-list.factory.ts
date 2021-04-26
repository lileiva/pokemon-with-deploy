import faker from 'faker'
import { Factory } from 'rosie'
import { ResourceList } from '@data/api/types/resource-list.type'

const ChainFactory = new Factory<ResourceList['results'][0]>()
  .attr('name', faker.name.findName)
  .attr('url', faker.internet.url)

export const ResourceListFactory = new Factory<ResourceList>()
  .attr('count', faker.datatype.number)
  .attr('results', () => ChainFactory.buildList(4))
