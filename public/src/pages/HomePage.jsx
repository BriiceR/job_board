import React from 'react'
import { UserButton, CompanyButton } from '../utils/utils'


function HomePage() {
    
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", marginBottom: "4rem", marginTop: "-4rem"}}>
        <h1 style={{fontSize: "3rem", color: "white"}}>indead</h1>
        </div>
        <div>
            <UserButton onClick={() => window.location.href = "/loginUsers"} style={{padding: "1rem", marginLeft: "-1rem"}}>Accès candidats</UserButton>
            <CompanyButton onClick={() => window.location.href = "/loginCompanies"} style={{padding: "1rem", backgroundColor: "#F24242", marginLeft: "1rem"}}>Accès entreprises</CompanyButton>
        </div>
        </>
    )
}

export default HomePage