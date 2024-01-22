import React from 'react'
import styled from '@emotion/styled'

export const colors = {
    primary: '#FFFFFF',
    secondary: '#5062ff',
    tertiary: '#F24242',
    dark: '#000000',
    background: '#F4F4F4',

    text_dark: '#000000',
    text_light: '#FFFFFF',
    text_blue: '#5062ff',
    text_red: '#F24242',
};

export const ContainerUser = styled.div`
background-color: white;
padding: 1rem 3rem;
padding-bottom: 2rem;
border-radius: 0.5rem;
border-top: #5062ff 0.5rem solid;
`

export const ContainerCompanies = styled.div`
background-color: white;
padding: 1rem 3rem;
padding-bottom: 2rem;
border-radius: 0.5rem;
border-top: #F24242 0.5rem solid;
`

export const ContainerAdmin = styled.div`
background-color: white;
padding: 1rem 3rem;
padding-bottom: 2rem;
border-radius: 0.5rem;
border-top: #525050 0.5rem solid;
`

export const TitleForm = styled.h2`
margin: 1rem 0;
`

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 1.4rem;
`

export const DivForm = styled.div`
display: flex;
flex-direction: column;
gap: 0.3rem;
`

export const InputForm = styled.input`
padding: 0.5rem;
border-radius: 0.3rem;
border: 1px solid gray;
font-size: 1.1rem;
`

export const UserButton = styled.button`
background-color: #5062ff;
color: white;
border: none;
padding: 0.5rem;
font-size: 1rem;
text-transform: uppercase;
cursor: pointer;
border-radius: 0.3rem;
`

export const CompanyButton = styled.button`
background-color: #F24242;
color: white;
border: none;
padding: 0.5rem;
font-size: 1rem;
text-transform: uppercase;
cursor: pointer;
border-radius: 0.3rem;
`

export const AdminButton = styled.button`
background-color: #525050;
color: white;
border: none;
padding: 0.5rem;
font-size: 1rem;
text-transform: uppercase;
cursor: pointer;
border-radius: 0.3rem;
`

export const SuperContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const Logo = styled.h2`
color: ${colors.primary};
&:hover {
    cursor: pointer;
}
`