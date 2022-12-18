import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../services/userApi'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './styles'

const Header = () => {
  const [sortBy, setSortBy] = useState('date')
  const { data: user } = useGetCurrentUserQuery()
  const { pathname } = useLocation()

  const handleSortBy = (e) => setSortBy(e.target.value)

  return (
    <Box>
      <AppBar color="secondary" position="sticky">
        <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between', paddingRight: '36px' }}>
          <Box sx={{
            height: '86px',
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: '49px',
          }}>
            <Typography fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
            <Typography fontWeight="500">{user?.role}</Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Знайти проект"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <FormControl variant="standard">
            <InputLabel id="sort-by-label">Сортувати за</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              // label="Сортувати за"
              value={sortBy}
              onChange={handleSortBy}
              sx={{ width: '204px', height: '42px', }}
            >
              <MenuItem value="date">Дата</MenuItem>
              <MenuItem value="priority">Пріоритет</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
