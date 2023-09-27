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

export default function FitBody() {
  const [expertData, setexpertData] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get("/bodyexp");
     console.log(res);
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
    nav(`/booking-page/${_id}`);
  };

  return (
    <div className=" flex flex-row mr-auto p-10 ">
      <h1 className="extrabold mr-10 text-2xl text-[#FF793B]">
        Talk <br /> to an
        <br /> Expert.
      </h1>
      {expertData.map((expert, index) => (
        <div
          className="pl-5"
          key={index}>
          <Card
            isFooterBlurred
            className="w-full h-[200px] col-span-12 sm:col-span-5 "
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
              src={`${import.meta.env.VITE_REACT_APP_bdId}/uploads/${
                expert.profile
              }`}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-white semibold rounded p-1 bg-[#FF793B] bg-opacity-50 text-md">
                  {expert.selectedOption}
                </p>
              </div>
              <Button
                className="bg-orange-200  text-black light semibold text-md"
                radius="full"
                size="sm"
                onClick={() => handleOnBook(expert._id)}
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
