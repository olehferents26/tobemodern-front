import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    accessToken ? navigate('/dashboard/projects') : navigate('/login')
  }, [])

  return (
    <div>
    </div>
  )
}

export default App
