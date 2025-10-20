import { createContext, useReducer } from "react";

// 1.สร้าง creatContext
export const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart:() => {}
})

// 5.สร้าง Reducer Function
function cartReducer(state, action){

    switch(action.type) {
        case 'ADD_ITEM':
        const updatedItems = [...state.items]

        const existingItemIndex = updatedItems.findIndex(item => item.id === action.payload.id) //0
        if (existingItemIndex > -1) {
            //ADD NEW ITEM
            const existingItem = updatedItems[existingItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingItemIndex] = updatedItem
          }else {
            // กรณีถ้าไม่มีก็ เพิ่มข้อมูลใหม่
            updatedItems.push({
              ...action.payload,
              quantity: 1  
            })
          }
            return { ...state ,items: updatedItems, }

        case 'REMOVE_ITEM':
            const updatedRemoveItems = [...state.items]
            const existingRemoveItemIndex = updatedRemoveItems.findIndex(item => item.id === action.payload)

            const existingItem = updatedRemoveItems[existingRemoveItemIndex]
        
            if(existingItem.quantity > 1){
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1
                }
                updatedRemoveItems[existingRemoveItemIndex] = updatedItem
            }else{
                updatedRemoveItems.splice(existingRemoveItemIndex, 1)
            }
            return {  ...state, items: updatedRemoveItems }
        case 'CLEAR_CART':
            return { ...state, items: [] }
        default:
            return state
    }
}

// 2.สร้าง Provider Component
export function CartContextProvider({ children }){
   // children คือ components ที่จะถูก wrap โดย Provider

   // 4.สร้าง useReducer
   const [cartState, dispatch] = useReducer(
    cartReducer, // reducer function
    { items: [] } // initial State

)

// 6.สร้าง function ใช้งานจริง (Helper function)
function addItem(meal){
    dispatch({
        type: 'ADD_ITEM',
        payload: meal
    })
}

function removeItem(id) {
    dispatch({
        type: 'REMOVE_ITEM',
        payload: id
    })
}

function clearCart() {
    dispatch({type: 'CLEAR_CART'})
}


// 7.สร้าง context value

const cartContext = {
    items: cartState.items,     // ข้อมูลจาก state
    addItem: addItem,           // function ที่สร้างไว้
    removeItem: removeItem,
    clearCart
  }

// 3.Return Provider
    return (
        <CartContext.Provider value={cartContext}>
        {children}
        </CartContext.Provider>
    )
}
