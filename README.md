# Jewelry Management System

A full-stack web application for managing jewelry inventory built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **View Jewelry Collection**: Browse all jewelry items in a responsive grid layout
- **Search Functionality**: Search jewelry by name
- **Filtering & Sorting**: Filter by material (Silver, Gold, Diamond) and sort by price or name
- **CRUD Operations**: Create, read, update, and delete jewelry items
- **Image Upload**: Upload and store jewelry images using Cloudinary
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and DaisyUI
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image hosting and management
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Hot Toast** - Notification library
- **Lucide React** - Icon library

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   **Note**: Replace the placeholder values with your actual credentials.

4. **Build the application**
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build and start the application**
   ```bash
   npm start
   ```
   This will start the backend server with the built frontend served statically.

## API Endpoints

### Jewelry Routes
- `GET /jewelry` - Get all jewelry items
- `GET /jewelry/:id` - Get a specific jewelry item by ID
- `POST /jewelry` - Create a new jewelry item
- `PUT /jewelry/:id` - Update an existing jewelry item
- `DELETE /jewelry/:id` - Delete a jewelry item
- `POST /jewelry/upload` - Upload an image for jewelry

### Jewelry Model Schema
```javascript
{
  name: String (required),
  image: String,
  description: String,
  material: String (enum: ["Gold", "Silver", "Stainless Steel", "Copper", "Diamond", "Pearls", "Other"]),
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
mern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── jewelry.controller.js
│   │   ├── models/
│   │   │   └── Jewelry.model.js
│   │   ├── routes/
│   │   │   └── jewelry.routes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JewelryCard.jsx
│   │   │   ├── JewelryNotFound.jsx
│   │   │   └── Navbar.jsx
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── JewelryDetailPage.jsx
│   │   │   └── UpdatePage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── eslint.config.js
├── package.json
└── README.md
```

## Usage

1. **Home Page**: View all jewelry items with filtering and sorting options
2. **Create Jewelry**: Navigate to the create page to add new jewelry items with images
3. **Update Jewelry**: Click on a jewelry card to view details and edit
4. **Delete Jewelry**: Use the delete button on jewelry cards (with confirmation)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Built with the MERN stack
- UI components from DaisyUI
- Icons from Lucide React
- Image hosting by Cloudinary</content>
<parameter name="filePath">c:\PT_111\MERN\README.md
