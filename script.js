const currencies = [
    {
      name: 'Bitcoin',
      color: '#FF6384',
      history: [],
      amount: 0 // Agregar la propiedad amount e inicializarla con 0
    },
    {
      name: 'Ethereum',
      color: '#36A2EB',
      history: [],
      amount: 0 // Agregar la propiedad amount e inicializarla con 0
    },
    {
      name: 'nasdaq',
      color: '#FFCE56',
      history: [],
      amount: 0 // Agregar la propiedad amount e inicializarla con 0
    }
  ];
  
  
  const chartData = {
    labels: [],
    datasets: []
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Fecha'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Precio'
        }
      }
    }
  };
  
  const chart = new Chart(document.getElementById('chart').getContext('2d'), {
    type: 'line',
    data: chartData,
    options: chartOptions
  });
  
  const bitcoinCheckbox = document.getElementById('bitcoinCheckbox');
  const ethereumCheckbox = document.getElementById('ethereumCheckbox');
  const nasdaqCheckbox = document.getElementById('nasdaqCheckbox');
  
  bitcoinCheckbox.addEventListener('change', updateChart);
  ethereumCheckbox.addEventListener('change', updateChart);
  nasdaqCheckbox.addEventListener('change', updateChart);
  
  function getRandomPrice(crypto) {
    if (crypto.history.length > 0) {
      return crypto.history[crypto.history.length - 1].price;
    } else {
      return (Math.random() * (10000 - 1) + 1).toFixed(2);
    }
  }
  
  function getRandomCrypto() {
    currencies.forEach(crypto => {
      let currentDate = new Date();
      let formattedDate = currentDate.toLocaleString();
  
      let previousPrice = crypto.history.length > 0 ? crypto.history[crypto.history.length - 1].price : parseFloat(getRandomPrice(crypto));
  
      // Definir un rango de cambio de precio
      let priceChange = Math.random() * 2000 - 10; // Puede ajustar el rango según sea necesario
  
      // Aplicar un factor de tendencia para simular cambios en la dirección del precio
      let trendFactor = Math.random();
  
      // Definir una probabilidad para que el precio cambie de dirección
      let changeDirectionProbability = 0.68; // Puede ajustar la probabilidad según sea necesario
  
      // Cambiar la dirección del precio en función de la probabilidad y el factor de tendencia
      if (trendFactor > changeDirectionProbability) {
        priceChange = -priceChange;
      }
  
      let newPrice = parseFloat((previousPrice + priceChange).toFixed(2));
  
      crypto.history.push({
        date: formattedDate,
        price: newPrice
      });
    });
  
    updateChart();
    setTimeout(getRandomCrypto, 5000
        );
  }
  
  
  function updateChart() {
    chartData.labels = [];
    chartData.datasets = [];
  
    if (bitcoinCheckbox.checked) {
      const bitcoinData = {
        label: 'Bitcoin',
        data: currencies[0].history.map(data => data.price),
        fill: false,
        borderColor: currencies[0].color,
        tension: 0.1
      };
  
      chartData.datasets.push(bitcoinData);
      chartData.labels = currencies[0].history.map(data => data.date);
    }
  
    if (ethereumCheckbox.checked) {
      const ethereumData = {
        label: 'Ethereum',
        data: currencies[1].history.map(data => data.price),
        fill: false,
        borderColor: currencies[1].color,
        tension: 0.1
      };
  
      chartData.datasets.push(ethereumData);
  
      if (chartData.labels.length === 0) {
        chartData.labels = currencies[1].history.map(data => data.date);
      }
    }
  
    if (nasdaqCheckbox.checked) {
      const nasdaqData = {
        label: 'nasdaq',
        data: currencies[2].history.map(data => data.price),
        fill: false,
        borderColor: currencies[2].color,
        tension: 0.1
      };
  
      chartData.datasets.push(nasdaqData);
  
      if (chartData.labels.length === 0) {
        chartData.labels = currencies[2].history.map(data => data.date);
      }
    }
  
    chart.update();
  }
  
  getRandomCrypto();
  
 // Crear objeto de usuario
 const user = {
    name: 'Nombre del Usuario',
    balance: 100000 
  };
  
  // Definir la estrategia de negociación
  function tradingStrategy(crypto) {
    const history = crypto.history;
  
    // Obtener el precio más reciente y el precio anterior
    const currentPrice = history[history.length - 1].price;
    const previousPrice = history[history.length - 2].price;
  
    // Resto de la estrategia de negociación...
    if (currentPrice > previousPrice) {
        // Realizar la venta de una parte de la cantidad de criptomoneda que se posee
        const sellAmount = crypto.amount * 0.2; // Por ejemplo, vender el 20% de la cantidad actual
        const sellEarnings = currentPrice * sellAmount;
      
        if (sellAmount <= crypto.amount) {
          user.balance += sellEarnings;
          crypto.amount -= sellAmount;
          console.log(`Venta exitosa: ${sellAmount} ${crypto.name} por ${sellEarnings}`);
          // Agrega aquí la lógica para realizar la venta en el mercado simulado
        } else {
          console.log(`No tienes suficiente ${crypto.name} para vender`);
        }
      } else {
        // El precio actual es igual o menor que el precio anterior, no se realiza ninguna venta
        console.log(`No se realiza venta de ${crypto.name}`);
      }
  
    return {
      currentPrice,
      previousPrice
    };
  }
  
  // Función para ejecutar las acciones de compra y venta
  function executeTrading() {
    currencies.forEach(crypto => {
      const { currentPrice, previousPrice } = tradingStrategy(crypto);
  
  
      // Ejemplo de compra simulada
      const buyAmount = 1; // Cantidad de criptomoneda a comprar
      const buyCost = currentPrice * buyAmount;
  
      if (user.balance >= buyCost) {
        user.balance -= buyCost;
        crypto.amount += buyAmount;
        console.log(`Compra exitosa: ${buyAmount} ${crypto.name} por ${buyCost}`);
        // Agrega aquí la lógica para realizar la compra en el mercado simulado
      } else {
        console.log(`Saldo insuficiente para comprar ${buyAmount} ${crypto.name}`);
      }
  
      // Ejemplo de venta simulada
      const sellAmount = 0.5; // Cantidad de criptomoneda a vender
      const sellEarnings = currentPrice * sellAmount;
  
      if (sellAmount <= crypto.amount) {
        user.balance += sellEarnings;
        crypto.amount -= sellAmount;
        console.log(`Venta exitosa: ${sellAmount} ${crypto.name} por ${sellEarnings}`);
        // Agrega aquí la lógica para realizar la venta en el mercado simulado
      } else {
        console.log(`No tienes suficiente ${crypto.name} para vender`);
      }
    });
    updateBalance()
    setTimeout(executeTrading, 5000); // Establece el intervalo de tiempo entre cada ejecución de la estrategia de negociación
  }
  
  const startBotButton = document.getElementById('startBotButton');
  
  startBotButton.addEventListener('click', function() {
    executeTrading();
  });
  
  const balanceElement = document.getElementById('balance');
  
  function updateBalance() {
    balanceElement.textContent = `Dinero del Usuario: ${user.balance.toFixed(2)} USD`;
  }
  
  function calculateVariation(currentPrice, previousPrice) {
    const variation = ((currentPrice - previousPrice) / previousPrice) * 100;
    return variation.toFixed(2);
  }
  
  function displayVariations() {
    currencies.forEach(crypto => {
      const { currentPrice, previousPrice } = tradingStrategy(crypto);
      const variation = calculateVariation(currentPrice, previousPrice);
      const cryptoElement = document.createElement('div');
      cryptoElement.textContent = `Variación de ${crypto.name}: ${variation}%`;
      document.getElementById('variations-container').appendChild(cryptoElement);
    });
  }
  
  
  updateBalance();
  displayVariations();