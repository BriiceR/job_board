import React from 'react'


function HomePage() {
    
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", marginBottom: "4rem", marginTop: "-4rem"}}>
        <h1 style={{fontSize: "3rem", color: "white"}}>indead</h1>
        </div>
        <div>
            <button onClick={() => window.location.href = "/loginUsers"} style={{padding: "1rem", marginLeft: "-1rem"}}>Accès candidats</button>
            <button onClick={() => window.location.href = "/loginCompanies"} style={{padding: "1rem", backgroundColor: "#F24242", marginLeft: "1rem"}}>Accès entreprises</button>
        </div>
        </>
    )
}

export default HomePage