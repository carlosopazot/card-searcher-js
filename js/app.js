document.addEventListener('DOMContentLoaded', function () {
  const username = localStorage.getItem('username')
  const usernameText = document.getElementById('username')
  usernameText.textContent = username
})
