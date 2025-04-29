import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
  const currency = '$';
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size){
      toast.error('Select Product Size');
      return
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }else{
        cartData[itemId][size] = 1;
      }
    }else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1;
    } 

    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`, {itemId, size}, {
          headers: {
            token
          }
        }) 
      } catch (err) {
        toast.error('Some error occured!!')
        console.log(err)
      }
    }

    setCartItems(cartData);
    toast.success("Product Added to Cart")
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (let item in cartItems){
      for(let size in cartItems[item]){
        try {
          if(cartItems[item][size] > 0){
            totalCount += cartItems[item][size];
          }
        } catch (error) {
          
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
      cartData[itemId][size] = quantity;
    }else {
      toast.error("Some Error Occured")
      return
    }

    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {itemId, size, quantity}, {
          headers: {
            token
          }
        })
      } catch (err) {
        toast.error('Some error occured!!')
        console.log(err)
      }
    }

    setCartItems(cartData)
  }

  const getCartAmount =  () => {
    let totalAmount = 0;

    for (let item in cartItems){
      let itemInfo = products.find(product => product._id === item)
      for (let size in cartItems[item]){
        try {
          if(cartItems[item][size] > 0){
            totalAmount += itemInfo.price * cartItems[item][size];
          }
        }catch (err) {
          toast.error("can't calculate Total");
          return
        }
      }
    }

    return totalAmount;
  }

  const getProductsData = async  () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products`)
      if(res.data.success){
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error('Some error occured!!')
      console.log(err)
    }
  }

  const getUserCart = async (token) => {
    try {
      console.log(token)
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: {
          token: token
        }
      })
      setCartItems(res.data.cartData)
    } catch (err) {
      toast.error('Some error occured!!')
      console.log(err)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && Cookies.get('token')) {
      setToken(Cookies.get('token'));
      getUserCart(Cookies.get('token'));
    }
  }, [])

  const value = {
    token,
    setToken,
    products,
    currency,
    deliveryFee,
    backendUrl,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    toast,
  }


  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider