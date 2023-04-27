import React, { useState, useEffect } from 'react'
import { useGetProjectsQuery } from '../../services/projectApi.js'
import Table from '../Table/index.jsx'
import {
  Box,
  Typography,
}
  from '@mui/material'

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
  }
]

const ProjectsTable = () => {
  const { data } = useGetProjectsQuery();
  const [projectsTodo, setProjectsTodo] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [projectsDeclined, setProjectsDeclined] = useState([]);

  useEffect(() => {
    if (data) {
      setProjectsTodo(data.TODO);
      setProjectsInProgress(data.IN_PROGRESS);
      setProjectsDone(data.DONE);
      setProjectsDeclined(data.DECLINED);
    }
  }, [data]);

  return (
    <>
      {projectsTodo &&
        <Box >
          <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>В процессі</Typography>
          <Table
            columns={columns}
            data={projectsTodo}
            onUpdate={() => { }}
            onDelete={() => { }}
          />
        </Box>
      }

      {projectsInProgress &&
        <Box mt='30px'>
          <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Готові</Typography>
          <Table
            columns={columns}
            data={projectsInProgress}
            onUpdate={() => { }}
            onDelete={() => { }}
          />
        </Box>
      }

      {projectsDone &&
        <Box mt='30px'>
          <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>Відхилені</Typography>
          <Table
            columns={columns}
            data={projectsDone}
            onUpdate={() => { }}
            onDelete={() => { }}
          />
        </Box>
      }

      {projectsDeclined &&
        <Box mt='30px'>
          <Typography mb='10px' fontSize={26} fontWeight={600} color='#464646'>В процессі</Typography>
          <Table
            columns={columns}
            data={projectsDeclined}
            onUpdate={() => { }}
            onDelete={() => { }}
          />
        </Box>
      }
    </>
  )
};

export default ProjectsTable;
