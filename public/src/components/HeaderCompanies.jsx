import React from 'react'
import styled from '@emotion/styled'
import { Logo, colors } from '../utils/utils'

function HeaderCompanies( { OnClick } ) {
    
    return (
        <DivIcon>
            <Logo onClick={() => window.location.href = "/company"}>indead</Logo>
            <div style={{display: "flex", alignItems: "center"}}>
                <LinkHeader onClick={() => window.location.href = "/company/profil"}>Profil</LinkHeader>
                <LinkHeader onClick={() => window.location.href = "/company/jobs"}>Mes Annonces</LinkHeader>
                <Logout onClick={OnClick}>Déconnexion</Logout>
            </div>
        </DivIcon>
    )
}

export default HeaderCompanies

const DivIcon = styled.div`
padding: 1rem 1rem 1rem 1rem;
display: flex;
justify-content: space-between;
`

const Logout = styled.h2`
color: ${colors.tertiary};
border: 1px solid ${colors.tertiary};
border-radius: 0.3rem;
padding: 0.5rem;
&:hover {
    cursor: pointer;
}
`

export const LinkHeader = styled.h3`
color: ${colors.primary};
text-decoration: underline;
margin-right: 1rem;
&:hover {
    cursor: pointer;
}
`
