"use client"
import React, { useEffect , useState} from "react"
import CourseInfoCard from "./_components/CourseInfoCard"
import axios from "axios"
import { useParams } from 'next/navigation'
import {Course} from '@/type/CourseType'

function CoursePreview() {

    const {courseId} = useParams();
    const [courseDetail , setCourseDetail] = useState<Course>()

    useEffect(() => {
        courseId && GetCourseDetail();
    } , [courseId])

    const GetCourseDetail = async()=>{
        const result = await axios.get('/api/course?courseId='+ courseId)
        console.log(result.data);
        setCourseDetail(result.data);
    }
    return (
        <div>
            <CourseInfoCard course={courseDetail}/>
        </div>
    )
}

export default CoursePreview;