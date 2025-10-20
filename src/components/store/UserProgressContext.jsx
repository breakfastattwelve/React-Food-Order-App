import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress:'', // 'cart' , 'checkout', 'orderHistory'
    showCart:() => {},
    hideCart:() => {},
    showCheckout:() => {},
    hideCheckout:() => {},
    showOrderHistory:() => {},
    hideOrderHistory:() => {}
})

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('')

    function showCart(){
        setUserProgress('cart')
    }

    function hideCart(){
        setUserProgress('')
    }

    function showCheckout(){
        setUserProgress('checkout')
    }

    function hideCheckout(){
        setUserProgress('')
    }

    function showOrderHistory(){
        setUserProgress('orderHistory')
    }

    function hideOrderHistory(){
        setUserProgress('')
    }

    const userProgressCtx = {
        progress : userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showOrderHistory,
        hideOrderHistory
        
    }
    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext