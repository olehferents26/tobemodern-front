import { Input, MenuItem, Select, TableCell } from '@mui/material'

const TableCellEditable = ({ row, name, onChange, isDropdown, dropdownOptions }) => {
  const { isEditMode } = row

  if (isDropdown && isEditMode && dropdownOptions) {
    const option = dropdownOptions.find(option => option === row[name]);
    return (
      <TableCell>
        <Select name={name} value={option} onChange={e => onChange(e, row)}>
          {dropdownOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  }

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
