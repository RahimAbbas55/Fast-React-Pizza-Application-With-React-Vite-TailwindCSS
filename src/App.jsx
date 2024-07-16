//modules / libraries imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//JSX imports
import Home from './UI/Home'
import Menu , {Loader as menuLoader} from './features/menu/Menu'
import Cart from './features/cart/Cart'
import Order , {Loader as orderLoader} from './features/order/Order'
import CreateOrder , {action as createOrderAction } from './features/order/CreateOrder'
import Applayout from "./UI/Applayout"
import Error from './UI/Error'
import { action as UpdateAction } from "./features/order/UpdateOrder"

const router = createBrowserRouter([
  {
    element: <Applayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/menu',
        element: <Menu/>,
        errorElement: <Error/>,
        loader: menuLoader
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/order/new',
        element: <CreateOrder/>,
        action: createOrderAction
      },
      {
        path: '/order/:orderId',
        element: <Order/>,
        errorElement: <Error/>,
        loader: orderLoader,
        action : UpdateAction
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App