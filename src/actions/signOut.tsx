

const signOut = () => {
  localStorage.removeItem('profile')
  window.location.reload()
}

export default signOut