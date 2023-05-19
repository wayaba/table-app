import { SortBy, type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
  showColors: boolean
  users: User[]
}

export function UsersList({
  deleteUser,
  changeSorting,
  showColors,
  users
}: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.CONTRY)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
