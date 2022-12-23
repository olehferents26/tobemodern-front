import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    accessToken ? navigate('/dashboard/projects') : navigate('/login')
  }, [])

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <div>
    </div>
  )
}

export default App
