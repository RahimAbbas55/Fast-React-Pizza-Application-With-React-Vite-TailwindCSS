import { useDispatch } from "react-redux"
import { increaseItemQuantity , decreaseItemQuantity } from "./cartSlice"
import Button from "../../UI/Button"
// eslint-disable-next-line react/prop-types
function UpdateitemQuantity({pizzaId , currentQuantity}) {
    const dispatch = useDispatch()
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <span className="font-medium text-sm">{currentQuantity}</span>
            <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateitemQuantity
