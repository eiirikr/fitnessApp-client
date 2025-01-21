import { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "../context/UserContext";
import WorkoutView from "../components/WorkoutView";
import { Notyf } from "notyf";

export default function WorkoutsCatalog() {
  const { user } = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const notyf = new Notyf();
    setLoading(true);
    const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`;

    const fetchOptions =
      user.id !== null
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {};

    fetch(fetchUrl, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      })
      .catch((err) => {
        notyf.error("Error fetching workouts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  return (
    <WorkoutView
      workoutsData={workouts}
      fetchData={fetchData}
      loading={loading}
    />
  );
}
