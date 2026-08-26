# Mini E-commerce Website

A full-stack e-commerce solution built with React, Flask, and MongoDB Atlas.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, Lucide Icons, React Router.
- **Backend**: Flask, Flask-JWT-Extended, PyMongo, Flask-CORS.
- **Database**: MongoDB Atlas.

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB Atlas cluster

### Installation

**Backend:**
```bash
cd backend
pip install -r requirements.txt
# Configure your .env file
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Features
- **Roles**: User and Admin.
- **Auth**: JWT secret tokens stored in localStorage.
- **Shopping**: Browse, Search, Cart, Checkout.
- **Admin**: Add/Edit/Delete products with image upload, update order statuses (Pending -> Delivered).
