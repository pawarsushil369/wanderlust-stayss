# Wanderlust Stays 🏡

Wanderlust Stays is a full-stack travel listing web application inspired by Airbnb. It allows users to explore travel destinations, create property listings, and share their experiences through reviews and ratings.

## 🚀 Features

- **User Authentication:** Secure signup and login using Passport.js.
- **Create Listings:** Authenticated users can add new property listings.
- **Manage Listings:** Listing owners can edit and delete their listings.
- **Reviews and Ratings:** Users can share reviews and rate properties.
- **Search and Categories:** Explore listings by location and category.
- **Authorization:** Only authorized users can perform specific actions.
- **Image Uploads:** Upload and manage listing images using Cloudinary.
- **Flash Messages:** Display success and error messages.
- **Responsive UI:** User-friendly interface built with Bootstrap.

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript, EJS, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js, passport-local-mongoose, express-session
- **Image Storage:** Cloudinary
- **Validation:** Joi
- **Deployment:** Render
- **Version Control:** Git and GitHub

## ⚙️ Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/pawarsushil369/wanderlust-stayss.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Wanderlust-Stays
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   MY_SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

5. Start the application:

   ```bash
   node app.js
   ```

   If your project uses Nodemon, you can run:

   ```bash
   nodemon app.js
   ```

6. Open your browser and visit:

   ```text
   http://localhost:8080
   ```

## 🏗️ Project Architecture

The application follows the MVC (Model-View-Controller) architecture.

- **Model:** Defines database schemas and handles data through Mongoose.
- **View:** Uses EJS templates to render dynamic web pages.
- **Controller:** Handles application logic and processes user requests.
- **Routes and Middleware:** Manage endpoints, authentication, validation, and authorization.

## 🔐 Security

- Password authentication managed using Passport.js.
- Session-based authentication.
- Authorization checks for listing owners and review-related actions.
- Server-side input validation using Joi.
- Sensitive configuration stored in environment variables.

## 🎯 Learning Outcomes

- Developed a full-stack web application.
- Implemented CRUD operations and RESTful routes.
- Integrated MongoDB with Node.js and Express.js.
- Implemented authentication, sessions, and authorization.
- Used Cloudinary for image uploads.
- Applied MVC architecture and custom middleware.
- Deployed the application using Render.

## 👨‍💻 Author

**Sushil Pawar**

Computer Engineering Student | Full-Stack Web Developer

GitHub: https://github.com/pawarsushil369

---

If you find this project useful, feel free to explore the repository.
