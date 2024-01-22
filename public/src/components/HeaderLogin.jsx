import React from 'react'
import homeIcon from '../assets/home.svg'
import styled from '@emotion/styled'
import { Logo } from '../utils/utils'

function HeaderLogin() {
    return (
        <DivIcon>
            <Logo>indead</Logo>
            <Icon src={homeIcon} alt="home" onClick={() => window.location.href = "/homePage"} />
        </DivIcon>
    )
}

export default HeaderLogin

const DivIcon = styled.div`
padding: 1rem 1rem 5rem 1rem;
display: flex;
justify-content: space-between;
`

const Icon = styled.img`
&:hover {
    cursor: pointer;
}
`

