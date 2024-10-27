import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EmployeeGrid from "../features/customer/CustomerGrid";
import HomePage from "../features/home/HomePage";
import ContactPage from "../features/contact/ContactPage";
import CustomerForm from "../features/customer/CustomerForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/employee',
                element: <EmployeeGrid />
            },
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/edit/:id',
                element: <CustomerForm />
            },
            {
                path: '/add',
                element: <CustomerForm />
            }
        ]


    }
])