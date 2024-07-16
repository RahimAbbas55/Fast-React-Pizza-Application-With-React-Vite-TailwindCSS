import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../UI/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const {
    username,
    status : addressStatus,
    position,
    address,
    error : errorAddress
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name:</label>
          <input
            type="text"
            name="customer"
            className="input w-full"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number:</label>
          <div className="flex-grow">
            <input type="tel" name="phone" className="input w-full" required />
          </div>
          {formErrors?.phone && (
            <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address:</label>
          <div className="flex-grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && (
            <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
              {errorAddress}
            </p>
          )}
          </div>
          {!position.latitude && !position.longitutde && (<span className="absolute right-[3px] z-50 top-[3px] sm:right-[5px] sm:top-[5px]">
            <Button
              type="small"
              disabled={isLoadingAddress}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get position
            </Button>
          </span>)}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-0"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={
            position.longitutde && position.latitude ? `${position.latitude},${position.longitutde}` : ''
          }/>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {" "}
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide correct phone number!";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
