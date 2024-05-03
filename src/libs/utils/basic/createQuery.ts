import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchQuery = () => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (...prams: { name: string, value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString())
      prams.forEach(({ name, value }) => {
        params.set(name, value)
      })

      return params.toString()
    },
    [searchParams]
  )

  const routeWithQuery = useCallback(
    (...prams: { name: string, value: string }[]) => {
      router.push(`${pathname}?${createQueryString(...prams)}`)
    },
    [router, pathname, createQueryString]
  )

  return { routeWithQuery, createQueryString, searchParams }
}