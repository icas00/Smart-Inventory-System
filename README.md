# Smart Inventory System

A full-stack inventory and sales management system with three modules:

- **Frontend**: React + Next.js dashboard for managing products, orders, and reports.  
- **Backend (Frappe)**: Python-based backend for inventory, order, and user management.  
- **Backend (Spring Boot)**: Java backend for payment processing and Razorpay integration.

---

## Features

### Frontend
- Dashboard with product, order, and sales charts.
- Inventory management (add/edit products, view stock).
- Order management (view and track orders).
- User authentication (login/register).

### Backend (Frappe)
- Product, Order, Stock Movement, and User Profile Doctypes.
- REST API endpoints for frontend consumption.
- Sample data fixtures included.
- Docker-ready for quick setup.

### Backend (Spring Boot)
- Payment processing with Razorpay integration.
- Webhook handling for payment updates.
- Swagger API documentation for easy testing.

---

## Tech Stack

- **Frontend**: React, Next.js, Axios, CSS  
- **Backend (Frappe)**: Python, Frappe Framework, Docker  
- **Backend (Spring Boot)**: Java, Spring Boot, Maven, Razorpay API  
- **Database**: MySQL, MongoDB  
- **Other Tools**: Postman, Git, Docker  

---

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x (for Frappe backend)
- Java 17+ and Maven (for Spring backend)
- MySQL
- Docker (optional)

---

### Setup Frontend

```bash
cd smart-inventory-frontend
npm install
npm run dev
