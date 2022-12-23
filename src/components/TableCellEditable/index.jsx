import { Input, TableCell } from '@mui/material'

const TableCellEditable = ({ row, name, onChange }) => {
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

export default TableCellEditable
