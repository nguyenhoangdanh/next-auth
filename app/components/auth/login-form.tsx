import React from 'react'
import { CardWrapper } from './card-wrapper'

const LoginForm = () => {
    return (
        <CardWrapper
        headerLabel='Welcome back!'
        backButtonLabel='Do not have an account!'
        backButtonHref='/auth/register'
        showSocial
        >
            LoginForm
        </CardWrapper>
    )
}

export default LoginForm