import { Row, Col, Container, Spinner } from "react-bootstrap";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutView({ workoutsData, fetchData, loading }) {
  return (
    <>
      <h1 className="text-center mt-3 mb-4">Workouts</h1>
      <Container>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading workouts, please wait...</p>
          </div>
        ) : workoutsData.length > 0 ? (
          <Row className="g-3 min-vh-75">
            {workoutsData.map((workout) => (
              <Col key={workout?._id} className="d-flex">
                <WorkoutCard workoutProp={workout} fetchData={fetchData} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No workouts available.</p>
        )}
      </Container>
    </>
  );
}
