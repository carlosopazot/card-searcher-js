document.addEventListener('DOMContentLoaded', function () {
  const collectionCards = localStorage.getItem('collection');
  const cards = collectionCards ? JSON.parse(collectionCards) : [];

  const cardList = document.getElementById('collection');
  cardList.innerHTML = '';

  function removeCard(index) {
    cards.splice(index, 1);
    localStorage.setItem('collection', JSON.stringify(cards));
    renderCollection(); 
  }

  function renderCollection() {
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-6', 'col-md-3');
      cardElement.innerHTML = `
        <div class="card shadow-sm border-0 result-item mb-4">
          <img src="${card.image}" alt="" class="img-fluid rounded-top">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h4 class="text-muted">${card.name}</h4>
                <h3>$${card.price}</h3>
                <button class="btn btn-outline-secondary w-100" data-index="${index}">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const deleteButton = cardElement.querySelector('button');
      deleteButton.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        removeCard(index);
      });

      cardList.appendChild(cardElement);
    });

    if (cards.length === 0) {
      cardList.innerHTML = `
        <div class="col-12 col-md-6">
          <div class="card shadow-sm border-0 result-item mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-center">
                  <i class="bi bi-inbox-fill icon-alert"></i>
                  <h4 class="text-muted">No hay cartas</h4>
                  <p class="text-muted">Prueba buscando cartas y agregándolas a tu colección</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  renderCollection();
});
