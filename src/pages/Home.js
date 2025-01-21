import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import { Notyf } from "notyf";

export default function Home() {
  const data = {
    title: "Welcome to Zuitt Workouts",
    content: "Your Workout Tracker!",
    destination: "/login",
    buttonLabel: "Login to get Started",
  };

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const notyf = new Notyf();
    setLoading(true);

    // Fetch workouts
    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => {
        notyf.error("Error fetching data");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Banner data={data} />
    </>
  );
}
