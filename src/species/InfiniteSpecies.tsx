import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from 'react-query'

import { Species } from './Species'

const initialUrl = 'https://swapi.dev/api/species/'

const fetchUrl = async (url: string) => {
  const response = await fetch(url)
  return response.json()
}

interface Species {
  name: string
  language: string
  averageLifespan: number
}

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } =
    useInfiniteQuery(
      'sw-species',
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: lastPage => lastPage.next || undefined,
      }
    )

  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

  if (isError) {
    return <div>Error!!...</div>
  }

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map(pageData => {
          return pageData.results.map((specie: Species) => {
            return (
              <Species
                key={specie.name}
                name={specie.name}
                language={specie.language}
                averageLifespan={specie.averageLifespan}
              />
            )
          })
        })}
      </InfiniteScroll>
    </>
  )
}