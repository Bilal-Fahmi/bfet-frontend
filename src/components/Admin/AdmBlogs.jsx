import { useEffect, useState } from "react";
import { apiInstance } from "../../axiosInstance/Instance";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function AdmBlogs() {
  const [blogData, setBlogData] = useState([]);
  const [expName, setExpName] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fectchAuthor();
  }, [blogData]);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/admin/blogs");
      if (res.data?.blogs) {
        setBlogData(res.data.blogs);
      }
      if (!res) throw new Error("Blogs not found");
    } catch (error) {
      console.log(error);
    }
  };
  const fectchAuthor = async () => {
    try {
      const authorName = await Promise.all(
        blogData.map(async (blog) => {
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
  const handleBlock = async (blogId) => {
    try {
      const res = await apiInstance.post(`/admin/blog-block/${blogId}`);
      if (!res) throw new Error("Blog status no updated");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnblock = async (blogId) => {
    try {
      const res = await apiInstance.post(`/admin/blog-unblock/${blogId}`);
      if (!res) throw new Error("Blog status no updated");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClick = async (blogId) => {
    try {
      nav(`/blog/${blogId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const meta = (import.meta.env.VITE_REACT_APP_bdId);
  console.log(meta);
  return (
    <div className="flex flex-row mr-auto p-10">
      <h1 className="extrabold pr-10 text-2xl">Blogs.</h1>
      <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-5 lg:gap-10">
        {blogData.map((blog, index) => (
          <Card
            className=" w-[300px] h-[250px]  "
            shadow="sm"
            key={index}
            isPressable
            onPress={() => handleOnClick(blog._id)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isZoomed
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover h-[140px]"
                src={`${import.meta.env.VITE_REACT_APP_bdId+"/uploads/"+blog?.coverImg}`}
                // src={import.meta.env.VITE_REACT_APP_bdId +`/uploads/${blog?.coverImg}`}
              />
            </CardBody>
            <CardFooter className="grid ">
              <div className="flex justify-between p">
                <p className="semibold">{blog.title}</p>
              </div>
              <div className="flex justify-between">
                <p className="light pt-2">
                  {format(new Date(blog.createdAt), "MMM d,yyy hh:mm a")}
                </p>
                {blog.isBlock === false ? (
                  <Button
                    className="light text-white bg-red-600 "
                    onPress={onOpen}
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    className="light text-white bg-green-500"
                    onPress={onOpen}
                  >
                    Unblock
                  </Button>
                )}

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1 semibold">
                          Blog Status
                        </ModalHeader>
                        <ModalBody className="light">
                          <p>Do you want to change the status of the blog?</p>
                        </ModalBody>
                        <ModalFooter className="light">
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>

                          {blog.isBlock === false ? (
                            <Button
                              className="light text-white bg-red-600"
                              onClick={() => handleBlock(blog._id)}
                            >
                              Block
                            </Button>
                          ) : (
                            <Button
                              className="light text-white bg-green-500"
                              onClick={() => handleUnblock(blog._id)}
                            >
                              Unblock
                            </Button>
                          )}
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </CardFooter>
            <CardFooter className="p-1 justify-end">
              <h1 className="pr-3 light text-small text-slate-400 ">
                by {expName[index]}
              </h1>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
