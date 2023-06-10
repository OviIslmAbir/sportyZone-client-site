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
import DashHome from './Pages/DashBoard/DashHome';
import PaymentHistory from './Pages/DashBoard/StudentDashboard/PaymentHistory';
import MyEnrolledClass from './Pages/DashBoard/StudentDashboard/MyEnrolledClass';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import ManageUsers from './Pages/DashBoard/AdminDashBoard/ManageUsers';
import ManageClasses from './Pages/DashBoard/AdminDashBoard/ManageClasses';
import AdminRoute from './Routes/AdminRoute';
import AddAClass from './Pages/DashBoard/InstructorDashBoard/AddAClass';
import MyClasses from './Pages/DashBoard/InstructorDashBoard/MyClasses';
import InstructorRoute from './Routes/InstructorRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage/>, 
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
    // errorElement: <ErrorPage/>, 
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><DashHome></DashHome></PrivateRoute>
      },
      // student dashboard
      {
        path: 'selectedClass',
        element: <PrivateRoute><MySelectedClass></MySelectedClass></PrivateRoute>
      },
      {
        path: 'enrollClass',
        element: <PrivateRoute><MyEnrolledClass></MyEnrolledClass></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: 'paymentHistory',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
       // admin dashboard
      {
        path: 'allUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manageClasses',
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
       // instructor dashboard
      {
        path: 'addAClass',
        element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
      },
      {
        path: 'myClasses',
        element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
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
