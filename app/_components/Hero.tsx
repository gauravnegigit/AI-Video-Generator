"use client";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Loader2, Send } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VIDEO_SUGGESTIONS } from "@/data/constant";
import axios from "axios";
import { toast } from "sonner";

function Hero(){

    const [userInput, setUserInput] = useState("");
    const [type , setType] = useState("full-course");
    const [loading, setLoading] = useState(false);
    const {user} = useUser();

    const GenerateCourseLayout = async () => {
      setLoading(true);
      const toastId = toast.loading("Generating course layout...");

      const result = await axios.post("/api/generate-course-layout", {
        userInput,
        type
      });
      console.log(result.data);

      setLoading(false);
      toast.success("Course layout generated successfully!", { id: toastId });
    }

    return(
        <div className="flex flex-col items-center justify-center text-center mt-20 gap-6">
            <div>
                <h1 className="text-3xl font-bold mb-4">Learn Smarter with <span className="text-blue-700">AI Video Courses</span> </h1>
                <p className="text-lg text-gray-600">Turn Any Topic into an Engaging Video Course</p>
            </div>
            <div className="grid w-full max-w-sm gap-6">
      <InputGroup className="bg-[#fff]">
        <InputGroupTextarea
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-24 w-full resize-none rounded-xl bg-[#fff] px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Enter your topic..."
          value = {userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Full Course" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="full-course">Full Course</SelectItem>
                <SelectItem value="quick-explain">Quick Explain Video</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select> 

          {user?
            <InputGroupButton className="ml-auto bg-blue-600 hover:bg-blue-700 cursor-pointer" size="sm" variant="default" onClick={GenerateCourseLayout} disabled={loading}>
              {loading?<Loader2 className="animate-spin" />:<Send />} 
            </InputGroupButton>
            : <SignInButton mode = "modal">
              <InputGroupButton className="ml-auto bg-blue-600 hover:bg-blue-700 cursor-pointer" size="sm" variant="default">
                <Send />
              </InputGroupButton>
            </SignInButton>
          }
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div className="flex gap-5 mt-5 max-w-3xl flex-wrap justify-center">
        {VIDEO_SUGGESTIONS.map((suggestion ,index) => (
            
            <h3 key = {index} onClick = {() => setUserInput(suggestion?.prompt)} className="border rounded-2xl px-4 py-2 text-sm bg-gray-50 hover:bg-gray-200 cursor-pointer">
                {suggestion.title}
            </h3>

        ))}
    </div>
        </div>
    )
}

export default Hero;