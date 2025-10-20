import { useContext, useActionState, useRef } from "react";
import Modal from "./UI/Modal.jsx";
import { CartContext } from "./store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import { OrderHistoryContext } from "./store/OrderHistoryContext.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const orderHistoryCtx = useContext(OrderHistoryContext);
  const customerDataRef = useRef({});

  const {
    data,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function hanldeFinish() {
    // บันทึกประวัติการสั่งซื้อก่อนล้างข้อมูล
    if (customerDataRef.current.items && customerDataRef.current.customer) {
      orderHistoryCtx.addOrder(customerDataRef.current);
    }
    
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
    customerDataRef.current = {}; // ล้างข้อมูลที่เก็บไว้
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries()); // { email : test@example.com }
    
    // เก็บข้อมูลลูกค้าไว้ใน ref เพื่อใช้บันทึกประวัติ
    customerDataRef.current = {
      items: [...cartCtx.items],
      customer: customerData
    };

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null)

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={hanldeFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more detials via email within the next few minutes.</p>
        <p className="modal-actions">
            <Button onClick={hanldeFinish}>Okay</Button>
        </p>
    </Modal>
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input type="text" label="Full Name" id="name" />
        <Input type="email" label="E-Mail Address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal Code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}



        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
