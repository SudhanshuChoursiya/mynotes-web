# Notes Website

A modern MERN stack web application where users can read and download study material.

## Live Demo

[Click here to visit the live website](https://mynotes-web-pi.vercel.app)

## Features

- **Read & Download Notes** – Browse and download study material easily
- **Admin Dashboard** – Manage and upload new notes
- **Search & Pagination** – Quickly find notes with search and pagination
- **User Authentication** – JWT-based authentication
- **Responsive Design** – Fully optimized for all devices

## Tech Stack

### Frontend:
- React.js
- React Router
- React Bootstrap
- React PDF Viewer
- React Paginate
- React Toastify

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Token (JWT)
- Multer (for file uploads)
- Nodemailer

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version)
- **MongoDB** (Local or cloud-based)

### Steps to Run Locally

#### Clone the Repository
```sh
git clone https://github.com/SudhanshuChoursiya/Notes-website.git
cd Notes-website
```

#### Frontend Setup
```sh
cd frontend
npm install
npm start
```
- Open [`http://localhost:3000`](http://localhost:3000) in your browser.

#### Backend Setup
```sh
cd backend
npm install
```

Create a `.env` file in the **backend** folder and add:
```env
MONGO_CONNECTION_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MY_EMAIL=your_email
MY_PASSWORD=your_email_password
```

Run the backend server:
```sh
npm run dev
```
- Backend will run at [`http://localhost:5000`](http://localhost:5000).

## Available Scripts

### Frontend Scripts
```sh
npm run start    # Start development server
npm run build    # Build for production
```

### Backend Scripts
```sh
npm run dev      # Start backend with nodemon
npm run start    # Start backend in production
```

## Contact
For any inquiries, feel free to reach out:

- **Email:** sudhanshuchoursiya2@gmail.com
- **GitHub:** [SudhanshuChoursiya](https://github.com/SudhanshuChoursiya)