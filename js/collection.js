document.addEventListener('DOMContentLoaded', function () {
  const collectionCards = localStorage.getItem('collection');
  const cards = collectionCards ? JSON.parse(collectionCards) : [];

  const cardList = document.getElementById('collection');
  const totalCardsElement = document.getElementById('total-cards');
  
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
      cardElement.setAttribute('class', 'col-6 col-md-4 col-xl-3');
      cardElement.innerHTML = `
        <div class="card shadow-sm border-0 result-item mb-4">
          <img src="${card.image}" alt=${card.name} class="img-fluid rounded-top">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
              <h5 class="titles-content">${card.name}</h5>
              <h6 class="titles-content text-muted">${card.set}</h6>
              <h4 class="text-muted">$${card.price}</h4>
                <button class="btn btn-lg btn-outline-secondary w-100" data-index="${index}"> Eliminar</button>
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
        <div class="col-12 col-md-8">
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
    const totalPrice = cards.reduce((total, card) => total + card.price, 0);
    totalCardsElement.innerHTML = `
      <div class="col-md-4 col-6">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center">
            <h5 class="text-muted" id="total-cards">Total cartas</h5>
            <h3 class="mb-0">${cards.length}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-6">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center">
            <h5 class="text-muted" id="total-cards">Precio total</h5>
            <h3 class="mb-0">$${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    `;
  }
  renderCollection();
});
