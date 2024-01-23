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

export const logOut = (removeCookie, navigate) => {
    removeCookie("jwt");
    navigate("/homePage");
};
