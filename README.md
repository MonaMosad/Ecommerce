🛒 Shopix - Modern E-commerce Platform
Shopix is a responsive, feature-rich e-commerce web application built with React and Bootstrap. It utilizes the DummyJSON API to provide a seamless shopping experience, complete with category filtering, product details, and a functional cart/favorites system using React Context.

🚀 Features
Dynamic Product Listing: Fetches real-time product data from DummyJSON API.

Category Filtering: Specialized sidebar for browsing products by categories (Smartphones, Laptops, Beauty, etc.).

Product Details: High-fidelity product pages featuring image galleries, stock status, and ratings.

State Management: Centralized Cart and Favorites management using React Context API.

Local Storage Persistence: Your cart and favorites are saved locally, so they persist even after a page refresh.

Responsive Routing: Smooth navigation handled by React Router Dom v6.

Modern UI: Styled with a mix of Bootstrap 5 and custom CSS for a clean, professional aesthetic.

🛠️ Tech Stack
Frontend: React.js

Routing: React Router Dom

State Management: Context API

Icons: React Icons (Ri, Ci, Md, Fa)

Styling: Bootstrap 5, Custom CSS

API: DummyJSON

src/
├── assets/           # Static images and logos
├── component/        # Reusable UI components
│   ├── CartContext.jsx  # Global State for Cart & Favorites
│   ├── Header.jsx       # Navigation and Search
│   ├── Footer.jsx       # Site footer
│   ├── Product.jsx      # Individual Product Card
│   └── aside.jsx        # Category sidebar filter
├── pages/
│   ├── App.jsx          # Master Layout (Outlet)
│   ├── Home.jsx         # Homepage with "Top Sales"
│   ├── Products.jsx     # All products page with filtering
│   ├── ProductDetails.jsx # Single product view
│   └── index.css        # Global styles and overrides
└── main.jsx             # Router configuration and Entry point


📝 License
Distributed under the MIT License. See LICENSE for more information.

✉️ Contact
Mona Mosad - monamosad392@gmail.com

Project Link: https://github.com/your-username/shopix
