# 🛒 Smart Basket

Smart Basket is a minimalist Progressive Web App (PWA) designed to help users quickly note down shopping items, track prices, and see total costs — all in a sleek, mobile-optimized interface. It works offline, saves your data locally, and supports installation as a standalone app.

---

## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [PWA Support](#-pwa-support)
- [Dependencies](#-dependencies)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 📌 Introduction

**Smart Basket** helps you:

- Add shopping items with names and prices.
- Mark items as purchased.
- View total cost in Turkish Lira.
- Automatically store items locally in your browser.
- Use the app offline with full PWA capabilities.

---

## ✨ Features

- 📝 Add items with name and price.
- ✅ Mark items as bought.
- 🧹 Clear all items at once.
- 💰 Total price calculated automatically.
- 🌐 Fully offline support via service worker.
- 📱 Installable as a mobile/web app.
- 🇹🇷 Turkish language UI.
- 💾 LocalStorage-based persistence (no backend).

---

## 🛠️ Installation

### Method 1: Open Locally

1. Clone the repository or download the files.
2. Open `index.html` in any modern browser.

### Method 2: Deploy Online

You can host it on any static hosting service like:

- GitHub Pages
- Vercel
- Netlify

Ensure all files are in the root directory:

---

## 🚀 Usage

1. Enter a product name (e.g., *Süt 1L*).
2. Enter a price (e.g., *39,90*).
3. Click **Sepete Ekle** to add the item.
4. Use the ✓ button to mark it as bought.
5. Use the 🗑️ icon to remove individual items.
6. Use **Temizle** to clear all items.

> The app automatically saves your data in LocalStorage and retains it across visits.

---

## 📦 PWA Support

Smart Basket is a fully functional Progressive Web App (PWA):

- Installable on Android/iOS/Home Screen
- Offline support via `sw.js` Service Worker
- Manifest with app icons and theme colors

To test offline:

1. Open DevTools → Application → Service Workers
2. Check "Offline"
3. Refresh the page and test functionality

---

## 📁 Dependencies

This project is completely **vanilla** (no frameworks or external dependencies). It uses:

- HTML5
- CSS3 (custom properties, layout styles)
- JavaScript ES6+
- Web APIs: LocalStorage, ServiceWorker, Intl.NumberFormat

---

## ⚙️ Configuration

### Service Worker Cache

Defined in `sw.js`:
```js
const CACHE_NAME = 'smart-basket-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];
