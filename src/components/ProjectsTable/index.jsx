import { useGetProjectsQuery } from '../../services/projectApi.js'
import Table from '../Table/index.jsx'

const columns = [
  {
    key: 'name',
    value: 'Назва',
    isEditable: false,
  },
  {
    key: 'customerName',
    value: 'Клієнт',
    isEditable: false,
  },
  {
    key: 'status',
    value: 'Статус',
    isEditable: true,
    isDropdown: true,
    dropdownOptions: [
      'Новий',
      'В процесі',
      'Готовий',
      'Відхилений',
    ]
  },
  {
    key: 'priority',
    value: 'Пріоритет',
    isEditable: true,
    isDropdown: true,
    dropdownOptions: [
      'Низький',
      'Середній',
      'Високий',
      'Терміновий',
    ]
  },
  // {
  //   key: 'expectedTime',
  //   value: 'Очікуваний час',
  //   isEditable: false,
  // },
  // {
  //   key: 'actualTime',
  //   value: 'Реальний час',
  //   isEditable: false,
  // },
]

const ProjectsTable = () => {
  const { data } = useGetProjectsQuery()
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
