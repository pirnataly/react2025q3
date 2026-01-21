# Flickr Photo Search App

React SPA for searching photos using the Flickr API with pagination, persistent search state, and a detailed photo view in a modal window.

🔗 **Live demo:**  
https://react2025q3-rh92.vercel.app

---

## 🧩 Overview

This application allows users to search for photos, navigate results using pagination, and view detailed information about a selected photo without leaving the search context.

The project was built as part of the **RS School React course** and focuses on state management, routing, API interaction, and user experience.

---

## ✨ Key Features

### 🔍 Search & Persistence
- Photo search via Flickr API
- Search query is restored from **localStorage** on page reload
- If `localStorage` is empty, the application starts with an empty state, all available items are started fetching and prompts the user to perform a search

### 🔗 Pagination & URL Sync
- Pagination is available in the UI
- Current page and search parameters are reflected in the **URL**
- Users can refresh the page or share the link and get the same results

### 🖼 Photo Details (Modal)
- Clicking on a photo opens a **modal window** with detailed information
- The list of search results remains visible in the background
- Opening the modal:
    - triggers an additional API request
    - displays a loader
    - updates the URL
- The modal can be closed:
    - via the **Close** button
    - by clicking outside the modal

### 🧠 State Management
- Global state is managed with **Redux Toolkit**
- API interaction is implemented using **RTK Query**
- Loading and error states are properly handled
- Cache invalidation and refetching work correctly
- Manual cache invalidation is supported

### 🎯 Additional Functionality
- Selected items are stored in the global state and persist across pages
- Flyout component appears when items are selected and displays their count
- **Unselect all** and **Download** buttons work according to requirements
- Theme switching (light / dark) is implemented using **Context API**

---

## 📄 Pages

- **Main page** — search results with pagination
- **About page** — author information and a link to the RS School React course
- **404 page** — displayed for unknown routes

---

## 🛠 Tech Stack

- React
- React Router
- Redux Toolkit
- RTK Query
- Context API
- Vite
- Typescript

---

## 🧪 Testing

- New tests were added for the implemented functionality
- Core logic and UI behavior are covered

---

## 🚀 Deployment

- Built with **Vite**
- Deployed on **Vercel**
- SPA routing configured correctly for production

---

## 👤 Author

Developed as part of the **RS School React course**  
https://rs.school/courses/reactjs
