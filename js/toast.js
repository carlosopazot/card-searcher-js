function showToast(message, toastType) {
  const toastContainer = document.getElementById('messages');
  const toastElement = document.createElement('div');
  toastElement.className = `toast border-0 mb-2 bg-${toastType} text-white`;
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
  toastElement.setAttribute('aria-atomic', 'true');
  toastElement.innerHTML = `
    <div class="d-flex align-items-start">
      <div class="toast-body">
        <h5 class="mb-0">${message}</h5>
      </div>
      <button type="button" class="btn-close btn-close-white p-3" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toastContainer.appendChild(toastElement);

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}