import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme
} from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import DoneIcon from '@mui/icons-material/DoneAllTwoTone'
import RevertIcon from '@mui/icons-material/NotInterestedOutlined'
import { Fragment, useEffect, useState } from 'react'
import DeleteIcon from '../../icons/DeleteIcon.jsx'
import EditIcon from '../../icons/EditIcon.jsx'
import { useGetUsersQuery } from '../../services/userApi.js'
import Button from '../Button/index.jsx'
// import Table from '../Table/index.jsx'

const CustomTableCell = ({ row, name, onChange }) => {
  const { isEditMode } = row
  return (
    <TableCell align="left">
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  )
}

function TablePaginationActions (props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event,
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
      </IconButton>
    </Box>
  )
}

// const columns = [
//   {
//     key: 'firstName',
//     value: `Ім'я`,
//     isEditable: true,
//   },
//   {
//     key: 'lastName',
//     value: 'Прізвище',
//     isEditable: true,
//   },
//   {
//     key: 'email',
//     value: 'Емейл',
//     isEditable: true,
//   },
//   {
//     key: 'password',
//     value: 'Пароль',
//     isEditable: true,
//   },
//   {
//     key: 'createdAt',
//     value: 'Дата створення',
//     isEditable: false,
//   },
// ]

const EmployeesTable = () => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [previous, setPrevious] = useState({})

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [currentRowId, setCurrentRowId] = useState(null)

  const { data } = useGetUsersQuery()

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onToggleEditMode = id => {
    setRows(prevState => {
      return prevState.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
    //TODO maybe could be removed
    setPrevious({})
  }

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row
      }
      return row
    })
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })
    onToggleEditMode(id)
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }
    const value = e.target.value
    const name = e.target.name
    const { id } = row
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
  }

  const openRemoveDialog = () => setIsRemoveDialogOpen(true)

  const closeRemoveDialog = () => setIsRemoveDialogOpen(false)

  const onRemove = () => {
    const newRows = rows.filter(row => row.id !== currentRowId)
    setRows(newRows)

    closeRemoveDialog()
  }

  const onDeleteIcon = id => {
    setCurrentRowId(id)
    openRemoveDialog()
  }

  useEffect(() => {
    if (data) {
      setRows(data.map(obj => ({ ...obj, password: '', isEditMode: false, })))
    }
  }, [data])

  // return (
  //   <Table
  //     columns={columns}
  //     rows={rows}
  //     rowsPerPage={rowsPerPage}
  //     page={page}
  //   />
  // )

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Ім'я</TableCell>
          <TableCell align="left">Прізвище</TableCell>
          <TableCell align="left">Емейл</TableCell>
          <TableCell align="left">Новий пароль</TableCell>
          <TableCell align="left">Дата створення</TableCell>
          <TableCell align="left"/>
          <TableCell align="left"/>
        </TableRow>
      </TableHead>
      <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
        ).map(row => {
          return (
            <Fragment key={row.id}>
              <TableRow>
                <CustomTableCell {...{ row, name: 'firstName', onChange }} />
                <CustomTableCell {...{ row, name: 'lastName', onChange }} />
                <CustomTableCell {...{ row, name: 'email', onChange }} />
                <CustomTableCell {...{ row, name: 'password', onChange }} />
                <TableCell>
                  {row.createdAt}
                </TableCell>
                <TableCell>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon/>
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon/>
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon/>
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="remove" onClick={() => onDeleteIcon(row.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
              <Dialog
                open={isRemoveDialogOpen}
                onClose={closeRemoveDialog}
                slotProps={{
                  backdrop: {
                    sx: {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }
                  }
                }}
              >
                <DialogContent>
                  <DialogContentText>
                    Ви впевнені, що хочете видалити цього працівника?
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button onClick={closeRemoveDialog}>Скасувати</Button>
                  <Button onClick={onRemove} autoFocus>
                    Підтвердити
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          )
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6}/>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default EmployeesTable
