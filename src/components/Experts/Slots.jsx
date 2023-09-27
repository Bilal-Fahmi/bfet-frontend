import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { add, format } from "date-fns";
import { Button } from "@nextui-org/react";
import {
  ENDING_TIME,
  INTERVAL,
  STARTING_TIME,
} from "../../../constraints/timings";
import jwtDecode from "jwt-decode";
import { apiInstance } from "../../axiosInstance/Instance";
import { toast } from "react-hot-toast";

export default function Slots() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [selectedDate, setSelectedDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isMaxSlotsReached, setIsMaxSlotsReached] = useState(false);
  const { justDate } = selectedDate;
  const beginning = add(justDate, { hours: STARTING_TIME });
  const end = add(justDate, { hours: ENDING_TIME });
  const interval = INTERVAL;

  const getTime = () => {
    if (!selectedDate.justDate) return [];

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };
  const times = getTime();

  const handleSlotClick = (time) => {
    if (selectedSlots.length>=8) {
        // If the maximum limit is reached, allow deselection
        if (selectedSlots.some((slot) => slot.getTime() === time.getTime())) {
          // Deselect the slot
          setSelectedSlots((prevSlots) =>
            prevSlots.filter((slot) => slot.getTime() !== time.getTime())
          );
          setIsMaxSlotsReached(false); // Reset the maximum limit flag
        }
        return;
      }
    if (selectedSlots.some((slot) => slot.getTime() === time.getTime())) {
      // If the slot is already selected, remove it
      setSelectedSlots((prevSlots) =>
        prevSlots.filter((slot) => slot.getTime() !== time.getTime())
      );
    } else {
      // If the slot is not selected, add it
      // setSelectedSlots((prevSlots) => [...prevSlots, time]);
      const newSelectedSlots = [...selectedSlots, time];
      setSelectedSlots(newSelectedSlots);
      if (newSelectedSlots.length >= 8) {
        setIsMaxSlotsReached(true);
      }
    }
  };

  const handleOnConfirm = async () => {
    if (selectedSlots.length === 0) {
      console.log("No slots selected");
      return;
    }
    const formattedTime = selectedSlots.map((time) =>
      format(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    );
    const data = { slots: formattedTime };
    const res = await apiInstance.post(
      `/expert-slots/${decodedToken?._id}`,
      data
    );
    if (res.data.success) {
      toast.success(res.data.success);
    }
  };

  return (
    <div className="p-5">
      {selectedDate.justDate ? (
        <div className="light flex gap-2">
          <h1 className="semibold text-xl pr-4 underline">Select a Time</h1>
          {times?.map((time, i) => (
            <div key={`time-${i}`}>
              <Button
                variant="flat"
                className={`light ${
                  selectedSlots.some(
                    (slot) => slot.getTime() === time.getTime()
                  )
                    ? "bg-[#5AA17F] bg-opacity-70 text-white"
                    : ""
                } `}
                onClick={() => handleSlotClick(time)}
                isDisabled={isMaxSlotsReached}
              >
                {format(time, "hh:mm")}
              </Button>
            </div>
          ))}
          <Button
            variant="flat"
            color="success"
            onClick={handleOnConfirm}
            isDisabled={selectedSlots.length === 0}
          >
            Confirm
          </Button>
        </div>
      ) : (
          <div>
            <h1 className="semibold text-xl pb-3 underline">Select a Date</h1>
        <Calendar
          minDate={new Date()}
          view="month"
          className="light"
          onClickDay={(date) =>
            setSelectedDate((prev) => ({ ...prev, justDate: date }))
          }
            />
            </div>
      )}
    </div>
  );
}
