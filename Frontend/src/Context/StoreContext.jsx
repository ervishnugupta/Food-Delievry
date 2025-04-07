import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext  = createContext(null)
import axios from 'axios'

const StoreContextProvider = (props)=>{

    const [cartItems, setCartItems] = useState({})
    const url = import.meta.env.VITE_BASE_URL
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);



    

    const addToCart = async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId] : prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+'/api/cart/add', {itemId}, { headers: { Authorization: `Bearer ${token}` } })
        }
    }

    const removeFormCart = async(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId] : prev[itemId]-1}))

        if(token){
            await axios.post(url+'/api/cart/remove', {itemId}, { headers: { Authorization: `Bearer ${token}` } })
        }
    }


    // useEffect(()=>{
    //     console.log(cartItems);
        
    // }, [cartItems])

   

    const getTotalCartAmount = ()=>{
        if (loading) return 0; // skip until data is ready
        let totalAmount = 0;


        for(const item in cartItems){

            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=> product._id.toString() === item.toString());
            
    
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item ID ${item} not found in food_list`);
                }
            }
           
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+'/api/cart/get',{}, { headers: { Authorization: `Bearer ${token}` } })

        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        async function loadData(params) {
            // await fetchFoodList();
            // if(localStorage.getItem("token")){
            //     setToken(localStorage.getItem("token"))
            //     await loadCartData(localStorage.getItem("token"))
            // }

            setLoading(true); // start loading

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
    
            await fetchFoodList();
            setLoading(false); // done loading
        }

        loadData();

    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFormCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        showLogin,
        setShowLogin
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider