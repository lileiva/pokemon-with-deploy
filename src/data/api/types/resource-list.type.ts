type Result = {
  name: string
  url: string
}

export type ResourceList = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}
