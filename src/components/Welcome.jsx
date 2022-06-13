import React from "react";
import styled from "styled-components";
import welcome from "../images/welcome.gif"

export default function Welcome({currentUser})
{
    return(
<Container>
<img src={welcome} alt="Welcome"/>
<h1>Welcome,<span>{currentUser.username}!</span></h1>
<h3>Please select a chat to Start Messaging.</h3>

</Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color:#e64346;
  }
`;