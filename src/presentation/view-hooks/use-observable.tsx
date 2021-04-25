import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(observable: Observable<T>): T {
  const [state, setState] = useState<T>()

  useEffect(() => {
    const subscription = observable.subscribe(setState)
    return () => {
      try {
        return subscription.unsubscribe()
      } catch {
        return undefined
      }
    }
  }, [observable])

  return state as T
}
