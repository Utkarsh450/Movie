import { useEffect, useState } from "react"

const useDebounce = (query: string, delay: number) => {

  const [debouncedValue, setDebouncedValue] = useState<string>(query)

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(query)
    }, delay)

    return () => {
      clearTimeout(timer)
    }

  }, [query, delay])

  return debouncedValue;
}

export default useDebounce