import { useEffect, useState } from "react";
import { apiInstance } from "../../../axiosInstance/Instance";
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
  const [expName, setExpName] = useState([]);
  const nav = useNavigate("");
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fectchAuthor();
  }, [blog]);
  const handleOnClick = (_id) => {
    try {
      nav(`/blog/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };
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
  const fectchAuthor = async () => {
    try {
      const authorName = await Promise.all(
        blog.map(async (blog) => {
          const author = await apiInstance.get(`/expert-name/${blog.author}`);
          if (author.data.expert.name) {
            return author.data?.expert.name;
          }
        })
      );
      setExpName(authorName);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-row mr-auto p-10">
      <h1 className="extrabold pr-10 text-2xl">Blogs.</h1>
      <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-5 lg:gap-10">
        {blog.map((blog, index) => (
          <Card
            className=" w-[300px] h-[250px]  "
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
                src={blog?.coverImg}
              />
            </CardBody>
            <CardFooter className="text-small medium justify-between">
              <b>{blog.title}</b>
              <p className="text-default-500 light">
                {format(new Date(blog.createdAt), "MMM d,yyyy hh:mm a")}
              </p>
            </CardFooter>
            <CardFooter>
              <p className="light text-small ">
                {turncatText(blog.summary, 100)}
              </p>
            </CardFooter>
            <CardFooter className="justify-end">
              <p className="  light text-small text-slate-400">
                by {expName[index]}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
