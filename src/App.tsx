import { useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import Results from './components/Results'

function App() {
  // const {
  //   isLoading,
  //   isError,
  //   data: users = []
  // } = useQuery<User[]>(['users'], async () => await fetchUsers(1))

  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers()

  //const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  //const [loading, setLoading] = useState(false)
  //const [error, setError] = useState(false)

  //const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleOrder = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.CONTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDeleteUser = (email: string) => {
    //const deletedList = users.filter((user) => user.email !== email)
    //setUsers(deletedList)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const restoreUsers = () => {
    void refetch()
    //setUsers(originalUsers.current)
  }

  /*
  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchUsers(currentPage)
      .then((users) => {
        setUsers((prevUsers) => {
          const newUsers = [...prevUsers, ...users] //prevUsers.concat(data.results)
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch((e) => {
        console.log(e)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [currentPage])
*/

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filterCountry.toLocaleLowerCase())
        )
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.CONTRY)
      return [...filteredUsers].sort((userA, userB) =>
        userA.location.country.localeCompare(userB.location.country)
      )

    if (sorting === SortBy.NAME)
      return [...filteredUsers].sort((userA, userB) =>
        userA.name.first.localeCompare(userB.name.first)
      )
    if (sorting === SortBy.LAST)
      return [...filteredUsers].sort((userA, userB) =>
        userA.name.last.localeCompare(userB.name.last)
      )
    return filteredUsers
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>Colorear</button>
        <button onClick={toggleOrder}>Ordenar por país</button>
        <button onClick={restoreUsers}>Recuperar usuarios</button>
        <input
          placeholder="Filtra por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDeleteUser}
            changeSorting={handleChangeSort}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        {!isLoading && isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && (
          <p>No hay resultados</p>
        )}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={() => fetchNextPage()}>Cargar más resultados</button>
        )}
      </main>
    </div>
  )
}

export default App
