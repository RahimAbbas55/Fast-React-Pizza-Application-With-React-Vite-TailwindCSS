import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from './MenuItem'

export default function Menu() {
  const menu = useLoaderData()
  return (
    <ul className=" divide-stone-900 px-2">
      {
        menu.map((pizza) => (
          (<MenuItem pizza={pizza} key={pizza.id} />)
        ))
      }
    </ul>
  )
}

export async function Loader(){
  const menu = await getMenu()
  return menu
}