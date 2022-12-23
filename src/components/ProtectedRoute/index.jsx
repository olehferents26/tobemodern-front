import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const role = localStorage.getItem('role')

  if (!accessToken && !refreshToken && !role) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
