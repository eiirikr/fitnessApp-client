import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import { Notyf } from "notyf";

export default function AddWorkout() {
  const notyf = new Notyf();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  function createWorkout(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setName("");
          setDuration("");

          notyf.success("Workout Added");
          navigate("/workouts");
        } else {
          notyf.error("Error: Something Went Wrong.");
        }
      });
  }

  return (
    <>
      <h1 className="my-5 text-center">Add Workout</h1>
      <Form onSubmit={(e) => createWorkout(e)}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Duration"
            required
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="my-5">
          Add Workout
        </Button>
      </Form>
    </>
  );
}
