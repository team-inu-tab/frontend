import React, {useState} from 'react';
import symbolLogo from '@assets/images/symbolLogo.svg';
import Circle from "@components/signin/circle.jsx";
import Container from "@components/signin/parentContainer.jsx";
import GoogleLogIn from '@components/common/googleLoginButton.jsx';
import { useNavigate } from "react-router-dom";
function Login() {
    return (
        <Container>
            <Circle>
                <GoogleLogIn></GoogleLogIn>
            </Circle>
        </Container>
    )
}

export default Login;