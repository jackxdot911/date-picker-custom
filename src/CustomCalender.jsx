import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Base styles for structure
import InfoIcon from "./icons/InfoIcon";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const isDateDisabled = ({ date }) => {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return !(day === 2 || day === 5); // Enable only Tuesday (2) and Friday (5)
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveStartDate(today);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[460px] mx-auto">
      <div className="flex m-4 justify-between w-full">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-600 ms-2">
            Select Mailing Deadline
          </h2>
          <p className="text-sm text-gray-500 flex items-center">
            <span>
              <InfoIcon />
            </span>
            <span className="me-1">Please select only </span>
            <span className="text-blue-500 font-medium me-1">
              Tuesday & Friday
            </span>{" "}
            dates
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center font-medium gap-1 py-1 px-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none shadow cursor-pointer"
            onClick={handleTodayClick}
          >
            <span className="bg-purple-700 h-[6px] w-[6px] rounded-full"></span>
            <span>Today</span>
          </button>
        </div>
      </div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={isDateDisabled}
        minDetail="month"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        className=""
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        tileClassName={({ date, view }) => {
          if (
            view === "month" &&
            date.toDateString() === selectedDate.toDateString()
          ) {
            return "react-calendar__tile--selected";
          }
          if (date.toDateString() === new Date().toDateString()) {
            return "react-calendar__tile--today";
          }
          return "";
        }}
      />
    </div>
  );
};

export default CustomCalendar;
