import { ChangeEvent, useState } from 'react'

interface HomeFiltersInterface {
  // eslint-disable-next-line no-unused-vars
  handleWeightChange:(name: string) => (e: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  handleHeightChange:(name: string) => (e: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  handleSelect:(value?: string | undefined) => void
  types: Set<string>
}

export const HomeFilters = ({
  handleWeightChange,
  handleHeightChange, handleSelect,
  types,
}: HomeFiltersInterface):JSX.Element => {
  const [show, setShow] = useState(false)
  return (
    <>
      <div style={{ height: show ? undefined : '4rem' }} className="fixed w-full bg-white border-b-4 border-yellow-400 shadow-sm h-96 ">
        <button className="w-32 py-3 mt-1 ml-3 bg-yellow-500 rounded-lg" style={{ display: !show ? undefined : 'none' }} onClick={() => setShow(true)} type="button">Show Filters</button>
        <div style={{ display: show ? undefined : 'none' }} className="flex flex-col justify-around gap-5 mt-2 sm:mx-12 mx-7 ">
          <div>
            <label htmlFor="types">
              <div>
                Pokemon Types
              </div>
              <div>
                <select onChange={(e) => handleSelect(e.target.value)} name="types" id="types">
                  <option value="undefined">All types</option>
                  {Array?.from(types || []).map((t) => <option value={t} key={t}>{t}</option>)}
                </select>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="weight">
              <div>Weight range</div>
              <div className="flex flex-row gap-2 ">
                <div>
                  <input className="w-36 md:w-56" min={0} onChange={handleWeightChange('min')} type="number" placeholder="min" />
                  <span className="block ml-2 text-sm font-light text-gray-600">min</span>
                </div>
                <div>
                  <input className="w-36 md:w-56" min={0} onChange={handleWeightChange('max')} type="number" placeholder="max" />
                  <span className="block ml-2 text-sm font-light text-gray-600">max</span>
                </div>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="height">
              <div>Height range</div>
              <div className="flex flex-row gap-2">
                <div>
                  <input className="w-36 md:w-56" min={0} onChange={handleHeightChange('min')} type="number" placeholder="min" />
                  <span className="block ml-2 text-sm font-light text-gray-600">min</span>
                </div>
                <div>
                  <input className="w-36 md:w-56" min={0} onChange={handleHeightChange('max')} type="number" placeholder="max" />
                  <span className="block ml-2 text-sm font-light text-gray-600">max</span>
                </div>
              </div>
            </label>
          </div>
          <button className="w-32 py-3 mt-1 ml-3 bg-yellow-500 rounded-lg" style={{ display: show ? undefined : 'none' }} onClick={() => setShow(false)} type="button">Close Filters</button>
        </div>
      </div>
      <div style={{ height: show ? undefined : '4rem' }} className="mb-8 h-96 md:h-28" />
    </>
  )
}
