


// Define the function to filter the makeup products based on the search term
function filterMakeupProducts(searchInput, makeupProducts) {
    return makeupProducts.filter(product => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchInput.toLowerCase());
    });
    }
    
    // Define the function to display the makeup products on the webpage
    function displayMakeupProducts(filteredProducts) {
    resultsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');


    const productBrand = document.createElement('h2');
productBrand.textContent = product.brand;
productCard.appendChild(productBrand);

const productName = document.createElement('h3');
productName.textContent = product.name;
productCard.appendChild(productName);

const productPrice = document.createElement('p');
productPrice.textContent = `Price: ${product.price}`;
productCard.appendChild(productPrice);

const productImage = document.createElement('img');
productImage.src = product.image_link;
productCard.appendChild(productImage);

const productLink = document.createElement('a');
productLink.href = product.product_link;
productLink.textContent = 'Buy Now';
productCard.appendChild(productLink);

const productDescription = document.createElement('p');
productDescription.textContent = product.description;
productCard.appendChild(productDescription);

resultsContainer.appendChild(productCard);

});
}

// Define an asynchronous function to fetch the makeup products data from an API
async function getMakeupProducts() {
try {
const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
const data = await response.json();
return data;
} catch (error) {
console.error(error);
return [];
}
}

// Create the HTML structure for the search input and results container
const html = `

<div class="container">
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10">
      <h1 class="text-center mt-5">Enter the Makeup Kit and Brand Name</h1>
      <h5 class="text-center mb-4">Please wait a few seconds!</h5>
      <div class="form-group">
        <label for="search-input">Enter Product Name:</label>
        <input type="text" class="form-control" id="search-input" placeholder="Example- lipstick"/>
        <button id="search-btn" class="btn btn-sucess mb-5">Search</button>
      </div>
      
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10">
      <div id="results-container"></div>
    </div>
  </div>
</div>
`;
// Set the HTML structure to the body of the webpage
document.body.innerHTML = html;

// Get the references to the search input, search button, and results container
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');

// Add an event listener to the search input to display the filtered makeup products as the user types
searchInput.addEventListener('input', async () => {
const searchValue = searchInput.value;
const makeupProducts = await getMakeupProducts();
const filteredProducts = filterMakeupProducts(searchValue, makeupProducts);
displayMakeupProducts(filteredProducts);
});

// Add an event listener to the search button to display the filtered makeup products when the user clicks the button
searchBtn.addEventListener('click', async () => {
const searchValue = searchInput.value;
const makeupProducts = await getMakeupProducts();
const filteredProducts = filterMakeupProducts(searchValue, makeupProducts);
displayMakeupProducts(filteredProducts);
});

