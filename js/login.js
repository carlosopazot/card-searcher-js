const user = {
  username: 'admin',
  password: '1234'
}

let loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', validateLogin)

function validateLogin(e) {
  e.preventDefault();
  let usernameInput = document.getElementById('user').value
  let passwordInput = document.getElementById('password').value

  if(usernameInput === user.username && passwordInput === user.password) {
    showToast('Inicio de sesión exitoso', 'success');
    localStorage.setItem('username', usernameInput);
    window.location.assign('pages/search.html')
  } else if(usernameInput.trim() === '') {
    showToast('Debes ingresar un nombre', 'danger',)
  } else if(passwordInput.trim() === '') {
    showToast('Debes ingresar una contraseña', 'danger')
  } else {
    showToast('El usuario o la contraseña son incorrectos', 'danger')
  }
}
