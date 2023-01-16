import { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { add } from "date-fns";

interface indexProps {}

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const index: FC<indexProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  // Schedule
  const getTimes = () => {
    // guard Clause
    if (!date.justDate) return;

    const { justDate } = date; // 'justDate' is of type date (not date or null)
    const beginningSchedule = add(justDate, { hours: 9 });
    const endSchedule = add(justDate, { hours: 17 });
    const interval = 30; // represents minutes

    // Need to go from the beginning to the end, and every 30 minutes, we want to push a time into an array. Then, we will be able to map over those times in our return.
    const times = [];
    for (
      let i = beginningSchedule;
      i <= endSchedule;
      i = add(i, { minutes: interval })
    ) {
      times.push(i);
    }
    console.log(
      "Here are the times coming from our for loop creating scheudle" + times
    );
    return times;
  };
  // ENVOKE OUR FUNCTION
  const times = getTimes();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* If the user has clicked on a date, we don't want to show the calendar anymore */}
      {date.justDate ? (
        <div className="flex gap-4">{/* TODO: Loop through our times. */}</div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
          // onClickDay={(date) =>
          //   console.log(setDate((prev) => ({ ...prev, justDate: date })))
          // }
        />
      )}
    </div>
  );
};

export default index;

/*
Had to add npm add @types/react-calendar to make it work with types

https://github.com/wojtekmaj/react-calendar/tree/v3.x

*/
