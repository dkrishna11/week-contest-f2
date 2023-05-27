let value=[];
let stocksContainer = document.getElementsByClassName("Stock-Container")[0];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(data => {
  value = data;
  addToFetchData(data);
})
.catch(error => {
  console.error('Error:', error);
});


async function fetchData() {
  try {
    const result = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await result.json();
    value=data;
    addToFetchData(data);
  } catch (error) {
    console.log("Some Error", error);
  }
}

fetchData();


function addToFetchData(data){
    for (let i = 0; i < data.length; i++) {
        let stock = data[i];
        const perctage=stock[i].price_change_percentage_24h >=0? "post": "negt";
        let innerStock = `
          <td><img src="${stock.image}" alt="${stock.name}"></td>
          <td>${stock.name}</td>
          <td>${stock.symbol}</td>
          <td>$${stock.current_price}</td>
          <td class="${perctage}>${stock.price_change_percentage_24h}%</td>
          <td>MKT Cap: $${stock.total_volume}</td>
        `;
        let stockRow = document.createElement("tr");
        stockRow.className = "stock";
        stockRow.innerHTML = innerStock;
        stocksContainer.appendChild(stockRow);
      }
}

// sort data

document.getElementById('serach-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-inp');
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredData = data.filter(item => {
      const itemName = item.name.toLowerCase();
      const itemSymbol = item.symbol.toLowerCase();
      return itemName.includes(searchTerm) || itemSymbol.includes(searchTerm);
    });
  
    addToFetchData(filteredData);
  });


document.getElementById('mktCap').addEventListener('click', () => {
    value.sort((a, b) => b.total_volume - a.total_volume);
    addToFetchData(value);
    });

 document.getElementById('Perc').addEventListener('click', () => {
        value.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        addToFetchData(value);
      });

     


