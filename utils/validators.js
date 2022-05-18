export const isValidEmail = (email) => {
  const pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  return pattern.test(email)
}
