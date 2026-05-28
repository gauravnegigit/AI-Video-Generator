"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
    const {user} = useUser();
    return(
        <div className="flex items-center justify-between py-4 px-8">
            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <span className="text-xl font-bold">GenCourse</span>
            </div>
            <ul className="flex gap-8 items-center">
                <li className="text-lg hover:text-blue-600 cursor-pointer font-medium">Home</li>
                <li className="text-lg hover:text-blue-600 cursor-pointer font-medium">Pricing</li>
            </ul>

            {user?
            <UserButton/>:
            <SignInButton mode = "modal">
                <Button className="text-lg border hover:bg-blue-700 cursor-pointer">Get Started</Button>
            </SignInButton>
            }
        </div>
    )

}

export default Header;