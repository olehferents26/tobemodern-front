export const useIsAdmin = () => {
  return localStorage.getItem('role') === 'ADMIN'
}
