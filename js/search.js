const searchForm = document.querySelector('#searchForm');
const searchContent = document.querySelector('#searchInput')
searchForm.addEventListener('submit', validateForm);
const resultados = document.querySelector('#results')
const collectionCards = JSON.parse(localStorage.getItem('collection')) || [];
const messages = document.querySelector('#messages')

function validateForm(e) {
  e.preventDefault();
  const name = searchContent.value.trim()
  resultados.innerHTML = '';
  if (name === '') {
    showToast('Por favor, ingresa un nombre de carta.', 'warning');
    return;
  }
  fetch(`https://api.scryfall.com/cards/search?q=${name}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('Error al obtener los datos')
      } 
      return res.json()
    })
    .then(data => {
      
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        totalResults(data)
        data.data.forEach(card => {

          const cardName = card.name;
          const cardImage = card.image_uris.normal
          const cardPrice = card.prices.usd;
          const cardSet = card.set_name;
          // const cardColor = card.color_identity;

          const isInCollection = collectionCards.some(
            (card) => card.name === cardName
          );
          resultados.innerHTML += `
            <div class="col-6 col-md-4 col-xl-3">
              <div class="card border-0 shadow-sm mb-3">
                <img src=${cardImage} class="img-fluid rounded-top"></img>
                <div class="card-body">
                  <h5 class="titles-content">${cardName}</h5>
                  <h6 class="titles-content text-muted">${cardSet}</h6>
                  <h4 class="text-muted">$${cardPrice}</h4>
                  ${
                      isInCollection
                        ? '<h4><span class="badge rounded-pill bg-secondary"><i class="bi bi-check"></i> En colección</span></h4>'
                        : `<button onclick="addCard(this, '${cardName}', '${cardImage}', ${cardPrice}, '${cardSet}')" class="btn btn-lg btn-outline-primary w-100 titles-content"><i class="bi bi-plus-lg"></i> Agregar a colección</button>`
                    }
                </div>
              </div>
            </div>
          `;
        })
      } else {
        console.log('No se encontraron cartas');
      }
    })
    .catch(error => {
      console.log('Hubo un error', error)
    })
}

function addCard(button, nameCard, imageCard, priceCard, cardSet) {

  if (button.disabled) {
    return;
  }

  collectionCards.push({name: nameCard, image: imageCard, price: priceCard, set: cardSet })
  localStorage.setItem('collection', JSON.stringify(collectionCards))

  button.disabled = true;
  button.textContent = "Agregado";
  showToast('Carta agregada a la colección', 'success');
}

function totalResults(data) {
  const totalResultsContainer = document. getElementById('totalResults');
  if(data && data.data && data.data.length > 0) {
    totalResultsContainer.innerHTML = `
      <h4 class="mb-5">Total de coincidencias: ${data.data.length}</h4>
    `
  }
}
