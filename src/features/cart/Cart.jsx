import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { getCart ,clearCart } from "./cartSlice";
import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import EmptyCart from './EmptyCart'

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch()

  if ( !cart.length ) return <EmptyCart/>

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, <span className="uppercase text-yellow-300">{username}</span>
      </h2>

      <ul className="divide-y divide-stone-900 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
