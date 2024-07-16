import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from "../../utilities/helpers";
import { addItem , getCurrentQuantitybyID} from '../cart/cartSlice';
import Button from "../../UI/Button";
import DeleteItem from '../cart/deleteItem';
import UpdateitemQuantity from '../cart/UpdateitemQuantity';
// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  const dispatch = useDispatch()
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currQuantity = useSelector( getCurrentQuantitybyID(id) )
  const isInCart = currQuantity > 0
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2 mt-0.5">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col flex-grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && 
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateitemQuantity pizzaId={id} currentQuantity={currQuantity}/>
              <DeleteItem pizzaId={id}/>
            </div>
          
          }
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
