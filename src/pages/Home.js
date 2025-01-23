import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "Welcome to Zuitt Workouts",
    content: "Your Workout Tracker!",
    destination: "/login",
    buttonLabel: "Login to get Started",
  };

  return (
    <>
      <Banner data={data} />
    </>
  );
}
