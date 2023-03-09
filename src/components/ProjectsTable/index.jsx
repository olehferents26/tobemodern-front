import { useState } from 'react'
import { useGetProjectsQuery } from '../../services/projectApi.js'
import Table from '../Table/index.jsx'

const columns = [
  {
    key: 'name',
    value: 'Назва',
    isEditable: false,
  },
  {
    key: 'status',
    value: 'Статус',
    isEditable: false,
  },
  {
    key: 'priority',
    value: 'Пріоритет',
    isEditable: false,
  },
  {
    key: 'expectedTime',
    value: 'Очікуваний час',
    isEditable: false,
  },
  {
    key: 'actualTime',
    value: 'Реальний час',
    isEditable: false,
  },
]

const ProjectsTable = () => {
  const { data } = useGetProjectsQuery();

  return (
    <Table
      columns={columns}
      data={data}
      onUpdate={() => {}}
      onDelete={() => {}}
    />
  )
}

export default ProjectsTable
