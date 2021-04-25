import { Pokemon } from '@domain/entities/pokemon.entity'

export const PokemonCard = ({ pokemon }: {pokemon: Pokemon}): JSX.Element => (
  <div className="w-64 ">
    <div className="border-b border-yellow-500">
      <img className="mx-auto" src={pokemon.sprites.frontDefault} alt={`${pokemon.name}`} />
    </div>
    <div className="p-4">
      <div className="text-2xl">
        {pokemon.name}
      </div>
      <div className="flex flex-row gap-3">
        {Array.from(pokemon.types).map((type) => (<span key={type} className="px-2 py-1 text-sm font-light bg-yellow-500 rounded-lg text-gray-50">{type}</span>))}
      </div>
      <div className="mt-2">
        weight:
        <span className="ml-2 font-medium text-gray-900 ">
          {pokemon.weight}
        </span>
      </div>
      <div className="mt-2">
        height:
        <span className="ml-2 font-medium text-gray-900 ">
          {pokemon.height}
        </span>
      </div>
    </div>
  </div>
)
