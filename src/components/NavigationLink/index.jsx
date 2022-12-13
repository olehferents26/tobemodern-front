import { Link } from 'react-router-dom'

const NavigationLink = ({ children, ...props }) => {
  return (
    <Link {...props} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  )
}

export default NavigationLink
