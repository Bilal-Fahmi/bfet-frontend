import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Divider,
  Button,
} from "@nextui-org/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiInstance } from "../../axiosInstance/Instance";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const handleOnSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("files", files[0]);
      formData.append("content", content);
      e.preventDefault();
      const res = await apiInstance.post(
        `/createBlog/${decodedToken?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success) {
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
    setContent("");
    setTitle("");
    setSummary("");
  };
  return (
    <div className=" p-5 mt-4 flex flex-row  w-full relative justify-center ">
      <h1 className="extrabold text-3xl absolute left-10 text-[#5AA17F]">
        Create
      </h1>
      <h1 className="extrabold text-3xl absolute left-36 text-[#FF793B]">
        Blog.
      </h1>
      <form onSubmit={handleOnSubmit}>
        <Card className="h-[600px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col w-full gap-2">
              <Input
                type="text"
                s
                placeholder="Title"
                className="light "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Summary"
                className="light"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Input
                type="file"
                className="light"
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <ReactQuill
              theme="snow"
              className="light h-[300px] w-[600px]"
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <Button type="submit" variant="flat" className="medium w-full">
              Create Blog
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
