import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { apiInstance } from "../../axiosInstance/Instance";
import { useNavigate } from "react-router-dom";

export default function FitMind() {
  const [expertData, setexpertData] = useState([]);
  const nav = useNavigate()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/mindexp");
      // console.log(res.data.expert[0].name);
      if (res.data.expert) {
        setexpertData(res.data.expert);
      } else {
        throw new Error("Experts not available");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnBook = (_id) => {
    nav(`/booking-page/${_id}`)
  }

  return (
    <div className=" flex flex-row mr-auto p-10 ">
      <h1 className="extrabold mr-10 text-2xl text-[#5AA17F]">
        Talk <br /> to an <br/>Expert.
      </h1>
      {expertData.map((expert, index) => (
        <div key={index}>
        <Card
          isFooterBlurred
          className="w-full h-[250px] col-span-12 sm:col-span-5 "
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            {/* <p className="text-tiny text-black/60 uppercase font-bold">New </p> */}
            <h4 className="text-white medium font-medium text-2xl capitalize">
              {expert.name}
            </h4>
          </CardHeader>
            <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="/public/pic/profile 2.jpg"
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-white semibold rounded p-1    bg-[#5AA17F] bg-opacity-50 text-md">
                {expert.selectedOption}
              </p>
              {/* <p className="text-black text-tiny">Get notified.</p> */}
            </div>
              <Button
              
              className="text-tiny bg-orange-200  text-black text-md semibold"
              radius="full"
                size="sm"
                variant="flat"
              onClick={()=>handleOnBook(expert._id)}
            >
              Book
            </Button>
          </CardFooter>
          </Card>
          </div>
      ))}
     
    </div>
  );
}
