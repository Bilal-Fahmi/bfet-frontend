import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link, 
  Image,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../../axiosInstance/Instance";
import Calendar from "react-calendar";

export default function BookingPage() {
  const { id } = useParams();
  const [expertData, setExpertData] = useState();
  const [selectedDate, setSelectedDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [selectedSlot, setSelectedSlot] = useState();
  const [availableSlots, setAvailableSlots] = useState("");
  const [expBlogs, setExpBlogs] = useState();
  const { justDate } = selectedDate;
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get(`/expert-booking/${id}`);
      const expBlog = await apiInstance.get(`/expert-blog/${id}`);
      if (res.data.expert) {
        // Convert timestamps to user-friendly format
        const formattedTime = res.data.expert.slots.map((time) => {
          const date = new Date(time);
          return date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        });
        setAvailableSlots(formattedTime);
        setExpertData(res.data.expert);
      }
      if (expBlog.data.expBlog) {
        setExpBlogs(expBlog.data.expBlog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Function to truncate text and add "..." after a certain length
  const turncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  return (
    <div className="w-full">
      <Card className="mx-auto w-[400px] h-[300px] mt-5">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{expertData?.name}</p>
            <p className="text-small text-default-500">
              {expertData?.selectedOption}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {/* <p>{ expertData?.expert.slots}</p> */}
          {availableSlots?.length > 0 ? (
            <div>
              <h1 className="semibold mb-5">Select a Slot</h1>
              <ul className="grid grid-cols-4 gap-2">
                {availableSlots.map((slot, index) => (
                  <li key={index}>
                    <Button variant="flat" className="light">
                      {slot}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Calendar minDate={new Date()} view="month" className="light" />
          )}
        </CardBody>
        <Divider />
        <CardFooter></CardFooter>
      </Card>
      <div className="mt-6 pl-5">
        <h1 className="semibold text-xl  mb-2">Blogs by {expertData?.name}</h1>
        <Card
          className="w-[250px]"
          shadow="sm"
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              className="w-full object-cover h-[140px]"
              src={`${import.meta.env.VITE_REACT_APP_bdId}/uploads/${
                expBlogs?.coverImg
              }`}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b className="semibold">{expBlogs?.title}</b>
          </CardFooter>
          <CardFooter className="text-small justify-between ">
            <b className="light">
              {expBlogs && turncateText(expBlogs?.summary, 100)}
            </b>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
