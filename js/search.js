const cards = [
  {
    name: 'Mana Vault',
    price: 34.99,
    image: 'https://www.paytowin.cl/cdn/shop/products/4887d331-b7e0-5c8f-9075-3dddae6c9198_800x.jpg?v=1663900710',
  },
  {
    name: 'Mana Crypt',
    price: 34.99,
    image: 'https://www.oasisgames.cl/cdn/shop/products/c433fcb1-0122-53f9-9e40-716a81872d42.jpg?v=1636158254',
  },
  {
    name: 'Mana Drain',
    price: 34.99,
    image: 'https://www.paytowin.cl/cdn/shop/products/53d098d0-a58c-5f64-a035-0c0081da37fb_800x.jpg?v=1663891633',
  },
  {
    name: 'Counterspell',
    price: 34.99,
    image: 'https://www.paytowin.cl/cdn/shop/products/611e5a1c-13f9-5a8e-b7ab-c42d4444bbf2_37ec8a8a-24d0-4f21-8d5e-63bdcb8aca8a_800x.jpg?v=1663889022',
  },
]

let searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', validateForm);
const collectionCards = JSON.parse(localStorage.getItem('collection')) || [];

function validateForm(e){

  e.preventDefault();

  let searchContent = document.getElementById('searchInput').value
  const resultadoContainer = document.getElementById('results')
  resultadoContainer.innerHTML = ``
  
  if (searchContent.trim() === '') {
    resultadoContainer.innerHTML = `
      <div class="col-12 col-md-8">
        <div class="alert alert-warning alert-dismissible border-0 shadow-sm" role="alert">
          <h5 class="mb-0">Debes ingresar un nombre</h5>
        </div>
      </div>
    `
    return
  }

  const results = cards.filter(card => card.name.toLowerCase().includes(searchContent))

  if (results.length > 0) {
    results.map(result => {
      const isInCollection = collectionCards.some(
        (card) => card.name === result.name
      );
      resultadoContainer.innerHTML += `
        <div class="col-6 col-md-3">
          <div class="card shadow-sm border-0 result-item mb-4">
            <img src="${result.image}" alt="" class="img-fluid rounded-top">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="text-muted">${result.name}</h4>
                  <h3>$${result.price}</h3>
                  ${
                    isInCollection
                      ? '<h5><span class="badge rounded-pill bg-secondary"><i class="bi bi-check"></i> En colección</span></h5>'
                      : `<button onclick="addCard(this, '${result.name}', '${result.image}', ${result.price})" class="btn btn-outline-primary w-100">Agregar</button>`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }
  )} else {
    resultadoContainer.innerHTML = `
    <div class="col-12 col-md-8">
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body text-center">
        <i class="bi bi-question-circle-fill icon-alert"></i>
          <h4 class="text-muted">No encontramos la carta que buscas</h4>
        </div>
      </div>
    </div>
    `
  }
}

function addCard(button, nameCard, imageCard, priceCard) {

  if (button.disabled) {
    return;
  }

  collectionCards.push({name: nameCard, image: imageCard, price: priceCard })
  localStorage.setItem('collection', JSON.stringify(collectionCards))

  button.disabled = true;
  button.textContent = "Agregado";
}
