const cartas = [
  {
    nombre: 'Mana Vault',
    precio: 34.99,
  },
  {
    nombre: 'Mana Crypt',
    precio: 64.99,
  },
  {
    nombre: 'Mana Burn',
    precio: 24.99,
  },
  {
    nombre: 'Counterspell',
    precio: 5.99,
  },
  {
    nombre: 'Atraxa',
    precio: 14.99,
  },
]

function buscarCarta () {
  while(true) {
    let busqueda = prompt('Ingresa el nombre de la carta')
    if (busqueda === null) {
      break
    }
    busqueda = busqueda.trim()

    if (busqueda === '') {
      alert('Campo vacío');
      continue
    }

    const filtrarCartas = cartas.filter(carta => carta.nombre.toLowerCase().includes(busqueda.toLowerCase()))

    if(filtrarCartas.length > 0) {
      const resultado = filtrarCartas.map(carta => `Nombre: ${carta.nombre} \nPrecio: $${carta.precio.toFixed(2)} \n------- \n`).join('\n');
      alert('Resultados encontrados: \n' + resultado)
    } else {
      alert('Ningun resultado encontrado para ' + busqueda)
    }

    let buscarOtra = confirm('¿Quieres buscar otra carta?')
    
    if(!buscarOtra) {
      break
    }
  }
}

buscarCarta()