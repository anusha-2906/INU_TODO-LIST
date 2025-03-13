# INU_TODO-LIST
Assignment for INU Technology


The To-Do List is a full-stack web application built using Node.js (Express) for the backend and React.js for the frontend. The application allows users to manage their daily tasks efficiently with features such as user authentication, task management, search, filtering, and pagination.

## Features
- User authentication (register, login, JWT-based authentication)
- Task management (CRUD operations: Create, Read, Update, Delete)
- Search and filtering for tasks
- Responsive UI for seamless user experience
- State management using React's Context API/Redux
- Unit and integration testing
- API documentation

## Technologies Used
### Backend
- Node.js (Express.js) - RESTful API development
- MongoDB 
- Mongoose - ODM for MongoDB
- JWT - Authentication
- Express Validator - Input validation

### Frontend
- React.js - UI development
- React Router - Client-side routing
- Axios - API requests
- Context API - State management

### Additional Tools
- Postman - API testing
- dotenv - Environment variable management
- Git/GitHub - Version control

## Setup Instructions
### Prerequisites
- Node.js 
- MongoDB 
- Git

### Backend Setup
1. Clone the repository:

   git clone https://github.com/anusha-2906/INU_TODO-LIST.git
   cd todo-app/backend

2. Install dependencies:

   npm install
   
  PORT=5000
   
3. Start the server:

   npm run dev

   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:

   cd ./frontend
   
2. Install dependencies:
   
   npm install
   
3. Start the development server:
   
   npm start

   The frontend will run on `http://localhost:3000`.

## API Endpoints
| Method | Endpoint                | Description            |
|--------|-------------------      |------------------------|
| POST   | /api/users/register     | Register a new user   |
| POST   | /api/users/login        | Login a user          |
| GET    | /api/tasks/gettasks     | Fetch user tasks      |
| POST   | /api/tasks/createtasks  | Create a task         |
| PUT    | /api/tasks/edittask/:id | Update a task         |
| DELETE | /api/tasks/deletetask/:id | Delete a task       |

## Development Process
1. **Backend Development:**
   - Set up Express server and MongoDB connection.
   - Created authentication using JWT and bcrypt.
   - Designed RESTful APIs for task management.
   - Implemented input validation and error handling.
   - Wrote unit tests for APIs.

2. Frontend Development:

     - Built reusable components and pages using React.
     - Implemented authentication and protected routes.
     - Used Redux/Context API for state management.
     - Designed UI with Tailwind CSS/Material UI.
     - Added testing using React Testing Library.


   => Tested API endpoints using Postman.

