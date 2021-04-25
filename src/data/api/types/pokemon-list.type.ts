type Result = {
  name: string
  url: string
}

export type PokemonList = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}
