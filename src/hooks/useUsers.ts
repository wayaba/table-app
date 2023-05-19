import { fetchUsers } from '../services/users'
import { useInfiniteQuery } from '@tanstack/react-query'
import { User } from '../types'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number; users: User[] }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    )
  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? []
  return {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
