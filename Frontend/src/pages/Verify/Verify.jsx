import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    // console.log(success, orderId);
    const {url, token} = useContext(StoreContext)

    const verifyPayment = async(req,res)=>{
        const response = await axios.post(url+"/api/order/verify", {success, orderId}, {headers: { Authorization: `Bearer ${token}` }} )
        
        if(response.data.success){
           navigate('/myorders')
        }
        else{
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])
    
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
