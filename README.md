🛒 Shopix - Modern E-commerce Platform
Shopix is a high-performance, responsive e-commerce web application. It is built with React and Bootstrap 5, providing a smooth shopping experience through real-time data integration and intuitive UI design.

🚀 Key Features
Dynamic Product Management: Fetches live data from the DummyJSON API, ensuring an up-to-date product catalog.

Intelligent Filtering: Features a specialized sidebar for instant category navigation (e.g., Smartphones, Laptops, Beauty).

Rich Product Views: High-fidelity detail pages including dynamic image galleries, live stock status, and star ratings.

State-of-the-Art State Management: Utilizes React Context API for centralized Cart and Favorites management.

Persistent Shopping: Integrated Local Storage keeps your cart and favorite items saved even after refreshing or closing the browser.

Seamless Navigation: Optimized routing using React Router Dom v6 for a fast, single-page application (SPA) feel.

Modern Aesthetic: A clean, professional look achieved through a blend of Bootstrap 5 and custom CSS3.

🛠️ Tech Stack
Core: React.js

Routing: React Router Dom

State: Context API

UI/UX: Bootstrap 5 & Custom CSS

Icons: React Icons (Ri, Ci, Md, Fa)

Data Source: DummyJSON API

📂 Project Architecture
Plaintext
src/
├── assets/             # Branding and static assets
├── component/          # Reusable UI architecture
│   ├── CartContext.jsx  # Global state for shopping cart & favorites
│   ├── Header.jsx       # Interactive navigation & search bar
│   ├── Footer.jsx       # Standardized site footer
│   ├── Product.jsx      # Reusable product card component
│   └── aside.jsx        # Category filtering sidebar
├── pages/
│   ├── App.jsx          # Master Layout (Root Outlet)
│   ├── Home.jsx         # Landing page with "Top Sales" highlights
│   ├── Products.jsx     # Full product catalog with filters
│   ├── ProductDetails.jsx # Detailed single-product view
│   └── index.css        # Global styling and design variables
└── main.jsx             # Entry point & router configuration
📝 License & Contact
License: Distributed under the MIT License.

Developer: Mona Mosad — monamosad392@gmail.com.

Project Repository: https://github.com/your-username/shopix.
