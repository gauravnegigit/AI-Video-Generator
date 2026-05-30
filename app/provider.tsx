"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import Header from "./_components/Header";

function Provider({ children }: { children: React.ReactNode }) {

    const [userDetail , setUserDetail] = React.useState(null);

    useEffect(() => {
        CreateNewUser();
    }, []);

    const CreateNewUser = async () => {
        // user api endpoint call to create a new user
        const result = await axios.post('/api/user');
        console.log(result.data);
        setUserDetail(result.data);
    };
    return (
    <div>
        <UserDetailContext.Provider value={{ userDetail , setUserDetail }}>
            <Header/>
            {children}
        </UserDetailContext.Provider>
    </div>
    ) 
}

export default Provider;