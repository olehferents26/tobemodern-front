import { useEffect, useState } from 'react'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../services/userApi.js'
import Table from '../Table/index.jsx'

const columns = [
  {
    key: 'firstName',
    value: `Ім'я`,
    isEditable: true,
  },
  {
    key: 'lastName',
    value: 'Прізвище',
    isEditable: true,
  },
  {
    key: 'email',
    value: 'Емейл',
    isEditable: true,
  },
  {
    key: 'password',
    value: 'Пароль',
    isEditable: true,
  },
  {
    key: 'createdAt',
    value: 'Дата створення',
    isEditable: false,
  },
]

const EmployeesTable = () => {
  const [rows, setRows] = useState([])

  const { data } = useGetUsersQuery()
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  useEffect(() => {
    if (data) {
      setRows(data.map(obj => ({ ...obj, password: '', })))
    }
  }, [data])

  return (
    <Table
      columns={columns}
      data={rows}
      onUpdate={updateUser}
      onDelete={deleteUser}
    />
  )
}

export default EmployeesTable
