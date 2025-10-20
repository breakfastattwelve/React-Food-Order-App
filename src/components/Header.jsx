import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import { BsCartCheckFill } from "react-icons/bs";
import { MdHistory } from "react-icons/md";

function Header() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItem,item)=>{
    return totalNumberOfItem + item.quantity
  },0)

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  function handleShowOrderHistory(){
    userProgressCtx.showOrderHistory();
  }
  
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="A restaurant" />
        <h1>Bite Avenue😋</h1>
      </div>
      <nav>
        <span style={{ display: "inline-flex", alignItems: "center", marginRight: "18px" }}>
          <MdHistory style={{ color: "#ffc404", fontSize: "25px", marginRight: "5px" }}/>
          <Button textOnly onClick={handleShowOrderHistory}>ประวัติ</Button>
        </span>
        <BsCartCheckFill style={{ color: "#ffc404", fontSize: "25px", marginRight: "5px" }}/>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
