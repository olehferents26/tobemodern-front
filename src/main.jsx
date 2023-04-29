import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import EmployeesPage from './pages/dashboard/EmployeesPage.jsx'
import ProjectsPage from './pages/dashboard/ProjectsPage.jsx'
import SettingsPage from './pages/dashboard/SettingsPage.jsx'
import store from './redux/store'
import ProjectDetailsPage from './pages/dashboard/ProjectDetailsPage'
import ConfigurationDetailPage from './pages/dashboard/ConfigurationDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/forgot-password/:token',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>,
    children: [
      {
        path: '/dashboard/projects',
        element: <ProjectsPage />
      },
      {
        path: '/dashboard/project/:id',
        element: <ProjectDetailsPage />
      },
      {
        path: '/dashboard/project/configuration',
        element: <ConfigurationDetailPage />
      },
      {
        path: '/dashboard/employees',
        element: <EmployeesPage />,
      },
      {
        path: '/dashboard/settings',
        element: <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      },
    ]
  },
])

const theme = createTheme({
  palette: {
    primary: {
      main: '#8865C2',
      light: '#F4EDFF',
    },
    secondary: {
      main: '#FEFDFF',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto',
    allVariants: {
      color: '#000019',
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
)
