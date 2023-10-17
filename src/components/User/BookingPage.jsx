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
import { useParams } from "react-router-dom";
import { apiInstance } from "../../axiosInstance/Instance";
import Calendar from "react-calendar";
import { toast } from "react-hot-toast";
import { format } from "date-fns-tz"
import { parse } from 'date-fns'
import jwtDecode from "jwt-decode";


export default function BookingPage() {
  const token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token)
  const UserId = decodedToken?._id
  const {id} = useParams()
  const [expertData, setExpertData] = useState();
  const [selectedDate, setSelectedDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isMaxSlotsReached, setIsMaxSlotsReached] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [expBlogs, setExpBlogs] = useState();
  const { justDate } = selectedDate;
  const [loadingSlots, setLoadingSlots] = useState(false); // Loading indicator state
  const [errorSlots, setErrorSlots] = useState(null); // Error state for fetching slots
  const [showSlots, setShowSlots] = useState(false); // Flag to show/hide slots

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await apiInstance.get(`/expert-booking/${id}`);
      const expBlog = await apiInstance.get(`/expert-blog/${id}`);
      if (res.data.expert) {
        setExpertData(res.data.expert);
      }
      if (expBlog.data.expBlog) {
        setExpBlogs(expBlog.data.expBlog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSlotsForDate = async () => {
    if (!justDate) {
      return; // No date selected, do nothing
    }

    setLoadingSlots(true); // Show loading indicator
    setErrorSlots(null); // Reset error state

    try {
      const response = await apiInstance.get(`/slots/${justDate}`);
      if (response.data.slots) {
        if (Array.isArray(response.data.slots)) {
          const formattedTime = response.data.slots.map((time) => {
            const date = new Date(time);
            return date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          });
          setAvailableSlots(formattedTime);
          setShowSlots(true); // Show slots
        } else if (response.data.slots === "No slots found") {
          toast.error("No slots found");
        }
      }
    } catch (error) {
      setErrorSlots(error);
    } finally {
      setLoadingSlots(false); // Hide loading indicator
    }
  };

  const handleConfirmSlot = async () => {
    // if (!selectedSlot) {
    //   toast.error("Slots not selected")
    //   return;
    // }

    try { 
      console.log(selectedSlot);
      
 
      const timeString = "1:40 PM";
const timeZone = "UTC"; // Replace with the desired time zone

// Parse the time string into a Date object
const parsedTime = parse(timeString, "h:mm a", new Date(), { timeZone });

// Format the Date object as needed
const formattedTime = format(parsedTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone });

console.log(formattedTime);


      const response = await apiInstance.post("/confirm-slot", {
        slot: formattedTime,
        userId: UserId,
      });
      if (response.data.success) {
        toast.success(response.data.success);
      } else {
        toast.error("Failed to confirm slot");
      }
    } catch (error) {
      toast.error("Error confirming slot");
      console.error(error);
    }

    // Reset selectedSlot
    setSelectedSlot(null);
  };

  const turncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const isSlotSelected = (slot) => {
    return slot === selectedSlot; // Check if the slot is selected
  };

  return (
    <div className="w-full">
      <Card className="mx-auto w-[400px] h-[430px] mt-5">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            className="w-20"
            radius="sm"
            src={expertData?.profile}
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
          {!showSlots && (
            <div>
              <h1 className="semibold mb-5">Select a Date</h1>
              <Calendar
                minDate={new Date()}
                view="month"
                className="light"
                onChange={(date) =>
                  setSelectedDate({ ...selectedDate, justDate: date })
                }
              />
            </div>
          )}
          {showSlots && justDate && (
            <div>
              <h1 className="semibold mb-5">Select a Slot</h1>
              <ul className="grid grid-cols-4 gap-2">
                {availableSlots?.map((slot, index) => (
                  <li key={index}>
                    <Button
                      variant="flat"
                      className={`light ${
                        isSlotSelected(slot)
                          ? "bg-[#FF793B] bg-opacity-70 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSlot(slot);
                      }}
                    >
                      {slot}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>

        <Divider />
        <CardFooter className="justify-between">

            <Button
              onClick={fetchSlotsForDate}
              disabled={!justDate || loadingSlots}
              className="text-white bg-black light"
            >
              Check Slots
            </Button>
     
          <Button
            onClick={handleConfirmSlot}
            isDisabled={!selectedSlot}
            className={`text-white bg-black light ${
              selectedSlot ? "bg-green-500" : ""
            }`}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
      {expBlogs &&
        <div className="mt-6 pl-5">
          <h1 className="semibold text-xl mb-2">Blogs by {expertData?.name}</h1>
          {/* blog content */}
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
                src={expBlogs?.coverImg}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="semibold">{expBlogs?.title}</b>
            </CardFooter>
            <CardFooter className="text-small justify-between">
              <b className="light">
                {expBlogs && turncateText(expBlogs?.summary, 100)}
              </b>
            </CardFooter>
          </Card>
        </div>
      }
    </div>
  );
}