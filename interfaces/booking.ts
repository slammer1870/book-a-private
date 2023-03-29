import Lesson from "./lesson";

type Booking = {
  id: String;
  lessonId: String;
  lesson: Lesson;
  status: String;
  stripePaymentIntent?: String;
  createdAt: Date;
  updatedAt: Date;
  name: String;
  email: String;
};

export default Booking;
