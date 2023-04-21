import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../services/userApi'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './styles'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const { data: user } = useGetCurrentUserQuery()
  return (
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
  )
}

const ProjectsHeader = ({ sortBy, handleSortBy }) => {
  return (
    <>
      <UserInfo />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
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
          value={sortBy}
          onChange={handleSortBy}
          sx={{ width: '204px', height: '42px', }}
        >
          <MenuItem value="date">Дата</MenuItem>
          <MenuItem value="priority">Пріоритет</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

const EmployeeHeader = () => {
  return (
    <>
      <UserInfo />
      <Box>
        <Typography fontWeight="600" fontSize="40px" lineHeight="20px" color="#795EA4">Працівники</Typography>
      </Box>
      <Box></Box>
    </>
  )
}

const SettingsHeader = () => {
  return (
    <>
      <UserInfo />
      <Box>
        <Typography fontWeight="600" fontSize="40px" lineHeight="20px" color="#795EA4">Налаштування</Typography>
      </Box>
      <Box></Box>
    </>
  )
}

const ProjectDetailsHeader = () => {
  return (
    <>
      <UserInfo />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Знайти"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <div></div>
    </>
  )
}

const Header = () => {
  const [sortBy, setSortBy] = useState('date')
  const [content, setContent] = useState(<></>)
  const { pathname } = useLocation()
  const currentProjectId = useSelector(state => state.project.currentProjectId)

  const handleSortBy = (e) => setSortBy(e.target.value)

  useEffect(() => {
    switch (pathname) {
      case '/dashboard/projects':
        setContent(<ProjectsHeader sortBy={sortBy} handleSortBy={handleSortBy} />)
        break
      case '/dashboard/employees':
        setContent(<EmployeeHeader />)
        break;
      case '/dashboard/settings':
        setContent(<SettingsHeader />)
        break;
      case `/dashboard/project/${currentProjectId}`:
        setContent(<ProjectDetailsHeader />)
        break;
      case `/dashboard/project/configuration`:
        setContent(<ProjectDetailsHeader />)
        break;
      default:
        setContent(<></>)
        break
    }
  }, [pathname])

  return (
    <Box>
      <AppBar color="secondary" position="sticky">
        <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between', paddingRight: '36px', height: '86px' }}>
          {content}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
