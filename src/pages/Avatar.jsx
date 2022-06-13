import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loading from "../images/loading.gif";
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {Buffer} from 'buffer'
import { avatarRoute } from '../utils/API';

function Avatar() {

    const api="https://api.multiavatar.com/456789";
    const navigate=useNavigate();
    const [avatar,setAvatar]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);

    const toastOptions={
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        theme:"light"
    }

    useEffect( ()=>{

        if(!localStorage.getItem("just-chat"))
        {
            navigate("/login")
        }


    },[])

    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined){
           
            toast.error("Please select an avatar",toastOptions);
         }
        else {
            
            const user = await JSON.parse(
              localStorage.getItem("just-chat")
            );
          console.log(user._id)
            const { data } = await axios.post(`${avatarRoute}/${user?._id}`, 
            {
              image: avatar[selectedAvatar],
            });
        
               console.log("hi"); 
            if (data.isSet) {
                console.log("hi")
              user.isAvatarImageSet = true;
              user.avatarImage = data.image;
              localStorage.setItem(
               "just-chat",
                JSON.stringify(user)
              );
              navigate("/");
            }
            else
            {
                toast.error("Error getting Avatar. Please try again",toastOptions);
            }

        }
    }

        useEffect(()=>{

            async function asyncfunction()
            {
                const data=[];
            
                for(let i=0;i<4;i++)
            {
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                const buffer=new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatar(data);
            setIsLoading(false);
        }
        asyncfunction();
        },[]);
    
  return (
      <>
      {
          isLoading?<Container>
              <img src={loading} alt="loading..." className="loader"/>
          </Container> : (<Container>
        <div className="title-container">
            <h1>Select an Avatar for your Profile Picture</h1>
            </div>
            <div className="avatars">
                {
                    avatar.map((avatar,index)=>{

                       return( 
                             
                            <div key={index} 
                            className={`avatar ${selectedAvatar===index? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="Avatar" onClick={()=>setSelectedAvatar(index)}/>
                            </div>
                         )
                    })
                }
            </div>
            
            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
            )
      }
    
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;

  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #e64346;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #e64346;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #e64346;
    }
  }
`;

export default Avatar