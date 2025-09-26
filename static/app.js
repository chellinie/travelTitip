document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let currentPage = 'page-buyer-dashboard';
    let pageHistory = ['page-buyer-dashboard'];
    const allPages = ['page-buyer-dashboard', 'page-ai-results', 'page-seller-homepage', 'page-product-details', 'page-my-account', 'page-my-orders', 'page-my-messages', 'page-my-notifications', 'page-shopping-cart'];

    function navigateTo(pageId, context = null) {
        if (currentPage === pageId) return;

        // Render content before showing the page
        renderPageContent(pageId, context);
        
        allPages.forEach(id => document.getElementById(id).classList.toggle('hidden', id !== pageId));
        
        if (pageId !== pageHistory[pageHistory.length - 1]) {
            pageHistory.push(pageId);
        }
        
        currentPage = pageId;
        renderHeader();
        window.scrollTo(0, 0);
    }
    
    function goBack() {
        if (pageHistory.length > 1) {
            pageHistory.pop();
            const previousPageId = pageHistory[pageHistory.length - 1];
            currentPage = previousPageId;
            allPages.forEach(id => document.getElementById(id).classList.toggle('hidden', id !== previousPageId));
            renderHeader();
            window.scrollTo(0, 0);
        }
    }
    
    // --- DYNAMIC RENDERING ---
    const ICONS = {
        back: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`,
        cart: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        notifications: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`,
        messages: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`,
        account: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        verified: `<svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm4.456 4.344a.75.75 0 00-1.06-1.06L7.5 9.19l-1.22-1.22a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.5-3.5z" clip-rule="evenodd"></path></svg>`,
        star: `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`,
        location: `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>`,
        plane: `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>`,
        calendar: `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
    };
    
    function renderHeader() {
        const header = document.getElementById('app-header');
        const cartItemCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
        
        const mainHeaderIcons = `
            <div class="flex items-center space-x-2 sm:space-x-4 text-gray-600">
                <button class="nav-btn relative" data-page="page-shopping-cart">${ICONS.cart}
                   ${cartItemCount > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">${cartItemCount}</span>` : ''}
                </button>
                <button class="nav-btn" data-page="page-my-notifications">${ICONS.notifications}</button>
                <button class="nav-btn" data-page="page-my-messages">${ICONS.messages}</button>
                <button class="nav-btn" data-page="page-my-account">${ICONS.account}</button>
            </div>`;

        let title = 'TravelTitip';
        let leftButton = `<h1 class="font-lora text-2xl font-bold text-gray-800">${title}</h1>`;
        let rightContent = mainHeaderIcons;
        
        const simplePages = {
            'page-my-account': 'My Account', 'page-my-orders': 'My Orders',
            'page-my-messages': 'Messages', 'page-my-notifications': 'Notifications',
            'page-shopping-cart': 'Shopping Cart', 'page-seller-homepage': '&nbsp;',
            'page-product-details': '&nbsp;'
        };

        if (simplePages[currentPage]) {
            title = simplePages[currentPage];
            leftButton = `<div class="flex items-center space-x-4">
                <button id="back-button">${ICONS.back}</button>
                <h1 class="font-lora text-xl font-bold text-gray-800">${title}</h1>
            </div>`;
            rightContent = currentPage === 'page-product-details' || currentPage === 'page-seller-homepage' ? mainHeaderIcons : '';
        }

        header.innerHTML = `<div class="flex justify-between items-center">${leftButton}${rightContent}</div>`;
    }

    function renderPageContent(pageId, context) {
         const pageElement = document.getElementById(pageId);
         if (!pageElement) return;

         switch (pageId) {
            case 'page-buyer-dashboard':
                const sellerGrid = pageElement.querySelector('#seller-grid-dashboard');
                const seeMoreContainer = pageElement.querySelector('#see-more-container');

                // Clean up previous "See More" button if it exists
                if (seeMoreContainer) {
                    seeMoreContainer.remove();
                }

                // Initially render only the first 4 sellers
                sellerGrid.innerHTML = sellers.slice(0, 4).map(renderSellerDashboardCard).join('');

                // If there are more than 4 sellers, add a "See More" button
                if (sellers.length > 4) {
                    const seeMoreButtonHTML = `<div id="see-more-container" class="mt-4 text-center"><button id="see-more-sellers" class="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">See More</button></div>`;
                    sellerGrid.insertAdjacentHTML('afterend', seeMoreButtonHTML);
                }

                // Render Recommendation Section
                const recommendedProducts = getRecommendedProducts();
                const recommendationSectionHTML = `
                    <div class="mt-8">
                        <h3 class="font-lora text-xl font-bold text-gray-800 mb-4">Recommended For You</h3>
                        <div id="recommendation-grid" class="grid grid-cols-2 gap-4">${recommendedProducts.map(renderProductCard).join('')}</div>
                    </div>`;
                pageElement.insertAdjacentHTML('beforeend', recommendationSectionHTML);
                break;
            case 'page-seller-homepage':
                 if (context && context.sellerId) {
                    const seller = sellers.find(s => s.id === context.sellerId);
                    if (seller) pageElement.innerHTML = renderSellerProfile(seller);
                }
                break;
            case 'page-product-details':
                if (context && context.productId && context.sellerId) {
                    const seller = sellers.find(s => s.id === context.sellerId);
                    const product = seller.products.find(p => p.id === context.productId);
                    if (product) pageElement.innerHTML = renderProductDetails(product, seller);
                }
                break;
            case 'page-my-account': pageElement.innerHTML = renderMyAccount(currentUser); break;
            case 'page-my-orders': pageElement.innerHTML = renderMyOrders(orders); break;
            case 'page-my-messages': pageElement.innerHTML = renderMessages(messages); break;
            case 'page-my-notifications': pageElement.innerHTML = renderNotifications(notifications); break;
            case 'page-shopping-cart': pageElement.innerHTML = renderShoppingCart(shoppingCart); break;
         }
    }
    
    // ... (keep renderSellerDashboardCard and renderSellerResultCard)
     function renderSellerDashboardCard(seller) {
        return `<div class="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer seller-card" data-seller-id="${seller.id}">
            <div class="flex items-start space-x-3">
                <img src="${seller.profilePicUrl}" alt="${seller.name}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1">
                    <div class="flex items-center space-x-1"><h4 class="font-bold text-gray-800 truncate">${seller.name}</h4>${seller.isVerified ? ICONS.verified : ''}</div>
                    <div class="flex items-center text-xs text-yellow-500 space-x-1">${ICONS.star}<span>${seller.rating}/5</span></div>
                    <div class="flex items-center text-xs text-gray-500 mt-1 space-x-1">${ICONS.location}<span class="truncate">${seller.location}</span></div><hr class="my-1">
                    <div class="flex items-center text-xs text-gray-500 space-x-1">${ICONS.plane}<span>${seller.travelDestination}</span></div>
                    <div class="flex items-center text-xs text-gray-500 space-x-1 mt-1">${ICONS.calendar}<span>${seller.travelDates}</span></div>
                </div></div></div>`;
    }

    function renderSellerResultCard(seller) {
        return `<div class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer seller-card" data-seller-id="${seller.id}">
            <div class="flex items-center space-x-4">
                <img src="${seller.profilePicUrl}" alt="${seller.name}" class="w-20 h-20 rounded-lg object-cover">
                <div class="flex-1">
                    <div class="flex items-center justify-between"><div class="flex items-center space-x-2"><h4 class="font-bold text-lg text-gray-800">${seller.name}</h4>${seller.isVerified ? ICONS.verified : ''}</div><div class="flex items-center text-sm text-yellow-500 font-semibold space-x-1">${ICONS.star}<span>${seller.rating}/5</span></div></div>
                    <div class="flex items-center text-sm text-gray-500 mt-2 space-x-2"><div class="flex items-center space-x-1">${ICONS.location}<span class="truncate">${seller.location}</span></div></div>
                    <div class="flex items-center text-sm text-gray-500 mt-2 space-x-8"><div class="flex items-center space-x-1">${ICONS.plane}<span>${seller.travelDestination}</span></div><div class="flex items-center space-x-1">${ICONS.calendar}<span>${seller.travelDates}</span></div></div>
                </div></div></div>`;
    }
    
    // --- NEW RENDER FUNCTIONS ---
    function renderProductCard(product) {
        // Note: product object here needs to have sellerId
        return `
            <div class="bg-white rounded-xl shadow-md overflow-hidden product-card cursor-pointer" data-product-id="${product.id}" data-seller-id="${product.sellerId}">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-32 object-cover">
                <div class="p-3">
                    <h5 class="text-sm font-semibold text-gray-800 truncate">${product.name}</h5>
                    <p class="text-xs font-bold text-gray-700 mt-2">Rp${product.price.toLocaleString('id-ID')}</p>
                </div>
            </div>`;
    }

    function renderSellerProfile(seller) { /* ... implementation from previous step ... */ }
    function renderProductDetails(product, seller) { /* ... implementation needed ... */ }
    function renderMyAccount(user) { /* ... implementation needed ... */ }
    function renderMyOrders(orderList) { /* ... implementation needed ... */ }
    function renderMessages(messageList) { /* ... implementation needed ... */ }
    function renderNotifications(notificationList) { /* ... implementation needed ... */ }
    function renderShoppingCart(cart) { /* ... implementation needed ... */ }


    // --- AI & SEARCH LOGIC --- (Keep as is)
    async function handleSearch(prompt) {
        if (!prompt) return;

        // Navigate to results page and show loading state
        navigateTo('page-ai-results');
        const resultsContainer = document.getElementById('ai-results-container');
        const searchInputResults = document.getElementById('search-input-results');
        
        // Update the search bar on the results page with the current query
        searchInputResults.value = prompt;

        resultsContainer.innerHTML = '<div class="text-center py-10 text-gray-500">Searching for travelers...</div>';

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();
            const explanationHTML = result.explanation 
                ? `<p class="text-center text-gray-600 mb-6">${result.explanation}</p>` 
                : '';

            const resultSellers = sellers.filter(s => result.seller_ids.includes(s.id));
            
            const sellersHTML = resultSellers.length > 0 
                ? resultSellers.map(renderSellerResultCard).join('<div class="my-4"></div>') 
                : '<p class="text-center text-gray-500 py-10">No travelers found matching your search.</p>';

            resultsContainer.innerHTML = explanationHTML + sellersHTML;

        } catch (error) {
            console.error('Search failed:', error);
            resultsContainer.innerHTML = '<p class="text-center text-red-500 py-10">Sorry, something went wrong with the search. Please try again.</p>';
        }
    }

    // --- HELPER FUNCTIONS ---
    function getRecommendedProducts() {
        // Flatten all products from all sellers, adding sellerId to each product
        const allProducts = sellers.flatMap(seller => 
            seller.products.map(product => ({ ...product, sellerId: seller.id }))
        );
        return allProducts.sort(() => 0.3 - Math.random()).slice(0, 3);
    }

    // --- EVENT LISTENERS ---
    document.getElementById('app-header').addEventListener('click', e => {
        const navBtn = e.target.closest('.nav-btn');
        const backBtn = e.target.closest('#back-button');
        if (navBtn) navigateTo(navBtn.dataset.page);
        if (backBtn) goBack();
    });
    
     document.getElementById('page-wrapper').addEventListener('click', e => {
        const addToCartBtn = e.target.closest('#add-to-cart-btn');

        if (addToCartBtn) {
            // This is the most specific action, so we handle it first to prevent
            // other click handlers (like for the parent card) from firing.
            const productId = parseInt(addToCartBtn.dataset.productId);
            const sellerId = parseInt(addToCartBtn.dataset.sellerId);
            const selectedVariantInput = document.querySelector('input[name="variant"]:checked');

            if (!selectedVariantInput) {
                alert('Please select a variant first.'); // Give user feedback
                return; // Stop if no variant is chosen
            }
            const selectedVariant = selectedVariantInput.value;
            
            const existingItem = shoppingCart.find(item => item.productId === productId && item.variant === selectedVariant);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                shoppingCart.push({ sellerId, productId, variant: selectedVariant, quantity: 1});
            }
            showSuccessPopup();
            renderHeader(); // update cart count
        } else if (e.target.closest('#my-orders-btn')) {
            navigateTo('page-my-orders');
        } else if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            navigateTo('page-product-details', {
                productId: parseInt(productCard.dataset.productId),
                sellerId: parseInt(productCard.dataset.sellerId)
            });
        } else if (e.target.closest('.seller-card')) {
            const sellerCard = e.target.closest('.seller-card');
            navigateTo('page-seller-homepage', { sellerId: parseInt(sellerCard.dataset.sellerId) });
        }
        // Handle "See More" button click on the dashboard
        else if (e.target.closest('#see-more-sellers')) {
            const sellerGrid = document.querySelector('#seller-grid-dashboard');
            sellerGrid.innerHTML = sellers.map(renderSellerDashboardCard).join('');
            e.target.closest('#see-more-container').remove(); // Remove the button after showing all
        }
    });
    
    document.getElementById('search-form').addEventListener('submit', e => { e.preventDefault(); handleSearch(document.getElementById('search-input').value.trim()); });
    document.getElementById('search-form-results').addEventListener('submit', e => { e.preventDefault(); handleSearch(document.getElementById('search-input-results').value.trim()); });
    
    function showSuccessPopup() {
        const popup = document.getElementById('success-popup');
        popup.classList.remove('popup-hidden');
        popup.classList.add('popup-visible');
        setTimeout(() => {
            popup.classList.remove('popup-visible');
            popup.classList.add('popup-hidden');
        }, 2000);
    }

    // --- INITIALIZATION ---
    function initializeApp() {
        renderHeader();
        renderPageContent('page-buyer-dashboard');
        // navigateTo() is not needed on init, its guard prevents renderHeader() from running.
    }

    initializeApp();
    
    // --- FULL IMPLEMENTATION OF NEW RENDER FUNCTIONS ---
    
    function renderSellerProfile(seller) {
        const productGrid = seller.products.map(p => renderProductCard({ ...p, sellerId: seller.id })).join('');
        return `<div class="bg-white rounded-xl p-4 shadow-lg">
                <div class="flex items-start space-x-4">
                    <img src="${seller.profilePicUrl}" alt="${seller.name}" class="w-24 h-24 rounded-lg object-cover">
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="flex items-center space-x-2"><h2 class="text-xl font-bold font-lora text-gray-900">${seller.name}</h2>${seller.isVerified ? ICONS.verified : ''}</div>
                                <div class="flex items-center text-xs text-yellow-500 space-x-1 mt-1">${ICONS.star}<span>${seller.rating}/5 | ${seller.products.length} products | ${seller.activeStatus}</span></div>
                            </div><button class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2">${ICONS.messages}<span>Chat</span></button>
                        </div>
                        <div class="text-sm text-gray-600 mt-2 space-y-1"><p><span class="font-semibold">Baggage Limit:</span> ${seller.baggageLimit}</p><p><span class="font-semibold">From:</span> ${seller.location}</p><hr class="my-2"><p><span class="font-semibold">Currently in:</span> ${seller.travelDestination}</p><p><span class="font-semibold">Arrival Date:</span> ${seller.travelDates.split(' - ')[1]}</p></div>
                    </div></div></div><div class="mt-6 grid grid-cols-2 gap-4">${productGrid}</div>`;
    }

    function renderProductDetails(product, seller) {
        const variantsHTML = product.variants.map((v, i) => `<label class="cursor-pointer"><input type="radio" name="variant" value="${v}" class="sr-only peer"><div class="px-3 py-1.5 text-sm border rounded-md peer-checked:bg-gray-800 peer-checked:text-white peer-checked:border-gray-800">${v}</div></label>`).join('');
        const reviewsHTML = product.reviews.map(r => `<div class="border-t pt-4 mt-4"><div class="flex items-center space-x-2"><div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">${r.user.charAt(0).toUpperCase()}</div><div><p class="font-semibold text-sm">${r.user}</p><p class="text-xs text-gray-500">Variant: ${r.variant}</p></div></div><p class="mt-2 text-sm text-gray-700">${r.text}</p><img src="${r.image}" class="mt-2 rounded-md w-20 h-20 object-cover"></div>`).join('');
        return `<div class="space-y-4">
            <div class="bg-white rounded-lg shadow-md p-4 space-y-4">
                <img src="${product.imageUrl}" class="w-full rounded-lg object-cover aspect-square">
                <div>
                    <h2 class="text-lg font-bold font-lora">${product.name}</h2>
                    <p class="text-2xl font-bold text-gray-800 mt-1">Rp${product.price.toLocaleString('id-ID')}</p>
                    <p class="text-xs text-gray-500">${product.sold}+ sold</p>
                </div>
                <div><p class="text-sm font-semibold mb-2">Variant:</p><div class="flex flex-wrap gap-2">${variantsHTML}</div></div>
                <div><p class="text-sm font-semibold mb-2">Quantity:</p><div class="flex items-center space-x-2"><button class="w-8 h-8 border rounded-md">-</button><span class="w-10 text-center">1</span><button class="w-8 h-8 border rounded-md">+</button></div></div>
                <div class="flex space-x-2 pt-2"><button id="add-to-cart-btn" data-product-id="${product.id}" data-seller-id="${seller.id}" class="flex-1 bg-[#D9AAB7] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">${ICONS.cart}<span>Add to Shopping Cart</span></button><button class="w-12 h-12 border rounded-lg flex items-center justify-center">🖤</button></div>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex items-center space-x-3 seller-card cursor-pointer" data-seller-id="${seller.id}">
                    <img src="${seller.profilePicUrl}" class="w-12 h-12 rounded-full">
                    <div><p class="font-bold">${seller.name}</p><p class="text-xs text-gray-500">${seller.location}</p></div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4"><h3 class="font-bold font-lora mb-2">Product Details</h3><div class="text-sm space-y-1 text-gray-600"><p><strong>Brand:</strong> ${product.brand}</p><p><strong>Weight:</strong> ${product.weight}</p><p><strong>Expiry Date:</strong> ${product.expiry}</p><p><strong>Country of Origin:</strong> ${product.country}</p></div></div>
            <div class="bg-white rounded-lg shadow-md p-4"><h3 class="font-bold font-lora mb-2">Product Description</h3><p class="text-sm text-gray-600">${product.description}</p></div>
            <div class="bg-white rounded-lg shadow-md p-4"><h3 class="font-bold font-lora mb-2">Product Ratings (${product.reviews.length})</h3>${reviewsHTML}</div>
        </div>`;
    }

    function renderMyAccount(user) {
        return `<div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                <img src="${user.profilePicUrl}" class="w-20 h-20 rounded-full">
                <div class="flex-1">
                    <p class="font-bold text-lg">${user.name}</p><p class="text-sm text-gray-600">${user.email}</p><p class="text-sm text-gray-600">${user.phone}</p>
                    <div class="flex items-center text-sm text-gray-500 mt-1">${ICONS.location.replace('w-3 h-3', 'w-4 h-4')}<span>${user.location}</span></div>
                </div><button class="border rounded-md px-3 py-1.5 text-sm font-semibold">Edit</button>
            </div>
            <div><h3 class="font-lora font-semibold text-lg mb-2">Account Summary</h3><div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-white rounded-lg shadow-md p-3"><p class="font-bold text-lg">Rp${(user.totalSpend/1000)}K</p><p class="text-xs text-gray-500">Total Spend</p></div>
                <div class="bg-white rounded-lg shadow-md p-3"><p class="font-bold text-lg">${user.activeOrders}</p><p class="text-xs text-gray-500">Active Order</p></div>
                <div class="bg-white rounded-lg shadow-md p-3"><p class="font-bold text-sm truncate">${user.favoriteDestinations}</p><p class="text-xs text-gray-500">Favorite</p></div>
            </div></div>
            <div><h3 class="font-lora font-semibold text-lg mb-2">Quick Actions</h3><div class="grid grid-cols-3 gap-2 text-center">
                <button id="my-orders-btn" class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center space-y-1"><span class="text-red-400">📖</span><span class="text-sm font-semibold">My Orders</span></button>
                <button class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center space-y-1"><span class="text-red-400">👤</span><span class="text-sm font-semibold">Seller Mode</span></button>
                <button class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center space-y-1"><span class="text-red-400">⚙️</span><span class="text-sm font-semibold">Settings</span></button>
            </div></div>
        </div>`;
    }

    function renderMyOrders(orderList) {
        const statusStyles = {
            'Pending': 'bg-yellow-100 text-yellow-800', 'On The Way': 'bg-purple-100 text-purple-800', 'Delivered': 'bg-green-100 text-green-800'
        };
        const ordersHTML = orderList.map(o => `
            <div class="bg-white rounded-lg shadow-md p-4 space-y-3">
                <div class="flex justify-between items-center"><p class="font-bold">Order #${o.id}</p><p class="text-xs text-gray-500">${o.date}</p></div>
                <div class="flex space-x-3">
                    <img src="${o.product.imageUrl}" class="w-20 h-20 rounded-md">
                    <div>
                        <p class="text-sm font-semibold">${o.seller}</p><p class="text-sm">${o.product.name}</p><p class="text-xs text-gray-500">Variant: ${o.product.variant}</p>
                        <p class="text-xs mt-1">Tracking: <span class="font-semibold text-blue-600">${o.tracking}</span></p>
                    </div>
                </div>
                <div class="text-right"><p class="text-sm font-semibold">Order Total: <span class="text-red-500">Rp${o.total.toLocaleString('id-ID')}</span></p></div>
                <div class="flex justify-between items-center border-t pt-3">
                    <span class="text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[o.status]}">${o.status}</span>
                    <div class="space-x-2"><button class="border rounded-full px-3 py-1 text-xs">Contact Seller</button>${o.status === 'Delivered' ? '<button class="bg-pink-200 text-pink-800 rounded-full px-3 py-1 text-xs">Rate & Review</button>' : ''}</div>
                </div>
            </div>`).join('');
        return `<div class="space-y-4">${ordersHTML}</div>`;
    }

    function renderMessages(messageList) {
        return messageList.map(m => `
            <div class="bg-white rounded-lg shadow-md p-3 flex items-center space-x-4 cursor-pointer">
                <img src="${m.profilePicUrl}" class="w-12 h-12 rounded-full">
                <div class="flex-1"><p class="font-semibold">${m.user}</p><p class="text-sm text-gray-500 truncate">${m.text}</p></div>
                <div class="text-right"><p class="text-xs text-gray-400">${m.time}</p>${m.unread > 0 ? `<span class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">${m.unread}</span>` : ''}</div>
            </div>`).join('<div class="my-3"></div>');
    }

    function renderNotifications(notificationList) {
        return notificationList.map(n => `
            <div class="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4">
                <div class="text-gray-400 mt-1">🔔</div>
                <div class="flex-1"><p class="font-semibold">${n.title}</p><p class="text-sm text-gray-600">${n.body}</p></div>
                <div class="text-right"><p class="text-xs text-gray-400">${n.date}</p>${n.isNew ? '<div class="w-2 h-2 bg-red-500 rounded-full mt-2 ml-auto"></div>' : ''}</div>
            </div>`).join('<div class="my-3"></div>');
    }

    function renderShoppingCart(cart) {
        if (cart.length === 0) return `<p class="text-center text-gray-500 py-16">Your shopping cart is empty.</p>`;

        const groupedBySeller = cart.reduce((acc, item) => {
            (acc[item.sellerId] = acc[item.sellerId] || []).push(item);
            return acc;
        }, {});
        
        let totalAmount = 0;
        
        const sellersHTML = Object.keys(groupedBySeller).map(sellerId => {
            const seller = sellers.find(s => s.id == sellerId);
            const items = groupedBySeller[sellerId];
            
            const itemsHTML = items.map(item => {
                const product = seller.products.find(p => p.id == item.productId);
                totalAmount += product.price * item.quantity;
                return `<div class="flex items-center space-x-3 py-3">
                        <input type="checkbox" checked class="h-5 w-5 rounded">
                        <img src="${product.imageUrl}" class="w-16 h-16 rounded-md">
                        <div class="flex-1"><p class="text-sm font-semibold">${product.name}</p><p class="text-xs text-gray-500">Variant: ${item.variant}</p><p class="text-sm font-bold text-red-500 mt-1">Rp${product.price.toLocaleString('id-ID')}</p></div>
                        <div class="flex items-center space-x-2 border rounded-md"><button class="px-2">-</button><span>${item.quantity}</span><button class="px-2">+</button></div>
                    </div>`;
            }).join('<hr>');
            
            return `<div class="bg-white rounded-lg shadow-md p-4">
                        <div class="flex justify-between items-center pb-2">
                            <div class="flex items-center space-x-2"><input type="checkbox" checked class="h-5 w-5 rounded"><p class="font-bold">${seller.name} &gt;</p></div>
                            <button class="text-sm">Edit</button>
                        </div><hr>${itemsHTML}</div>`;
        }).join('<div class="my-4"></div>');
        
        return `${sellersHTML}
                <div class="sticky bottom-0 bg-white shadow-lg p-4 mt-4 rounded-t-lg">
                    <div class="flex justify-between items-center">
                        <label class="flex items-center space-x-2"><input type="checkbox" checked><span>All</span></label>
                        <div><p class="text-sm">Total: <span class="font-bold text-red-500">Rp${totalAmount.toLocaleString('id-ID')}</span></p></div>
                        <button class="bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg">Check Out (${cart.length})</button>
                    </div>
                </div>`;
    }


});