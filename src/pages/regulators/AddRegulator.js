import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

const AddRegulator = () => {
  const navigate = useNavigate();
  const [codeRegulator, setCodeRegulator] = useState("");
  const [markRegulator, setMarkRegulator] = useState("");
  const [yearRegulator, setYearRegulator] = useState("");
  const [revisionRegulatorDate, setRevisionRegulatorDate] = useState("");
  const [modelRegulator, setModelRegulator] = useState("");
  const [qrcodeRegulator, setQrcodeRegulator] = useState("");
  const [availabilityRegulator, setAvailabilityRegulator] = useState("");
  const [causeUnavailabilityRegulator, setCauseUnavailabilityRegulator] =
    useState("");

  //   const [counterLoanRegulator, setCounterLoanRegulator] = useState("");
  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
    setQrcodeRegulator(event.target.files[0]);
  };

  useEffect(() => {
    if (!yearRegulator) {
      setYearRegulator(new Date().getFullYear().toString());
    }
  }, [yearRegulator]);

  //Fonction d'ajout de regulator
  const AddRegulator = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("code_regulator", codeRegulator);
    formData.append("mark_regulator", markRegulator);
    formData.append("model_regulator", modelRegulator);
    formData.append("year_regulator", yearRegulator);
    formData.append("revision_regulator_date", revisionRegulatorDate);
    formData.append("qrcode_regulator", qrcodeRegulator);
    formData.append("availability_regulator", availabilityRegulator);
    formData.append(
      "cause_unavailability_regulator",
      causeUnavailabilityRegulator
    );
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    // formData.append("counter_loan_regulator", counterLoanRegulator);

    await axios
      .post(`http://127.0.0.1:8000/api/regulators`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(() => navigate("/regulators"))
      .catch(({ response }) => {
        if (response.status !== 200) {
          setValidationError(response.data);
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
          <Row className="justify-content-center  mt-4 mb-5">
            <Col xs={11} md={10} lg={9}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="currentColor"
                      className="Regulator"
                      viewBox="0 0 56.69 26.69"
                    >
                      <path d="m39.62,10.3c-2.15,0-3.89,1.75-3.89,3.89s1.75,3.89,3.89,3.89,3.89-1.75,3.89-3.89-1.75-3.89-3.89-3.89Z" />
                      <path d="m39.62,6.87c-4.04,0-7.32,3.28-7.32,7.32s3.28,7.32,7.32,7.32,7.32-3.28,7.32-7.32-3.28-7.32-7.32-7.32Zm0,11.76c-2.45,0-4.44-1.99-4.44-4.44s1.99-4.44,4.44-4.44,4.44,1.99,4.44,4.44-1.99,4.44-4.44,4.44Z" />
                      <path d="m55.6,10.03h-1.41c0-.4-.21-.79-.59-.99l-3.7-1.93c-.91-1.32-2.08-2.46-3.42-3.35.27-.2.45-.52.45-.88v-1.78c0-.6-.49-1.1-1.1-1.1,0,0-2.3.73-6.3.73-4,0-6.3-.73-6.3-.73-.6,0-1.1.49-1.1,1.1v1.78c0,.4.21.74.53.94-2.02,1.35-3.62,3.28-4.57,5.54-.1-.03-.19-.04-.3-.04h-4.4c-.5,0-.93.34-1.05.81h-4.86c-.13-.46-.55-.81-1.05-.81H6.62c-.6,0-1.09.49-1.09,1.08H0v4.74h5.52c0,.6.5,1.08,1.09,1.08h9.81c.5,0,.93-.34,1.05-.81h4.86c.13.46.55.81,1.05.81h3.89c.97,5.93,6.13,10.48,12.33,10.48,4.26,0,8.03-2.14,10.29-5.41l3.7-1.93c.34-.18.54-.5.58-.86h1.41c.6,0,1.1-.49,1.1-1.1v-6.27c0-.6-.49-1.1-1.1-1.1Zm-38.07.64h4.78v4.19h-4.78v-4.19Zm22.1,12.92c-5.18,0-9.4-4.21-9.4-9.4s4.22-9.4,9.4-9.4,9.4,4.22,9.4,9.4-4.21,9.4-9.4,9.4Z" />{" "}
                    </svg>{" "}
                    Nouveau Détendeur
                  </h3>
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

                    <Form onSubmit={AddRegulator}>
                      <Row>
                        <Col className="mt-3">
                          <Form.Group controlId="codeRegulator">
                            <Form.Label className="label">Code</Form.Label>
                            <Form.Control
                              type="text"
                              value={codeRegulator}
                              placeholder="code"
                              onChange={(event) => {
                                setCodeRegulator(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="markRegulator">
                            <Form.Label className="label">Marque</Form.Label>
                            <Form.Control
                              type="text"
                              value={markRegulator}
                              placeholder="marque"
                              onChange={(event) => {
                                setMarkRegulator(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} className="mt-3">
                          <Form.Group controlId="modelRegulator">
                            <Form.Label className="label">Modèle</Form.Label>
                            <Form.Control
                              type="text"
                              value={modelRegulator}
                              placeholder="modèle"
                              onChange={(event) => {
                                setModelRegulator(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="yearRegulator">
                            <Form.Label className="label">Année</Form.Label>
                            <Form.Control
                              type="number"
                              min="2000" // année minimale
                              max="2099" // année maximale
                              step="1" // incréments de 1
                              value={yearRegulator}
                              onChange={(event) => {
                                setYearRegulator(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} className="mt-3">
                          <Form.Group controlId="revisionRegulatorDate">
                            <Form.Label className="label">
                              Date de révision
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={revisionRegulatorDate}
                              onChange={(event) => {
                                setRevisionRegulatorDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="mt-3">
                          <Form.Group
                            controlId="qrcodeRegulator"
                            className="mb-3"
                          >
                            <Form.Label className="label">
                              Image du QrCode
                            </Form.Label>
                            <Form.Control
                              type="file"
                              onChange={changeHandler}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="availabilityRegulator">
                            <Form.Label className="label">
                              Disponibilité
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="custom-switch-user"
                              label="Indisponible"
                              value="0"
                              checked={availabilityRegulator === 0}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setAvailabilityRegulator(0);
                                }
                              }}
                            />
                            <Form.Check
                              type="switch"
                              id="custom-switch-admin"
                              label="Disponible"
                              value="1"
                              checked={availabilityRegulator === 1}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setAvailabilityRegulator(1);
                                }
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={8} className="mt-3">
                          {availabilityRegulator === 0 ? (
                            <Form.Group controlId="causeUnavailabilityRegulator">
                              <Form.Label className="label">
                                Cause d'indisponibilité
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={causeUnavailabilityRegulator}
                                onChange={(event) => {
                                  setCauseUnavailabilityRegulator(
                                    event.target.value
                                  );
                                }}
                              />
                            </Form.Group>
                          ) : null}
                        </Col>
                      </Row>
                      <Button
                        className="btn btnBlue2 btn-sm me-2 mt-3 "
                        onClick={() => navigate(-1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-return-left"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                          />
                        </svg>{" "}
                        <span className="menu">Retour</span>
                      </Button>
                      <Button
                        className="btnGreen mt-3 btn-sm"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>{" "}
                        <span className="menu ">Créer</span>
                      </Button>
                    </Form>
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

export default AddRegulator;
