import { Fragment, useEffect, useState } from 'react'
import {
  Table as MuiTable,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  useTheme,
  Box,
}
  from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useIsAdmin } from '../../hooks/useIsAdmin.js'
import ConfirmIcon from '../../icons/ConfirmIcon.jsx'
import DeleteIcon from '../../icons/DeleteIcon.jsx'
import EditIcon from '../../icons/EditIcon.jsx'
import RevertIcon from '../../icons/RevertIcon.jsx'
import DialogConfirmCancel from '../DialogConfirmCancel/index.jsx'
import TableCellEditable from '../TableCellEditable'

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
  const theme = useTheme()

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

const Table = ({ columns, data, onUpdate, onDelete }) => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [previous, setPrevious] = useState({})

  const [currentRowId, setCurrentRowId] = useState(null)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  const isAdmin = useIsAdmin()

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const showEditButton = columns.filter(c => c.isEditable === true).length > 0 && isAdmin
  const showDeleteButton = isAdmin

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }
    const value = e.target.value
    const name = e.target.name
    console.log(e.target)
    console.log(value, name);
    const { id } = row
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
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
    setPrevious({})
  }

  console.log(rows)

  const onSubmit = id => {
    onToggleEditMode(id)
    let updatedUser = rows.find(r => r.id === id)
    const { createdAt, isEditMode, ...rest } = updatedUser
    onUpdate(rest)
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

  const onDeleteIcon = id => {
    setCurrentRowId(id)
    openRemoveDialog()
  }

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const openRemoveDialog = () => setIsRemoveDialogOpen(true)

  const closeRemoveDialog = () => setIsRemoveDialogOpen(false)

  const onRemove = () => {
    const newRows = rows.filter(row => row.id !== currentRowId)
    setRows(newRows)

    onDelete(currentRowId)

    closeRemoveDialog()
  }

  useEffect(() => {
    if (data) {
      setRows(data.map(obj => ({ ...obj, isEditMode: false, })))
    }
  }, [data])

  return (
    <MuiTable size="small">
      <TableHead>
        <TableRow>
          {columns.map(({ key, value }) => {
            return <TableCell key={key} align="left">{value}</TableCell>
          })}
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
                {columns.map(({ key, isEditable, isDropdown, dropdownOptions }) => {
                  return (
                    <Fragment key={`${key}-${row.id}`}>
                      {isEditable ? (
                        <TableCellEditable {...{ row, name: key, onChange, isDropdown, dropdownOptions }} />
                      ) : <TableCell>{row[key]}</TableCell>}
                    </Fragment>
                  )
                })}
                {showEditButton ? (
                  <TableCell>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="done"
                          onClick={() => onSubmit(row.id)}
                        >
                          <ConfirmIcon/>
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
                ) : (
                  <TableCell></TableCell>
                )}
                {showDeleteButton ? (
                  <TableCell>
                    <IconButton aria-label="remove" onClick={() => onDeleteIcon(row.id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
              </TableRow>
              <DialogConfirmCancel
                isOpen={isRemoveDialogOpen}
                onClose={closeRemoveDialog}
                onCancel={closeRemoveDialog}
                onSubmit={onRemove}
                titleText="Ви впевнені, що хочете видалити цього працівника?"
              />
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
    </MuiTable>
  )
}

export default Table
