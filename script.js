const sideMenu =document.querySelector("aside");
const menuBtn =document.querySelector("#menu-btn");
const closeBtn =document.querySelector("#close-btn");
const themeToggler =document.querySelector(".theme-toggler");
const addProductBtn = document.querySelector("#add-product-btn");
const productModal = document.querySelector("#product-modal");
console.log(addProductBtn);
console.log(productModal);


// Show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('show-menu');
});

// Close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('show-menu');
});


// change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});


// Open Add Product form
addProductBtn.addEventListener('click', () => {
    productModal.style.display = 'flex';
});

// Close Add Product form
document.querySelector("#close-product-modal").addEventListener('click', () => {
    productModal.style.display = 'none';
});


// Add new product to Product List
const addProductForm = document.querySelector("#add-product-form");
const productListBody = document.querySelector("#product-list-body");
// Retrieve previously saved products
let products = JSON.parse(localStorage.getItem("products")) || [];

// Display products in the table
function displayProducts() {
    productListBody.innerHTML = "";

    products.forEach(product => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.number}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td>${product.quantity}</td>
        `;

        productListBody.appendChild(newRow);
    });
}

// Display saved products when the page loads
displayProducts();


addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get values from the form
    const productName = document.querySelector("#product-name").value;
    const productNumber = document.querySelector("#product-number").value;
    const productPrice = document.querySelector("#product-price").value;
    const productQuantity = document.querySelector("#product-quantity").value;
    
    // Create product object
const newProduct = {
    name: productName,
    number: productNumber,
    price: productPrice,
    quantity: productQuantity
};

// Add product to the array
products.push(newProduct);

// Save products in localStorage
localStorage.setItem("products", JSON.stringify(products));

// Refresh the product table
displayProducts();

// Clear and close the form
addProductForm.reset();
productModal.style.display = 'none';
});




// fill orders 
Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.shipping === 'Declined' ? 'danger' : order.shipping === 'Pending' ? 'warning' : 'primary'}">${order.shipping}</td>
        <td class="primary">Details</td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});



// DASHBOARD NAVIGATION

const sidebarLinks = document.querySelectorAll('.sidebar a[data-section]');

const sectionTargets = {
    dashboard: document.querySelector('main'),
    orders: document.querySelector('#orders-section'),
    analytics: document.querySelector('#analytics-section'),
    products: document.querySelector('#products-section')
};

sidebarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const sectionName = link.dataset.section;
        const target = sectionTargets[sectionName];

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            alert('This section is not available yet.');
        }

        sidebarLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');

        sideMenu.classList.remove('show-menu');
    });
});
