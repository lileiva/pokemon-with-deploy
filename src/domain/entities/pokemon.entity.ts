export interface Pokemon {
  id: string
  name: string
  height: number
  weight: number
  imageUrl: string
  types: Set<string>
}
