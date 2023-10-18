import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { apiInstance } from "../../axiosInstance/Instance";

function Index() {
  const [blogs, setBlogs] = useState([]);
  const [expName, setExpName] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchAuthor();
  }, [blogs]);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/view-blogs");
      if (res.data.blogs) {
        setBlogs(res.data.blogs);
      } else {
        throw new Error("Blogs not available");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAuthor = async () => {
    try {
      const authorName = await Promise.all(
        blogs.map(async (blog) => {
          const author = await apiInstance.get(`/expert-name/${blog.author}`);
          if (author.data?.expert.name) {
            return author.data?.expert.name;
          }
        })
      );
      setExpName(authorName);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to truncate text and add "..." after a certain length
  const turncatText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  const handleLoadMore = () => {
    nav("/blogs")
    };
    const handleOnClick = (_id) => {
        try {
          nav(`/blog/${_id}`);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="w-full">
      <h1 className="text-lg text-center extrabold mt-5 mb-5">Master Mind & Body.</h1>
      <div className="grid grid-cols-2 h-80">
        <Link
          to="/mind/fitmind"
          className="text-white flex items-center justify-center  text-4xl extrabold"
          style={{
            background:
              "linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(/pic/fitmind.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          Fit Mind
        </Link>

        <Link
          to="/body/fitbody"
          className="text-white flex items-center justify-center text-center text-4xl extrabold"
          style={{
            background:
              "linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/pic/fitbody.jpg) ",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          Fit Body
        </Link>
      </div>
          {blogs && (
              <div className="p-5 pl-10">
                  <h1 className=" pb-3 extrabold text-2xl">Blogs.</h1>
                  <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-5 lg:gap-14">
                      {blogs.slice(0,3).map((blog, index) => (
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
                      {blogs.length>4 && (
                          <div className="pt-24 pl-24">
                              <Button
                                  className="text-white bg-black text-4xl pb-2"
                                  variant="flat"
                                  onClick={handleLoadMore}
                              >
                                  →
                              </Button>
                          </div>
                      )}
                  </div>
              </div>
          )}
    </div>
  );
}

export default Index;
