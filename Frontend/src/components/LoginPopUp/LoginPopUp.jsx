import React, {  useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopUp.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

  const {url, token, setToken} = useContext(StoreContext)
  

    const [currState, setCurrState] = useState('Login')
    const [data, setData] = useState({
      name : "",
      email: "",
      password : ""
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value

      setData((data=>({...data, [name] : value})))
    }

    const onLogin = async (event)=>{
      event.preventDefault();


        let newUrl = url;
        if(currState === "Login"){
          newUrl += "/api/user/login"
        }
        else{
          newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
          setToken(response.data.token)

          localStorage.setItem("token", response.data.token)

          setShowLogin(false)
        }
        else{
          alert(response.data.message)
        }
    }

    

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-con' action="" method='post'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
            {currState==="Login" ? <> </> :  <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            
            <input type="email" onChange={onChangeHandler} value={data.email} name='email'  placeholder='Enter your email' required/>
            <input type="password" onChange={onChangeHandler} name='password' value={data.password} placeholder='Enter your password' required/>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"? <p onClick={()=>setCurrState("Sign Up")}>Create a new Account? <span>Click here</span></p> :  <p onClick={()=>setCurrState("Login")}>Already Have an account? <span>Login</span></p>}

      </form>
    </div>
  )
}

export default LoginPopUp
