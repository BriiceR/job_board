import axios from 'axios';


export const verifyUser = async (cookies, navigate, removeCookie, toast) => {
    if (!cookies.jwt) {
        navigate("/loginUsers");
    } else {
        try {
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                {
                    withCredentials: true,
                }
            );
            if (!data.status) {
                removeCookie("jwt");
                navigate("/loginUsers");
            } else {
                toast(`Hi ${data.user}`, {
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            removeCookie("jwt");
            navigate("/loginUsers");
        }
    }
};

export const verifyCompany = async (cookies, navigate, removeCookie, toast) => {
    if (!cookies.jwt) {
        navigate("/loginCompanies");
    } else {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/companies",
                {},
                {
                    withCredentials: true,
                }
            );
            // console.log(data);
            if (!data.status) {
                removeCookie("jwt");
                navigate("/loginCompanies");
            } else {
                toast(`Hi ${data.company}`, {
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            removeCookie("jwt");
            navigate("/loginCompanies");
        }
    }
};

export const logOut = (removeCookie, navigate) => {
    removeCookie("jwt");
    navigate("/homePage");
};