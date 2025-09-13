        // Sample products data
        const products = [
            {
                id: 1,
                name: "Elegant Poetry",
                description: "Beautiful handwritten poetry on premium paper",
                price: 45.00,
                image: "🖋️"
            },
            {
                id: 2,
                name: "Wedding Vows",
                description: "Custom wedding vows in ornate calligraphy",
                price: 85.00,
                image: "💕"
            },
            {
                id: 3,
                name: "Inspirational Quote",
                description: "Motivational quotes in modern calligraphy style",
                price: 35.00,
                image: "✨"
            },
            {
                id: 4,
                name: "Name Art",
                description: "Personalized name designs in decorative lettering",
                price: 55.00,
                image: "🎨"
            },
            {
                id: 5,
                name: "Bible Verse",
                description: "Sacred texts beautifully hand-lettered",
                price: 65.00,
                image: "📜"
            },
            {
                id: 6,
                name: "Love Letters",
                description: "Romantic messages in classical calligraphy",
                price: 75.00,
                image: "💌"
            }
        ];

        // Cart functionality
        let cart = [];

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
            
            const badge = document.getElementById('cartBadge');
            if (totalItems > 0) {
                badge.style.display = 'flex';
                badge.textContent = totalItems;
            } else {
                badge.style.display = 'none';
            }
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            updateCartCount();
            updateCartDisplay();
            
            // Show feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = '#27ae60';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 1000);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartCount();
                    updateCartDisplay();
                }
            }
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }

            const itemsHtml = cart.map(item => `
                <div class="cart-item">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="qty-btn" onclick="removeFromCart(${item.id})" style="background: #e74c3c; margin-left: 10px;">×</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartItems.innerHTML = itemsHtml;
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }

        function loadProducts() {
            const productsGrid = document.getElementById('productsGrid');
            
            const productsHtml = products.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');

            productsGrid.innerHTML = productsHtml;
        }

        // Modal functionality
        document.getElementById('cartBtn').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'block';
            updateCartDisplay();
        });

        document.getElementById('closeCart').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'none';
        });

        document.getElementById('cartModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('cartModal')) {
                document.getElementById('cartModal').style.display = 'none';
            }
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nWe'll contact you soon to arrange payment and delivery details.`);
            
            // Clear cart
            cart = [];
            updateCartCount();
            updateCartDisplay();
            document.getElementById('cartModal').style.display = 'none';
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadProducts();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 24, 16, 0.98)';
            } else {
                header.style.background = 'rgba(44, 24, 16, 0.95)';
            }
        });


// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    // Hide previous messages
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(this);
        
        const response = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
            formSuccess.style.display = 'block';
            this.reset();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        formError.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
        formError.style.display = 'block';
    } finally {
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
});