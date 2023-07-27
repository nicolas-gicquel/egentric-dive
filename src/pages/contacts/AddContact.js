import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

const AddContact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de l'article
  const AddContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email_contact", email);
    formData.append("topic_contact", topic);
    formData.append("description_contact", description);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/contacts`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/home"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Navigation />
      <Row className="m-0">
        <Col xs={1} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={11} md={9} lg={10}>
          <Row className="justify-content-center mt-4 mb-5 p-0">
            <Col xs={9} sm={8} md={9} lg={8}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-envelope-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                    </svg>{" "}
                    Envoyer un message
                  </h3>
                  <hr />
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
                    <Form onSubmit={AddContact}>
                      <Row>
                        <Col>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="topic">
                            <Form.Label>Sujet</Form.Label>
                            <Form.Control
                              type="text"
                              value={topic}
                              onChange={(event) => {
                                setTopic(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={6}
                              value={description}
                              onChange={(event) => {
                                setDescription(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        className="btnBlue mt-2 btn-sm mb-2"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        Envoyer
                      </Button>
                    </Form>
                  </div>
                  <hr />
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <p className="text-center mx-auto mt-2">
                      <strong>GASPAR</strong>
                      <br></br> Maison des associations<br></br>
                      10, avenue Gaston sébilleau <br></br>35600 REDON
                      <br></br>
                      contact@gaspar35.fr <br></br>06.98.72.70.68
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default AddContact;
