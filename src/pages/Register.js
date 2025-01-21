import { useState, useEffect } from "react";
import { Form, Button, Card, CardFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

export default function Register() {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          notyf.success("Registered Successfully");

          navigate("/login");
        } else {
          notyf.error(data.error || "Please check your registration details");
        }
      });
  }

  return (
    <>
      <Form
        onSubmit={(e) => registerUser(e)}
        style={{ width: "500px" }}
        className="mx-auto"
      >
        <h1 className="my-3 text-center">Register</h1>
        <Card>
          <Card.Body>
            <Form.Group className="mb-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify your Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Card.Body>
          <CardFooter className="p-3">
            {isActive ? (
              <Button
                variant="success"
                type="submit"
                id="submitBtn"
                className="w-100"
              >
                Register
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                id="submitBtn"
                className="w-100"
                disabled
              >
                Register
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Click here
          </a>{" "}
          to log in.
        </p>
      </div>
    </>
  );
}
