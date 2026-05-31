import { Card, CardTitle , CardHeader , CardContent } from "@/components/ui/card";
import { Course } from "@/config/schema";
import { Dot } from "lucide-react";
import React from "react";
import { Player } from "@/remotion/player" ;

type Props={
    course:Course
}

export default function CourseChapters({course} : Props){
    const courseLayout = typeof course?.courseLayout === "string" ? JSON.parse(course?.courseLayout) : course
    return(
        <div className="mt-10 mb-10 max-w-6xl mt-2 p-10 rounded-4xl border shadow-lg w-full">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-xl">Course preview</h2>
                <h2 className="text-sm text-muted-foreground"> Chapters and Short Preview</h2>
            </div>   
            <div>
                {courseLayout?.chapters.map((chapter , index) => (
                    <Card className="mb-5">
                        <CardHeader>
                            <div className="flex gap-3 items-center" key={index}>
                                <h2 className="p-2 bg-blue-400/40 inline-flex h-10 w-10 text-center font-bold justify-center rounded-3xl">{index + 1}</h2>
                                <CardTitle className="md: text-lg font-bold">
                                    {chapter.chapterTitle}
                                </CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    {chapter?.subContent.map((content , index)=>(
                                        <div className="flex gap-2 items-center mb-1" key={index}>
                                            <Dot className="mt-1 h-5 w-5 text-primary"/>
                                            <h2 className="">{content}</h2>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <Player/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}