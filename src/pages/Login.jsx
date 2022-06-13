import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/API';

function Login() {

    const navigate=useNavigate();

    const [values,setValues]=useState({email:"",password:""})
    
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
        const {password,email}=values;
        if(password===""){
            toast.error("Password cannot be empty",toastOptions);
            return false;
        }
            else if(email===""){
                toast.error("Email cannot be empty",toastOptions);
                return false;
            }
           return true;
       }

    async function submitOnClick(e)
    {
        e.preventDefault();
       if(Validation());
       {
           const {password,email}=values;
           const {data}=await axios.post(loginRoute,{email,password,});
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
            {/* <input type="text" placeholder="UserName" name="username" onChange={(e)=>Change(e)}/> */}
            <input type="email" placeholder="Email" name="email" onChange={(e)=>Change(e)}/>
            <input type="password" placeholder="Password" name="password" onChange={(e)=>Change(e)}/>
            {/* <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>Change(e)}/> */}
            <button type="submit">Login</button>
            <span>Don't you have an account?<Link to="/register">Register</Link></span>
        </form>
        <div className="sample">
          <p><u>Sample Crendentials</u></p>
          <p>UserName: karthish@gmail.com</p>
          <p>Password:12345678</p>
        </div>
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

export default Login