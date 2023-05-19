export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=ppedraza&page=${pageParam}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Error en la petición')
      return response.json()
    })
    .then((res) => {
      const currentCursor = Number(res.info.page)
      const nextCursor = currentCursor > 3 ? undefined : currentCursor + 1
      return {
        users: res.results,
        nextCursor
      }
    })
}
