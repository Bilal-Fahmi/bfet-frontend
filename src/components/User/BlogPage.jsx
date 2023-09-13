import { useEffect, useState } from "react"
import { apiInstance } from "../../axiosInstance/Instance"
import { useParams } from "react-router-dom"
import { Image } from "@nextui-org/react"
import { formatISO9075 } from 'date-fns'

export default function BlogPage() {
    const [BlogData, setBlogData] = useState()
    const { id } = useParams()
    useEffect(() => {
        fetchData()
    },[id])
    const fetchData = async () => {
        try {
            const res = await apiInstance.get(`/blog/${id}`)
            if (res.data) {
                setBlogData(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1 className="text-4xl semibold mt-5">{BlogData?.blog.title}</h1>
            <p className="text-default-500 light">{console.log(BlogData?.blog.createdAt)}</p>
            {/* <time>
                {formatISO9075(new Date(BlogData?.blog.createdAt))}
</time> */}
            <p>{`by ${BlogData?.blog.author}` }</p>
            <Image
                src={`${import.meta.env.VITE_REACT_APP_bdId}/uploads/${BlogData?.blog.coverImg}`}
                width={650}
                className="mt-5 mb-5"
            />
            <div
                className="light text-xl mt-4"
                dangerouslySetInnerHTML={{ __html: BlogData?.blog.content }}></div>
        </div>
    )
}