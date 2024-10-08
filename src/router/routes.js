import Favourites from "../pages/Favourites";
import Main from "../pages/Main";
import Orders from "../pages/Orders"

export const routes = [
    {path: '/favourites', element: Favourites, exact: true},
    {path: '/main', element: Main, exact: true},
    {path: '/orders', element: Orders, exact: true},
]