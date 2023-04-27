import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../services/userApi'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, SearchMobile, StyledInputBase } from './styles'
import { useSelector } from 'react-redux'
import BurgerMenu from '../BurgerMenu/BurgerMenu'



const UserInfo = () => {
  const { data: user } = useGetCurrentUserQuery();
  const isDesktop = useMediaQuery('(min-width:1100px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1100px)');
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      {isMobile &&
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '100%',
            paddingLeft: '20px'
          }}>
            <BurgerMenu />
          </Box>

          <Box sx={{
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingRight: '20px',
          }}>
            <Typography textAlign='right' fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
            <Typography textAlign='right' fontWeight="500">{user?.role}</Typography>
          </Box>
        </Box>
      }
      {isTablet &&
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '20px',
        }}>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '100%'
          }}>
            <BurgerMenu />
          </Box>

          <Box sx={{
            height: '86px',
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: '20px',
          }}>
            <Typography fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
            <Typography fontWeight="500">{user?.role}</Typography>
          </Box>
        </Box>
      }

      {isDesktop &&
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '49px',
        }}>
          <Box sx={{
            height: '86px',
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: '20px',
          }}>
            <Typography fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
            <Typography fontWeight="500">{user?.role}</Typography>
          </Box>
        </Box>
      }

    </>
  )
}

const ProjectsHeader = ({ sortBy, handleSortBy }) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      {isMobile &&
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <UserInfo />
          <Box ml='20px' mr='20px' mt='10px' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchMobile>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Знайти проект"
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchMobile>
            <FormControl variant="standard">
              <InputLabel id="sort-by-label">Сортувати за</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                value={sortBy}
                onChange={handleSortBy}
                sx={{ width: '100px' }}
              >
                <MenuItem value="date">Дата</MenuItem>
                <MenuItem value="priority">Пріоритет</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      }

      {!isMobile &&
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
      }
    </>
  )
}

const EmployeeHeader = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      {isMobile &&
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <UserInfo />
          <Box>
            <Typography textAlign='center' fontWeight="600" fontSize="28px" color="#795EA4">Працівники</Typography>
          </Box>
        </Box>
      }
      {!isMobile &&
        <>
          <UserInfo />
          <Box>
            <Typography fontWeight="600" fontSize="40px" lineHeight="20px" color="#795EA4">Працівники</Typography>
          </Box>
          <Box></Box>
        </>
      }
    </>
  )
}

const SettingsHeader = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      {isMobile &&
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <UserInfo />
          <Box>
            <Typography textAlign='center' fontWeight="600" fontSize="28px" color="#795EA4">Налаштування</Typography>
          </Box>
        </Box>
      }
      {!isMobile &&
        <>
          <UserInfo />
          <Box>
            <Typography fontWeight="600" fontSize="40px" lineHeight="20px" color="#795EA4">Налаштування</Typography>
          </Box>
          <Box></Box>
        </>
      }
    </>
  )
}

const ProjectDetailsHeader = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      {isMobile &&
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <UserInfo />
          <SearchMobile>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Знайти"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchMobile>
          <div></div>
        </Box>
      }
      {!isMobile &&
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
      }
    </>
  )
}

const Header = () => {
  const [sortBy, setSortBy] = useState('date')
  const [content, setContent] = useState(<></>)
  const { pathname } = useLocation()
  const currentProjectId = useSelector(state => state.project.currentProjectId)
  const isMobile = useMediaQuery('(max-width:768px)');

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
    <>
      {isMobile &&
        <Box>
          <AppBar color="secondary" position="sticky">
            <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between', /* paddingRight: '36px', */ height: '136px' }}>
              {content}
            </Toolbar>
          </AppBar>
        </Box>
      }

      {!isMobile &&
        <Box>
          <AppBar color="secondary" position="sticky">
            <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between', paddingRight: '36px', height: '86px' }}>
              {content}
            </Toolbar>
          </AppBar>
        </Box>
      }
    </>

  )
}

export default Header
