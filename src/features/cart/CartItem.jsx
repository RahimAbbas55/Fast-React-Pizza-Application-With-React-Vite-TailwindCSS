import { formatCurrency } from "../../utilities/helpers";
import { useSelector } from "react-redux";
import { getCurrentQuantitybyID } from "./cartSlice";
import DeleteItem from "./deleteItem";
import UpdateitemQuantity from "./UpdateitemQuantity";
import { current } from "@reduxjs/toolkit";
// eslint-disable-next-line react/prop-types
function CartItem({ item }) {
  // eslint-disable-next-line react/prop-types
  const { pizzaId, name, quantity, totalPrice } = item;
  const currQuantity = useSelector( getCurrentQuantitybyID(pizzaId) )
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateitemQuantity pizzaId={pizzaId} currentQuantity={currQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
