import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Notyf } from "notyf";

export default function UpdateWorkout({ workout, fetchData }) {
  const notyf = new Notyf();

  const [workoutId] = useState(workout._id);

  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(workout.duration);

  const [showUpdate, setShowUpdate] = useState(false);

  const openUpdate = () => {
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setShowUpdate(false);
    setName("");
    setDuration("");
  };

  const updateWorkout = (e, workoutId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workoutId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          duration: duration,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success === true) {
          notyf.success("Successfully Updated");
          closeUpdate();
          fetchData();
        } else {
          notyf.error("Something went wrong");
          closeUpdate();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openUpdate()}>
        Update
      </Button>

      {/*Update Modal*/}
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Form onSubmit={(e) => updateWorkout(e, workoutId)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Workout</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdate}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
