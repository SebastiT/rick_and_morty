const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /\d/

const validation = (userData) => {
  const errors = {}
  if (!userData.email || !userData.email.length > 50 || !regexEmail.test(userData.email)) {
    errors.email = "Email incorrecto"
  }
  if (!regexPassword.test(userData.password) || userData.password.length > 10 || userData.password.length < 6) {
    errors.password = "Password incorrecto"
  }
  return errors;
}

export default validation;