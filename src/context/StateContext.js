import React,{useContext,createContext, useState,useEffect} from 'react'
import { toast, Toast } from 'react-hot-toast';
const context = createContext();
export const StateContext = ({children})=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0);
    const[totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    let foundproduct;
    let index;
 const onAdd = (product,quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity);
    setTotalQuantities ((prevtotalQuantites)=> prevtotalQuantites + quantity);
    if(checkProductInCart){
        const updatedCartitems = cartItems.map((cartProduct)=>{
            if(cartProduct._id === product._id) return{
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })
        setCartItems(updatedCartitems);
        
    }else{
        product.quantity = quantity;
        setCartItems([...cartItems,{...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)

 }

const onRemove = (product)=>{
    foundproduct =  cartItems.find((item) => item._id === product._id);
    const newcartItems = cartItems.filter((item) => item._id  !== product._id);
    setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundproduct.price * foundproduct.quantity);
    setTotalQuantities (prevtotalQuantites => prevtotalQuantites - foundproduct.quantity)
    setCartItems(newcartItems)
}


const toggleCartItemsQuantity =(id, value)=>{
  foundproduct = cartItems.find(  (item)=>  item._id === id);
  index = cartItems.findIndex((product)=> product._id === id);
  const newcartItems = cartItems.filter((item)=> item._id !== id)
  if(value === 'inc'){

    setCartItems([...newcartItems,{...foundproduct,quantity:foundproduct.quantity + 1}]);

    setTotalPrice((prevTotalprice) => prevTotalprice + foundproduct.price)
    setTotalQuantities(prevtotalQuantites => prevtotalQuantites + 1)

  } else if(value === 'dec'){
    if(foundproduct.quantity > 1){
        setCartItems([...newcartItems,{...foundproduct,quantity:foundproduct.quantity - 1}]);

        setTotalPrice((prevTotalprice) => prevTotalprice - foundproduct.price)
        setTotalQuantities(prevtotalQuantites => prevtotalQuantites - 1)
    }
  }

}

 const incQty = ()=>{
    setQty((prevQty)=> prevQty + 1);
 }

const decQty=()=>{
    setQty((prevQty)=>{
        if(prevQty - 1 < 1) return 1;
    return  prevQty - 1;
    })
}
  
    return(
        <context.Provider
         value = {{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemsQuantity,
            onRemove,
         }}
        >
            {children}
        </context.Provider>
    )
}

export const useStateContext = () => useContext(context);