// Sample product data
const products = [
    {
        id: 1,
        title: "Premium Wireless Headphones",
        description: "High-quality sound with noise cancellation technology",
        price: 199.99,
        category: "electronics",
        icon: "🎧"
    },
    {
        id: 2,
        title: "Designer Leather Jacket",
        description: "Genuine leather jacket with modern cut and style",
        price: 299.99,
        category: "clothing",
        icon: "🧥"
    },
    {
        id: 3,
        title: "Smart Fitness Watch",
        description: "Track your health and fitness with advanced sensors",
        price: 249.99,
        category: "electronics",
        icon: "⌚"
    },
    {
        id: 4,
        title: "Luxury Handbag",
        description: "Elegant handbag crafted from premium materials",
        price: 179.99,
        category: "accessories",
        icon: "👜"
    },
    {
        id: 5,
        title: "Cotton Casual Shirt",
        description: "Comfortable cotton shirt perfect for everyday wear",
        price: 49.99,
        category: "clothing",
        icon: "👔"
    },
    {
        id: 6,
        title: "Wireless Bluetooth Speaker",
        description: "Portable speaker with crystal clear sound quality",
        price: 89.99,
        category: "electronics",
        icon: "🔊"
    },
    {
        id: 7,
        title: "Designer Sunglasses",
        description: "UV protection with stylish frame design",
        price: 129.99,
        category: "accessories",
        icon: "🕶️"
    },
    {
        id: 8,
        title: "Denim Jeans",
        description: "Classic fit denim jeans made from premium cotton",
        price: 79.99,
        category: "clothing",
        icon: "👖"
    },
    {
        id: 9,
        title: "Smartphone Case",
        description: "Protective case with wireless charging compatibility",
        price: 29.99,
        category: "accessories",
        icon: "📱"
    }
];

// Shopping cart state
let cart = [];
let currentCategory = 'all';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.querySelector('.search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderProducts();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        renderProducts();
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Render products based on current filter and search
function renderProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No products found matching your criteria.</div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add animation to product cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
