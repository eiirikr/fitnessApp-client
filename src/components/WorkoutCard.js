import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import UpdateWorkout from "./UpdateWorkout";

export default function WorkoutCard({ workoutsData, workoutProp, fetchData }) {
  const [workouts, setWorkouts] = useState([]);
  const { name, duration, status } = workoutProp;

  useEffect(() => {
    const workoutsArr = workoutsData.map((workout) => {
      return <UpdateWorkout workout={workout} fetchData={fetchData} />;
    });

    setWorkouts(workoutsArr);
  }, [workoutsData, fetchData]);

  return (
    <Card className="d-flex flex-column h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center text-primary">{name}</Card.Title>
        <Card.Text className="mt-4 mb-3">Duration: {duration}</Card.Text>
        <Card.Text className="mt-4 mb-3">Status: {status}</Card.Text>
        {workouts}
      </Card.Body>
    </Card>
  );
}
