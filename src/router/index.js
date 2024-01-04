import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import New from "@/pages/New";
import { createBrowserRouter } from "react-router-dom";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                path:'/year',
                element:<Year />
            },
            {
                path:'/mouth',
                element:<Month />
            }
        ]
    },
    {
        path:'/new',
        element:<New />
    }
])
export default router