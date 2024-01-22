import React from 'react'
import { UserButton, CompanyButton, SuperContainer } from '../utils/utils'


function HomePage() {
    
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", paddingTop: "10rem"}}>
        <h1 style={{fontSize: "3rem", color: "white"}}>indead</h1>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "5rem"}}>
            <UserButton style={{padding: "1rem", marginLeft: "-1rem"}} onClick={() => window.location.href = "/loginUsers"}>Accès candidats</UserButton>
            <CompanyButton style={{padding: "1rem", marginLeft: "1rem"}} onClick={() => window.location.href = "/loginCompanies"}>Accès entreprises</CompanyButton>
        </div>
        </>
    )
}

export default HomePage