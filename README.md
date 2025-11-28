# 🚀 E-Commerce Web Application (Angular)

A modern, responsive, and fully-functional E-Commerce web application built with Angular, featuring authentication, advanced cart management, checkout, and a complete payment workflow. The application is fully deployed live using GitHub Pages.

---

## 🔗 Live Demo
https://Noraa98.github.io/E-Commerce/

---

## 🏷️ Project Highlights
- Fully responsive modern UI  
- Dynamic product catalog (listing + details)  
- Cart module (add / remove / update + totals)  
- Persistent cart using LocalStorage  
- JWT-based authentication (Login + Register)  
- Auth Guards to protect restricted pages  
- Complete payment module (validation + confirmation)  
- Toastr notifications for user feedback  
- Clean folder structure following Angular best practices  
- Deployed on GitHub Pages

---

## ✨ Features

### 🛍️ Product Management
- Product listing with clean grid design  
- Product details page with full information  
- Search & filtering (if enabled)  

### 🛒 Cart Module
- Add, remove, and update items  
- Auto total price calculation  
- Cart data saved in LocalStorage  

### 🔐 Authentication
- Login and registration  
- JWT token stored securely  
- Protected routes using Angular Guards  
- Redirect behavior for unauthorized users  

### 💳 Payment Module
- Full checkout flow  
- Validate user & cart before payment  
- Payment confirmation page  
- Clears cart after successful payment  

### 🎨 UI / UX Enhancements
- Toastr notifications  
- Loading states  
- Reusable components  
- Clean and responsive SCSS styling  

---

## 🛠️ Technologies Used

### Frontend
- Angular  
- TypeScript  
- RxJS  
- HTML5 / SCSS  
- Bootstrap / Custom Styling  
- Toastr Notifications  

### Tools
- Angular CLI  
- Node.js  
- Git & GitHub  
- GitHub Pages  

---

## 📂 Project Structure

/src
├── app
│ ├── auth
│ │ ├── login
│ │ ├── register
│ │ └── auth.service.ts
│ ├── payment
│ │ ├── checkout
│ │ └── payment.service.ts
│ ├── cart
│ │ ├── cart.component.ts
│ │ └── cart.service.ts
│ ├── products
│ │ ├── product-list
│ │ ├── product-details
│ │ └── product.service.ts
│ ├── shared
│ │ ├── components
│ │ ├── guards
│ │ └── models
│ └── app-routing.module.ts
└── assets


---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Noraa98/E-Commerce.git

2. Install dependencies
npm install

3. Run the app
ng serve


Visit: http://localhost:4200/

📦 Build & Deployment
Build for production
ng build --configuration production

Deploy to GitHub Pages
ng build --output-path dist --base-href "/E-Commerce/"
npx angular-cli-ghpages --dir=dist/E-Commerce

📸 Screenshots

(Add screenshots of Home, Products, Cart, Login, Checkout if you want)

👩‍💻 Author

Noura — Full Stack .NET & Angular Developer
GitHub: https://github.com/Noraa98

LinkedIn: https://www.linkedin.com/in/noura-ahmed-36779b304

📜 License

MIT
