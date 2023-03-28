import Booking from "./booking";

type Lesson = {
  id?: String;
  date: Date;
  location?: string;
  price?: string;
  available: Boolean;
  booked: Boolean;
  bookings: Booking[];
};

export default Lesson;
