"use client"
import { Course } from "@/config/schema";
import React from "react"
import { BookOpen, ChartNoAxesColumnIncreasing, ChartNoAxesColumnIncreasingIcon, Sparkles } from "lucide-react";


type Props={
    course?: Course ,
}

function CourseInfoCard({course}: Props){
    const courseLayout = typeof course?.courseLayout === "string" ? JSON.parse(course?.courseLayout) : course
    console.log(courseLayout)
    return (
        <div>
            <div className="p-20 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-2xl">
                <div>
                    <h2 className="flex gap-2 p-1 px-2 border rounded-xl inline-flex text-white border-gray-300/100"><Sparkles/>Course review</h2>
                    <h3 className="text-3xl font-bold text-white">{course?.courseName}</h3>
                    <p className="text-lg text-muted-foreground mt-2">{courseLayout?.courseDescription}</p>
                    <div className="mt-4 flex gap-5 text-gray-200">
                        <h2 className="px-3 p-2 border rounded-4xl inline-flex border-gray-300/100"><ChartNoAxesColumnIncreasingIcon className="text-blue-400"/>{courseLayout?.level}</h2>
                        <h2 className="px-3 p-2 border rounded-4xl inline-flex gap-2 border-gray-300/100"><BookOpen className="text-green-700"/>{courseLayout?.totalChapters} Chapters</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseInfoCard;