import { useEffect, useState } from "react";
import { apiInstance } from "../../axiosInstance/Instance";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Function to truncate text and add "..." after a certain length
const turncatText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};
export default function Blogs() {
  const [blog, setBlog] = useState([]);
  const nav = useNavigate("");
  const handleOnClick = (_id) => {
    try {
      nav(`/blog/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/view-blogs");
      if (res.data.blogs) {
        setBlog(res.data.blogs);
      } else {
        throw new Error("Blogs not available");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row mt-5 ">
      {blog.map((blog, index) => (
        <Card
          className=" w-[300px] h-[250px] ml-4 "
          key={index}
          shadow="sm"
          isPressable
          onPress={() => handleOnClick(blog._id)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              alt={blog.title}
              className="w-full object-cover h-[140px]"
              src={`${import.meta.env.VITE_REACT_APP_bdId}/uploads/${
                blog?.coverImg
              }`}
            />
          </CardBody>
          <CardFooter className="text-small medium justify-between">
            <b>{blog.title}</b>
            <p className="text-default-500 light">
              {format(new Date(blog.createdAt), "MMM d,yyyy HH:mm")}
            </p>
          </CardFooter>
          <CardFooter>
            <p className="light text-small flex-col">
              {turncatText(blog.summary, 100)}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
