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

const AddBcd = () => {
  const navigate = useNavigate();
  const [codeBcd, setCodeBcd] = useState("");
  const [markBcd, setMarkBcd] = useState("");
  const [sizeBcd, setSizeBcd] = useState("");
  const [modelBcd, setModelBcd] = useState("");
  const [yearBcd, setYearBcd] = useState("");
  const [revisionBcdDate, setRevisionBcdDate] = useState("");
  const [qrcodeBcd, setQrcodeBcd] = useState("");
  const [availabilityBcd, setAvailabilityBcd] = useState("");
  const [causeUnavailabilityBcd, setCauseUnavailabilityBcd] = useState("");

  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
    setQrcodeBcd(event.target.files[0]);
  };
  const handleChangeSelect = (event) => {
    setSizeBcd(event.target.value);
  };

  useEffect(() => {
    if (!yearBcd) {
      setYearBcd(new Date().getFullYear().toString());
    }
  }, [yearBcd]);

  //Fonction d'ajout de bcd
  const AddBcd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("code_BCD", codeBcd);
    formData.append("mark_BCD", markBcd);
    formData.append("size_BCD", sizeBcd);
    formData.append("model_BCD", modelBcd);
    formData.append("year_BCD", yearBcd);
    formData.append("revision_BCD_date", revisionBcdDate);
    formData.append("qrcode_BCD", qrcodeBcd);
    formData.append("availability_BCD", availabilityBcd);
    formData.append("cause_unavailability_BCD", causeUnavailabilityBcd);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    await axios
      .post(`http://127.0.0.1:8000/api/bcds`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(() => navigate("/bcds"))
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
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="BCD"
                      viewBox="0 0 48.9 56.69"
                    >
                      <path d="m19.99,41.28h-6.5c-.17,1.73-.44,3.6-.75,5.41h7.17c-.01-.09-.02-.18-.02-.27v-4.57c0-.2.04-.39.1-.57Z" />
                      <path d="m28.29,46.69h7.87c-.3-1.81-.57-3.68-.75-5.41h-7.2c.06.18.1.37.1.57v4.57c0,.09,0,.18-.02.27Z" />
                      <path d="m16.52,15.99h4.92v-2.56s0-.08,0-.11h-4.93v2.67Z" />
                      <path d="m31.54,15.99v-2.67h-4.43s0,.07,0,.11v2.56h4.42Z" />
                      <path d="m21.61,47.64h4.99c.39,0,.73-.18.96-.46.11-.14.19-.31.24-.49.02-.09.03-.18.03-.27v-4.57c0-.21-.05-.4-.14-.57-.11-.2-.27-.37-.47-.49-.18-.1-.39-.17-.61-.17h-4.99c-.22,0-.43.06-.61.17-.2.12-.36.29-.47.49-.09.17-.14.36-.14.57v4.57c0,.09.01.18.03.27.04.18.12.35.24.49.22.28.57.46.96.46Z" />
                      <path d="m28.13,47.18c-.28.56-.86.95-1.53.95h-4.99c-.67,0-1.25-.39-1.53-.95h-7.41c-.3,1.76-.63,3.44-.93,4.85,3.36-.85,7.62-1.37,12.26-1.37,5.1,0,9.74.62,13.23,1.63-.31-1.46-.67-3.25-.99-5.12h-8.11Z" />
                      <path d="m40.02,23.98c-.81,0-1.47-.66-1.47-1.47v-1.4c-.17.05-.35.07-.54.07h-4.39c-1.15,0-2.08-.93-2.08-2.08v-2.62h-4.51c-.17.42-.58.71-1.06.71h-3.4c-.48,0-.89-.3-1.06-.71h-5.01v2.62c0,1.15-.93,2.08-2.08,2.08h-4.39c-.27,0-.52-.05-.75-.14v1.47c0,.81-.66,1.47-1.47,1.47h-2.2c1.15.93,2.61,2.48,3.78,3.94,1.5,1.88,4.04,5.52,4.25,8.83.07,1.12.02,2.51-.12,4.04h6.72c.31-.4.8-.66,1.35-.66h4.99c.55,0,1.03.26,1.35.66h7.42c-.14-1.53-.19-2.92-.12-4.04.22-3.31,2.76-6.95,4.25-8.83,1.17-1.46,2.63-3.02,3.78-3.94h-3.25Z" />

                      <rect
                        x="9.19"
                        width="6.1"
                        height="19.96"
                        rx=".86"
                        ry=".86"
                      />
                      <rect
                        x="32.77"
                        width="6.1"
                        height="19.96"
                        rx=".86"
                        ry=".86"
                      />
                      <path d="m3.99,24.34s-.03,0-.05,0c-.13,0-.28.08-.45.23-1.98,1.79-4.03,11.25-3.35,18.12.75,7.53,3.89,13.09,4.79,13.83.26.22,1.48.3,2.98-.14,1.22-.35,1.72-.8,1.78-.96.45-1.34,3.12-13.25,2.77-18.6-.34-5.23-7.37-12.18-8.45-12.49Z" />
                      <path d="m45.41,24.57c-.2-.18-.37-.26-.5-.23-1.08.31-8.11,7.26-8.45,12.49-.35,5.34,2.32,17.25,2.77,18.6.05.16.56.61,1.78.96,1.5.43,2.71.35,2.98.14.9-.74,4.04-6.3,4.79-13.83.68-6.86-1.38-16.33-3.35-18.12Z" />
                    </svg>{" "}
                    <span className="menu">Nouvelle Stab</span>
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

                    <Form onSubmit={AddBcd}>
                      <Row>
                        <Col md={8} className="mt-3">
                          <Form.Group controlId="codeBcd">
                            <Form.Label className="label">Code</Form.Label>
                            <Form.Control
                              type="text"
                              value={codeBcd}
                              placeholder="code"
                              onChange={(event) => {
                                setCodeBcd(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="sizeBcd">
                            <Form.Label className="label">Taille</Form.Label>
                            <Form.Select
                              value={sizeBcd}
                              onChange={handleChangeSelect}
                            >
                              <option value="">Sélectionnez une taille</option>
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="2XL">2XL</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="markBcd">
                            <Form.Label className="label">Marque</Form.Label>
                            <Form.Control
                              type="text"
                              value={markBcd}
                              placeholder="marque"
                              onChange={(event) => {
                                setMarkBcd(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} className="mt-3">
                          <Form.Group controlId="modelBcd">
                            <Form.Label className="label">Modèle</Form.Label>
                            <Form.Control
                              type="text"
                              value={modelBcd}
                              placeholder="modèle"
                              onChange={(event) => {
                                setModelBcd(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="yearBcd">
                            <Form.Label className="label">Année</Form.Label>
                            <Form.Control
                              type="number"
                              min="2000" // année minimale
                              max="2099" // année maximale
                              step="1" // incréments de 1
                              value={yearBcd}
                              onChange={(event) => {
                                setYearBcd(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} className="mt-3">
                          <Form.Group controlId="revisionBcdDate">
                            <Form.Label className="label">
                              Date de révision
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={revisionBcdDate}
                              onChange={(event) => {
                                setRevisionBcdDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="mt-3">
                          <Form.Group controlId="qrcodeBcd" className="mb-3">
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
                          <Form.Group controlId="availabilityBcd">
                            <Form.Label className="label">
                              Disponibilité
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="custom-switch-user"
                              label="Indisponible"
                              value="0"
                              checked={availabilityBcd === 0}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setAvailabilityBcd(0);
                                }
                              }}
                            />
                            <Form.Check
                              type="switch"
                              id="custom-switch-admin"
                              label="Disponible"
                              value="1"
                              checked={availabilityBcd === 1}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setAvailabilityBcd(1);
                                }
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={8} className="mt-3">
                          {availabilityBcd === 0 ? (
                            <Form.Group controlId="causeUnavailabilityBcd">
                              <Form.Label className="label">
                                Cause d'indisponibilité
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={causeUnavailabilityBcd}
                                onChange={(event) => {
                                  setCauseUnavailabilityBcd(event.target.value);
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

export default AddBcd;
