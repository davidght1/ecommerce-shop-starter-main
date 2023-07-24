import React, {createContext, useState, useEffect} from 'react';

//create context 
export const CartContext = createContext()

const CartProvider = ({children}) => {
  //cart state
  const [cart,setCart] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0)
  // total price state
  const [total,setTotal] = useState(0)

  useEffect(()=>{
    const total = cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount;
    },0)
    setTotal(total)
  })

  // update item amount
  useEffect(()=>{
    if(cart){
      const amount = cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount
      },0)
      setItemAmount(amount)
    }
  },[cart])

  // add to cart
  const addToCart = (product, id)=>{
    const newItem = {...product, amount: 1}
    //check if item is already in the cart
    const carItem = cart.find(item=>{
      return item.id === id
    })
    if(carItem){
      const newCart = [...cart].map((item)=>{
        if(item.id === id){
          return {...item, amount: carItem.amount + 1};
        }
        else{
          return item
        }
      });
      setCart(newCart)
    }
    else{
      setCart([...cart,newItem])
    }
  }
  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item =>{
      return item.id !== id
    })
    setCart(newCart)
  }

  // increase amount 
  const increaseAmount = (id)=> {
    const item = cart.find((item)=> item.id === id)
    addToCart(item,id)
  }

  // decrease amount
  const decreaseAmount = (id)=>{
    const carItem = cart.find((item)=> {
      return item.id === id;
    })
    if(carItem){
      const newCart = cart.map(item =>{
        if(item.id===id){
          return {...item, amount: carItem.amount -1}
        }else{
          return item
        }
      });
      setCart(newCart);
    }

      if(carItem.amount < 2){
        removeFromCart(id);
      }
    
  }

  // clear cart
  const clearCart = ()=> {
    setCart([])
  }

  return <CartContext.Provider value={{cart,addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total}}>{children}</CartContext.Provider>;
};

export default CartProvider;
