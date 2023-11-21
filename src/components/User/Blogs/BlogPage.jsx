import { useEffect, useState } from "react";
import { apiInstance } from "../../../axiosInstance/Instance";
import { useParams } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { format, parseISO } from "date-fns";

export default function BlogPage() {
  const [BlogData, setBlogData] = useState();
  const [expName, setExpName] = useState();
  const [date, setDate] = useState();

  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await apiInstance.get(`/blog/${id}`);
      if (res.data) {
      }
      setBlogData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const author_id = BlogData?.blog.author;
  useEffect(() => {
    fetchauthor();
  }, [author_id]);
  const fetchauthor = async () => {
    try {
      const author = await apiInstance.get(`/expert-name/${author_id}`);
      console.log(author);
      if (author.data.expert) {
        setExpName(author.data.expert);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createdAt = BlogData?.blog.createdAt;
  useEffect(() => {
    if (createdAt) {
      const parsedDate = createdAt ? parseISO(createdAt) : null;
      const formattedDate = format(parsedDate, "MMM d,yyyy hh:mm:ss a");
      setDate(formattedDate);
    }
  }, [createdAt]);
  console.log(expName);
  return (
    <div className="flex flex-col align items-center pr-6 pl-6" >
      <h1 className="text-4xl medium mt-5">{BlogData?.blog.title}</h1>
      <p className="text-default-500 light"></p>
      <div className="flex justify-between">
        <p className="light pr-10 ">{`by ${expName?.name}`}</p>
        <p className="light ">{date }</p>
      </div>
      <Image
        src={BlogData?.blog.coverImg}
        width={650}
        className="mt-5 mb-5"
      />
      <div
        className=" light text-xl mt-4"
        dangerouslySetInnerHTML={{ __html: BlogData?.blog.content }}
      ></div>
    </div>
  );
}
