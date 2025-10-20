import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart.jsx"
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";
import { OrderHistoryContextProvider } from "./components/store/OrderHistoryContext.jsx";
import OrderHistory from "./components/OrderHistory.jsx";

function App() {
  return (
    <OrderHistoryContextProvider>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout/>
          <OrderHistory />
        </CartContextProvider>
      </UserProgressContextProvider>
    </OrderHistoryContextProvider>
  );
}

export default App;
