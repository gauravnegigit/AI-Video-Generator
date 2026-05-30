"use client"
import { Course } from "@/config/schema";
import React from "react"
import { Sparkles } from "lucide-react";

type Props={
    course: Course
}
function CourseInfoCard({course}: Props){
    return (
        <div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="flex gap-2 p-1 px-2 border rounded-xl inline-flex"><Sparkles/>Course review</h2>
                    <h3 className="text-3xl font-bold">{course?.courseName}</h3>
                    <p>{course?.courseLayout?.courseDescription}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseInfoCard;