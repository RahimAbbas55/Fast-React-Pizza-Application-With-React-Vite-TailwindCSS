import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";
function CartOverview() {
  const username = useSelector(state => state.user.username)
  const cartQuantity = useSelector( getTotalCartQuantity )
  const cartPrice = useSelector( getTotalCartPrice )

  if( !cartQuantity ) return null

  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{cartQuantity}</span>
        <span>${formatCurrency(cartPrice)}</span>
      </p>
      {username !== '' ? <Link to='/cart'>Open cart &rarr;</Link> : ''}
    </div>
  );
}

export default CartOverview;
