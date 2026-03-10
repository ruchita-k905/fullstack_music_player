🎵 MERN Stack Music Streaming Web Application

This project is a Full Stack Music Streaming Web Application developed as part of the WSA Internship Program (5 Weeks).

The application allows users to register, log in, stream music, manage favorites, edit profile details, and securely reset passwords.

Tech Stack
🔹 Frontend
React.js
Redux Toolkit
React Router DOM
Tailwind CSS
Axios / Fetch API

🔹 Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Bcrypt (Password Hashing)

🔹 Tools & APIs
Postman (API Testing)
Git & GitHub
VS Code
Jamendo API (Music Data)
ImageKit (Image Hosting)

Features-
Authentication
User Signup
User Login
JWT-based Authentication
Protected Routes
Forgot Password
Reset Password

Music Features-
Fetch songs from API
Audio Playback Controls (Play, Pause, Next, Previous)
Song State Management
Favorites Handling

👤 User Features
Edit Profile
Update User Information
Secure Logout

Architecture
The project follows the MERN Stack Architecture:

Frontend (React + Redux)
⬇
Backend (Express.js REST APIs)
⬇
MongoDB Database
MVC Architecture on backend
Global State Management using Redux Toolkit
Token-based authentication system

⚙️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/repository-name.git
Install dependencies

Frontend:
cd client
npm install

Backend:
cd server
npm install

Setup Environment Variables
Create a .env file in the server folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the project
Backend:
npm run dev

Frontend:
npm run dev
