import React from 'react'
import './Orders.css'
import { useContext } from 'react'
import { StoreContext } from '../../../../Frontend/src/Context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios(url+'/api/order/list')
      if (response.data.success) {
        setOrders(response.data.data)
        console.log(response.data.data);
        
      } else {
        toast.error('Failed to fetch orders')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Something went wrong!');
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async(event, orderId)=>{
    // console.log(orderId,event );
    const response = await axios.post(url+'/api/order/status' , {orderId , status : event.target.value} )

    if(response.data.success){
      await fetchOrders()
    }
    
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index)=>{
            return (
              <div className='order-item' key={index}>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item, index)=>{
                      if(index === order.items.length-1){
                        return item.name+" x "+ item.quantity
                      }
                      else{
                        return item.name+" x "+ item.quantity + ", "
                      }
                    })}
                  </p>
                  <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                  <div className='order-item-address'>
                      <p>{order.address.street+" "}</p>
                      <p>{order.address.city+", "+order.address.state+", "+order.address.country+","+order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                 
                </div>
                <p>Items :{order.items.length}</p>
                <p>Amount : {order.amount}</p>
                <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delievery">Out for delievery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders
