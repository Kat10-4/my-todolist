# React TodoList App with WordPress Backend

A modern, full-stack TodoList application built with React TypeScript, Material-UI, and WordPress REST API with JWT authentication.

## 🚀 Features

- ✅ **User Authentication** - JWT-based login/logout with WordPress
- ✅ **Todo Management** - Create, read, update, and delete todo lists and tasks
- ✅ **User Isolation** - Each user sees only their own lists
- ✅ **Responsive Design** - Built with Material-UI for all screen sizes
- ✅ **Real-time Updates** - Instant UI updates with Redux state management
- ✅ **Session Management** - Remember me functionality with localStorage/sessionStorage
- ✅ **Host User Cleanup** - Automatic list cleanup for demo "host" user

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Hook Form** for form handling
- **Axios** for API calls

### Backend
- **WordPress** with custom REST API endpoints
- **JWT Authentication** for secure login
- **Custom Post Type** for todo lists
- **ACF** for custom fields

## 🏗 Project Structure
src/
├── app/                # Redux store configuration
├── common/             # Shared utilities, types, components, custom hooks, Material UI theme, routing
├── features/
│   ├── auth/           # Authentication slice, API and components
│   └── todolists/      # Todo lists slice, API and components
└── assets/             # Google Fonts


## 📦 Installation

### Prerequisites
- Node.js 16+ 
- WordPress 6.0+ with JWT Authentication plugin
- PHP 7.4+

### Frontend Setup
# Clone the repository
git clone [your-repo-url]
cd my-todolist
# Install dependencies
npm install

##🤝 Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

##🆘 Support
For technical support or access requests:
Email: diachenko.k.v@gmail.com
Create an issue in the GitHub repository

##🙏 Acknowledgments
WordPress REST API team
Material-UI component library
Redux Toolkit for simplified state management
