import { ApiRepository } from '@data/api.repository'

describe('Test suite for api repository', () => {
  it('title', (done) => {
    const repo = ApiRepository()
    repo.getEvolutionLists(1, 0).subscribe(
      () => {
        expect(repo.getEvolutionLists).toBeCalled()
        done()
      },
    )
  })
})
