import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import LogoRVB from "../LogoRVB";
// import { Routes, Route } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validationError = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const setAuth = useState({
    isLoggedIn: false,
    expiryTime: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email_user", email);
    formData.append("password", password);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    axios
      .post(`http://127.0.0.1:8000/api/login`, formData)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem(
            "access_token",
            response.data.authorisation.token
          );
          setAuth({
            isLoggedIn: true,
            expiryTime: response.data.authorisation.expiry_time,
          });
          navigate("/home");
        } else {
          if (response.data.status === "error" && response.data.message) {
            setErrorMessage(response.data.message);
          } else {
            setErrorMessage("Identifiant ou mot de passe incorrect.");
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
        setErrorMessage("Identifiant ou mot de passe incorrect.");
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6 mt-5">
          <Row>
            <div className="mb-5 d-flex justify-content-center">
              <LogoRVB />
            </div>
          </Row>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Connectez-vous</h3>
            </div>
            <div className="card-body">
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}{" "}
                  <Form.Group className="mb-3 " controlId="formGroupEmail">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="btnBlue mt-2 btn-sm "
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Connexion
                  </Button>
                  <Row>
                    <a href="/register" className="register">
                      Enregistrez-vous
                    </a>
                  </Row>
                </Form>
                {/* <Routes>
                  {auth.isLoggedIn && <Route path="/home" element={<Home />} />}
                  {!auth.isLoggedIn && (
                    <Route path="/login" element={<Login />} />
                  )}
                </Routes> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
