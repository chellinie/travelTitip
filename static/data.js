const sellers = [
    {
        id: 1, name: "Sarah Dewi", location: "Surabaya, Indonesia", rating: 4.9, isVerified: true, travelDestination: "Japan", travelDates: "1 - 7 Sep 2025", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Sarah", baggageLimit: "25 kg (5 kg left)", activeStatus: "Active 1 hr ago",
        products: [
            { id: 101, name: "Tokyo Milk Cheese Cookie 10 pcs", price: 150000, imageUrl: "https://placehold.co/100x100/F5E8DD/333?text=Cheese+Cookie", weight: "0.2 kg", expiry: "02 February 2026", country: "Japan", brand: "Tokyo Milk Cheese Factory", sold: 150, description: "1. Salt & Camembert Cookie: Essential Tokyo Milk Cheese Factory flavor and their most popular product. A crisp cookie made with fresh Hokkaido milk and French Guérande salt encases a rich slice of Camembert cheese chocolate. This combination is a perfect balance of savory saltiness and creamy, milky sweetness.", variants: ["Salt & Camembert", "Porcini & Gouda", "Honey & Gorgonzola", "Chocolate & Mascarpone"], reviews: [{user:"g***y", text: "Mantap, fast delivery!", variant: "Salt & Camembert", image:"https://placehold.co/100x100/EEE/333?text=Review1"},{user:"s***n", text: "Suka banget.", variant: "Honey & Gorgonzola", image:"https://placehold.co/100x100/EEE/333?text=Review2"}] },
            { id: 102, name: "LIMITED Kitkat Osaka...", price: 110000, imageUrl: "https://placehold.co/100x100/F5E8DD/333?text=Kitkat", variants: ["Original"], reviews: [] },
            { id: 103, name: "Tokyo Banana Soft C...", price: 125000, imageUrl: "https://placehold.co/100x100/F5E8DD/333?text=Banana", variants: ["Original"], reviews: [] },
            { id: 104, name: "Bourbon Biscuit", price: 90000, imageUrl: "https://placehold.co/100x100/F5E8DD/333?text=Biscuit", variants: ["Original"], reviews: [] },
        ]
    },
    { id: 2, name: "Jenni", location: "Jakarta, Indonesia", rating: 4.7, isVerified: true, travelDestination: "South Korea", travelDates: "1 - 9 Sep 2025", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Jenni", baggageLimit: "20 kg (8 kg left)", activeStatus: "Active 30 mins ago",
        products: [ { id: 201, name: "LIMITED Lays Deep Ridged", price: 65000, imageUrl: "https://placehold.co/100x100/DDEBF5/333?text=Lays", variants:["50gr"], reviews:[] } ]
    },
    { id: 3, name: "Dono", location: "Sidoarjo, Indonesia", rating: 4.9, isVerified: true, travelDestination: "Thailand", travelDates: "5 - 8 Sep 2025", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Dono", baggageLimit: "30 kg (15 kg left)", activeStatus: "Active 5 hours ago", 
        products: [ { id: 301, name: "Thai's Tomato Chips", price: 65000, imageUrl: "https://placehold.co/100x100/DDEBF5/333?text=Tomato", variants:["50gr"], reviews:[] }] },
    { id: 4, name: "Rose", location: "Malang, Indonesia", rating: 4.6, isVerified: true, travelDestination: "Singapore", travelDates: "4 - 7 Sep 2025", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Rose", baggageLimit: "15 kg (2 kg left)", activeStatus: "Active 2 days ago", 
        products: [ { id: 401, name: "Garret Popcorn", price: 90000, imageUrl: "https://placehold.co/100x100/DDEBF5/333?text=Lays", variants:["Cheese", "Caramel"], reviews:[] }] },
    { id: 5, name: "Jini", location: "Sukoharjo, Indonesia", rating: 4.8, isVerified: true, travelDestination: "Vietnam", travelDates: "4 - 7 Sep 2025", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Jini", baggageLimit: "15 kg (2 kg left)", activeStatus: "Active 2 days ago", 
        products: [{ id: 201, name: "Traditional Viet Bag", price: 65000, imageUrl: "https://placehold.co/100x100/DDEBF5/333?text=Lays", variants:["Black", "White"], reviews:[] }] }

];

const currentUser = { name: "Tono", email: "tono123@gmail.com", phone: "0812345670", location: "Surabaya, Indonesia", memberSince: "Dec 2023", totalSpend: 500000, activeOrders: 2, favoriteDestinations: "Japan, Italy", profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Tono" };
const orders = [
    { id: "U0016", date: "5 September 2025", seller: "Sarah Dewi", product: { name: "Tokyo Milk Cheese Cookie 10 pcs", variant: "Salt & Camembert", imageUrl: "https://placehold.co/100x100/F5E8DD/333?text=Cheese+Cookie"}, tracking: "TT09029", arrival: "13 September 2025", total: 166500, status: "Pending"},
    { id: "U0010", date: "5 September 2025", seller: "Rose", product: { name: "Garret Popcorn", variant: "Small; Caramel", imageUrl: "https://placehold.co/100x100/DDEFDD/333?text=Popcorn"}, tracking: "TT09020", arrival: "10 September 2025", total: 186500, status: "On The Way"},
    { id: "U0006", date: "23 August 2025", seller: "Indah K.", product: { name: "HBAF Honey Butter Almond", variant: "120gr", imageUrl: "https://placehold.co/100x100/F5EDDD/333?text=Almond"}, tracking: "TT08022", delivered: "30 August 2025", total: 155200, status: "Delivered"}
];
const messages = [
    { user: "Siti", text: "Oke siapp!", time: "Sep 4", unread: 2, profilePicUrl: "https://placehold.co/50x50/F5DDDD/333?text=S" },
    { user: "Sarah Dewi", text: "Mau ganti rasa atau gimana kak?", time: "Sep 4", unread: 0, profilePicUrl: "https://placehold.co/100x100/EBF0F5/333?text=Sarah" }
];
const notifications = [
    { title: "Finish your purchase!", body: "Hi, Tono! You have products waiting on your shopping cart. Continue to check out your wishlist.", date: "Sep 4", isNew: true },
    { title: "New Products are Here!", body: "Hi, Sarah Dewi has new products uploaded. Check them now before it runs out!", date: "Sep 1", isNew: false }
];
let shoppingCart = [
    { sellerId: 1, productId: 101, variant: "Salt & Camembert", quantity: 1 },
    { sellerId: 2, productId: 201, variant: "50gr", quantity: 1 }
];