import axios from 'axios';


export const verifyUser = async (cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail ) => {
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
            // console.log(data);
            if (!data.status) {
                removeCookie("jwt");
                navigate("/loginUsers");
            } else {
                setUserId(data.id);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setDiploma(data.diploma);
                setUserMail(data.user);
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

export const verifyCompany = async (cookies, navigate, removeCookie, toast, setCompanyId, setCompanyName, setCompanyMail) => {
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
                setCompanyId(data.id);
                setCompanyName(data.name);
                setCompanyMail(data.company);
                toast(`Hi ${data.company}`, {
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error verifying company:", error);
            removeCookie("jwt");
            navigate("/loginCompanies");
        }
    }
};

export const verifyAdmin = async (cookies, navigate, removeCookie, toast) => {
    if (!cookies.jwt) {
        navigate("/loginAdmin");
    } else {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/admin",
                {},
                {
                    withCredentials: true,
                }
            );
            // console.log(data);
            if (!data.status) {
                removeCookie("jwt");
                navigate("/loginAdmin");
            } else {
                toast(`Hi ${data.admin}`, {
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            removeCookie("jwt");
            navigate("/loginAdmin");
        }
    }
};

export const logOut = (removeCookie, navigate) => {
    removeCookie("jwt");
    navigate("/homePage");
};
