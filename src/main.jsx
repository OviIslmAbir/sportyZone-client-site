import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './Layout/Main';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AuthProvider from './Provider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from './Provider/ThemeProvider';
import Instructors from './Pages/Instructors/Instructors';
import Classes from './Pages/Home/Classes/Classes';
import DashBoard from './Layout/DashBoard';
import MySelectedClass from './Pages/DashBoard/StudentDashboard/MySelectedClass';
import Payment from './Pages/DashBoard/StudentDashboard/Payment';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>
      },
      {
        path: "/classes",
        element: <Classes></Classes>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: 'selectedClass',
        element: <PrivateRoute><MySelectedClass></MySelectedClass></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
    ]
  }
]);
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
         <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
         </ThemeProvider>
      </AuthProvider>
  </React.StrictMode>,
)
