import React from 'react'
import homeIcon from '../assets/home.svg'
import styled from '@emotion/styled'

function HeaderLogin() {
    return (
        <DivIcon>
            <Icon src={homeIcon} alt="home" />
        </DivIcon>
    )
}

export default HeaderLogin

const DivIcon = styled.div`
display: flex;
justify-content: end;
`

const Icon = styled.img`
&:hover {
    cursor: pointer;
}
`