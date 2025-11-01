# ToBe Ecommerce

ToBe Ecommerce is a dynamic and responsive front-end web application built with React. This project is designed to serve as a comprehensive demonstration of modern web development skills, focusing on core React concepts, state management, API integration, and user interface design.

It simulates a real-world e-commerce platform where users can browse, add, edit, and delete products, manage a shopping cart, and search for items.

## Purpose of the Project

The primary goal of this project is to showcase proficiency in the following areas:

*   **React Fundamentals:** Component-based architecture, hooks (`useState`, `useEffect`, `useContext`), and functional components.
*   **State Management:** Utilizing the **Context API** for efficient global state management, avoiding prop-drilling.
*   **API Integration:** Performing asynchronous **CRUD (Create, Read, Update, Delete)** operations with a third-party REST API.
*   **Routing:** Implementing client-side routing using **React Router** to create a seamless single-page application (SPA) experience.
*   **Modern JavaScript (ES6+):** Writing clean, maintainable, and efficient code.
*   **Responsive Web Design:** Crafting a user interface that adapts gracefully to different screen sizes, from mobile devices to desktops.

---

## Key Features

### 1. **Product Management (Full CRUD Operations)**
   - **Create:** Users can add new products to the store through a user-friendly modal form.
   - **Read:** Products are fetched from the [Platzi Fake Store API](https://fakeapi.platzi.com/) and displayed in a clean, grid-based layout.
   - **Update:** Existing products can be easily edited. The same modal form is pre-populated with the product's current data for modification.
   - **Delete:** Products can be removed from the store with a single click.

### 2. **Global State with Context API**
   - The application uses React's `useContext` hook to manage global state, including the product list, shopping cart items, loading status, and user feedback notifications.
   - This approach centralizes state logic, making the application easier to manage and scale.

### 3. **Client-Side Routing with React Router**
   - **`/` (Home):** The main product display page with sorting and pagination.
   - **`/cart`:** The shopping cart page, where users can view and manage their selected items.
   - **`/search`:** A dedicated page to display results based on the user's search query.

### 4. **Shopping Cart Functionality**
   - **Add to Cart:** Users can add any product to their shopping cart. The cart icon in the header updates with a badge count.
   - **Update Quantity:** In the cart, users can increase or decrease the quantity of each item. If an item's quantity is reduced to zero, it is automatically removed.
   - **Total Calculation:** The cart automatically calculates and displays the total price of all items.

### 5. **Search and Filtering**
   - A search bar in the header allows users to search for products by title.
   - The product display page includes options to sort products by price (High to Low and Low to High).

### 6. **User Feedback and Loading States**
   - A global `Feedback` component provides toast notifications for success (e.g., "Product added to cart!") or error messages, enhancing the user experience.
   - A loading spinner is displayed whenever an API request is in progress, informing the user that data is being fetched.

### 7. **Pagination**
   - To handle a large number of products efficiently, the main product page includes a simple pagination control to fetch and display products in batches.

---

## Technologies Used

*   **Core:** [React](https://reactjs.org/), [JavaScript (ES6+)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **HTTP Client:** [Axios](https://axios-http.com/) for making API requests.
*   **Styling:** CSS with a focus on modern, responsive design.
*   **Icons:** [Font Awesome](https://fontawesome.com/) for UI icons.