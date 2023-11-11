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

  // const alertMessage = (type,message) => {
  //   const wrapper = document.createElement('div')
  //   wrapper.innerHTML = `
  //   <div class="alert alert-${type} alert-dismissible border-0 shadow-sm" role="alert">
  //     <h5 class="mb-0">${message}</h5>
  //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  //   </div>`
  //   loginForm.appendChild(wrapper)
  // }

  if(usernameInput === user.username && passwordInput === user.password) {
    console.log('Inicio sesión')
    showToast('Inicio de sesión exitoso', 'success');
    // alertMessage('success', 'Inicio de sesión exitoso')
    localStorage.setItem('username', usernameInput);
    window.location.assign('pages/search.html')
  } else if(usernameInput.trim() === '') {
    showToast('Debes ingresar un nombre', 'danger',)
    console.log('Debes ingresar un nombre')
  } else if(passwordInput.trim() === '') {
    console.log('Debes ingresar una contraseña')
    showToast('Debes ingresar una contraseña', 'danger')
  } else {
    console.log('El usuario o la contraseña son incorrectos')
    showToast('El usuario o la contraseña son incorrectos', 'danger')
  }
}
