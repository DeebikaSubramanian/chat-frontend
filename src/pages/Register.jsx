import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/API';

function Register() {

    const navigate=useNavigate();

    const [values,setValues]=useState({username:"",email:"",password:"",confirmPassword:""})
    
    const toastOptions={
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        theme:"light"
    }


    function Change(e)
    {
        setValues({...values,[e.target.name]:e.target.value});
        // console.log(values)
    }

    function Validation()
    {
        const {password,confirmPassword,username,email}=values;
        if(password!==confirmPassword){
            toast.error("Password and ConfirmPassword are mismatch also cannot be empty",toastOptions);
            return false;
            }
            else if(username.length<3){
                toast.error("Username should not be empty and should be more than 3 characters",toastOptions);
                return false;
            }
            else if(password.length<8){
                toast.error("Password cannot be empty and should be equal to or more than 8 characters",toastOptions);
                return false;
            }
            else if(email==="")
            {
                toast.error("Email required",toastOptions);
                return false;
            }
    }

    async function submitOnClick(e)
    {
        e.preventDefault();
       if(Validation());
       {
           const {password,username,email}=values;
           const {data}=await axios.post(registerRoute,{username,email,password,});
           console.log(data.msg)
           if(data.status===false)
           {
               toast.error(data.msg,toastOptions)
           }
           if(data.status===true)
           {
               localStorage.setItem("just-chat",JSON.stringify(data.user));
               navigate('/')
           }
       };
    }

    useEffect(()=>{
        if(localStorage.getItem("just-chat"))
        {
            navigate('/')
        }
    },[])


  return (
    <>
    <FormContainer>
        <form onSubmit={(e)=>submitOnClick(e)}>
            <div className="brand">
                <img src={logo} alt=""/>
                <h1>Chat</h1>
            </div>
            <input type="text" placeholder="UserName" name="username" onChange={(e)=>Change(e)}/>
            <input type="email" placeholder="Email" name="email" onChange={(e)=>Change(e)}/>
            <input type="password" placeholder="Password" name="password" onChange={(e)=>Change(e)}/>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>Change(e)}/>
            <button type="submit">Create User</button>
            <span>Already Have an account?<Link to="/login">Login</Link></span>
        </form>
        </FormContainer>
        <ToastContainer/>
        </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #e64346;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #e64346;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #851d1b;
      outline: none;
    }
  }
  button {
    background-color: #e64346;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #851d1b;
      color:white;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register