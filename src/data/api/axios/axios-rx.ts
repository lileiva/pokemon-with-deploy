import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { API } from '@data/api/axios/axios.setup'

type ParamsType = {
  [index: string] : string
}

export const get = <T>(url:string, params?:ParamsType) => from(API.get(url, {
  params,
})).pipe(map((response) => response.data as T))

export const getList = <T>(urls:string[]): Observable<T[]> => {
  const getMany = async (): Promise<T[]> => Promise.all(urls
    .map(async (url) => (await API.get<T>(url)).data))

  return from(getMany())
}
