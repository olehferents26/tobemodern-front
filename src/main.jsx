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
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import store from './redux/store'

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
    element: <DashboardPage />,
    children: [
      {
        path: '/dashboard/projects',
        element: <p>projects</p>
      },
      {
        path: '/dashboard/employee',
        element: <p>employee</p>
      },
      {
        path: '/dashboard/settings',
        element: <p>settings</p>
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
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
