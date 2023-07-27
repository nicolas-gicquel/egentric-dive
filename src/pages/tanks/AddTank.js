import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import auth from "../../services/auth/token.js";

const AddTank = () => {
  const navigate = useNavigate();
  const [codeTank, setCodeTank] = useState("");
  const [gasTank, setGasTank] = useState("");
  const [outletTank, setOutletTank] = useState("");
  const [builderTank, setBuilderTank] = useState("");
  const [markTank, setMarkTank] = useState("");
  const [numberTank, setNumberTank] = useState("");
  const [capacityTank, setCapacityTank] = useState("");
  const [firstTestDateTank, setFirstTestDateTank] = useState("");
  const [peTank, setPeTank] = useState("");
  const [operatingPressureTank, setOperatingPressureTank] = useState("");
  const [tivDate, setTivDate] = useState("");
  const [requalificationDate, setRequalificationDate] = useState("");
  const [qrcodeTank, setQrcodeTank] = useState("");
  const [availabilityTank, setAvailabilityTank] = useState("");
  const [causeUnavailabilityTank, setCauseUnavailabilityTank] = useState("");

  const userCoId = auth.getId();
  const role = auth.getRoles();
  const firstname = auth.getFirstname();
  const lastname = auth.getLastname();

  const [users, setUsers] = useState([]); // Tableau de données des utilisateurs
  const [selectedUser, setSelectedUser] = useState(null);

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    displayUsers();
  }, []);

  const changeHandler = (event) => {
    setQrcodeTank(event.target.files[0]);
  };

  const handleChangeSelect1 = (event) => {
    setGasTank(event.target.value);
  };

  const handleChangeSelect2 = (event) => {
    setCapacityTank(event.target.value);
  };

  const handleChangeSelect3 = (event) => {
    setOutletTank(event.target.value);
  };

  // // ------------Select propriétaire----------------------------------------//

  const handleNameChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const sortedOptions = users
    .map((user) => ({
      value: user.id,
      label: `${user.lastname} ${user.firstname}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // // ------------Récupération Users----------------------------------------//
  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        // Définir la valeur initiale de selectedUser avec l'option correspondante au user actuel
        const currentUserOption = {
          value: userCoId,
          label: `${lastname} ${firstname}`,
        };
        setSelectedUser(currentUserOption);
      });
  };

  // ----------------------- Fonction d'ajout de Tank----------------------------------------//
  const AddFormTank = async (e) => {
    e.preventDefault();

    // Determine the user ID based on the role
    const userId = role === 1 || role === 2 ? selectedUser.value : userCoId;

    const formData = new FormData();
    formData.append("code_tank", codeTank);
    formData.append("mark_tank", markTank);
    formData.append("gas_tank", gasTank);
    formData.append("outlet_tank", outletTank);
    formData.append("builder_tank", builderTank);
    formData.append("number_tank", numberTank);
    formData.append("capacity_tank", capacityTank);
    formData.append("first_test_date_tank", firstTestDateTank);
    formData.append("PE_tank", peTank);
    formData.append("operating_pressure_tank", operatingPressureTank);
    formData.append("tiv_date", tivDate);
    formData.append("requalification_date", requalificationDate);
    formData.append("qrcode_tank", qrcodeTank);
    formData.append("availability_tank", availabilityTank);
    formData.append("cause_unavailability_tank", causeUnavailabilityTank);
    formData.append("user_id", userId);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    await axios
      .post(`http://127.0.0.1:8000/api/tanks`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(() => navigate(-1))
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
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="tank"
                      viewBox="0 0 17.44 57.07"
                    >
                      <path d="m13.24,7.77l1.46,1.46c.22.22.58.22.8,0l1.77-1.77c.22-.22.22-.58,0-.8l-1.46-1.46c-.22-.22-.58-.22-.8,0l-.21.21-.92-.65s0,0,0,0c0-.87-.71-1.58-1.58-1.58s-1.58.71-1.58,1.58c0,.1.01.19.03.28l-1.43.44h-.79l-2.37-2.78c.28-.28.45-.67.45-1.1,0-.87-.71-1.58-1.58-1.58s-1.58.71-1.58,1.58c0,0,0,.01,0,.02l-1.02.7c-.19-.1-.43-.09-.61.06L.21,3.63c-.25.19-.29.55-.09.8l1.56,1.97c.19.25.55.29.8.09l1.62-1.28c.22-.17.26-.47.14-.71l.15-.12,2.16,3.7h-.36v1.72h.29v2.26c-3.06.55-5.32,3.21-5.32,6.36v30.43c0,.08,0,.16.01.24v3.57h.25s0,3.68,0,3.68h1.3l.03-.08c.16-.39.45-.63.76-.63.49,0,.89.58.89,1.3v.14s.93,0,.93,0v-.4h6.93v.4h.78l.13-.02v-.13c0-.71.4-1.29.89-1.29.31,0,.6.24.76.63l.03.08h1.09v-3.69h.21s0-3.62,0-3.62c0-.06,0-.12,0-.18v-30.43c0-3.19-2.28-5.85-5.38-6.37v-2.25h.3v-1.72h-.09l1.88-1.1.26.16c-.1.21-.06.46.11.64Zm.7-1.75l-.28.27-.43-.26c.12-.08.22-.19.31-.3l.41.29Zm-1.63-2.34c.59,0,1.07.48,1.07,1.07s-.48,1.07-1.07,1.07-1.07-.48-1.07-1.07.48-1.07,1.07-1.07ZM5.04.5c.59,0,1.07.48,1.07,1.07s-.48,1.07-1.07,1.07-1.07-.48-1.07-1.07.48-1.07,1.07-1.07Zm-1.41,3.2l-.52-.65.71-.48c.17.21.39.38.65.48l-.84.66Zm3.39,9.28l.45-.05v-3.14h.44v3.46c-3.57.64-5.32,2.24-5.32,6.42v26.39c-.16-.06-.31-.12-.44-.19v-27.46c0-2.8,2.09-5.13,4.87-5.43Zm3.21,0c2.81.27,4.93,2.61,4.93,5.44v27.41c-1.22.66-3.74,1.09-6.54,1.09-1.56,0-3.04-.13-4.26-.37v-26.88c.05-4.23,2.18-4.52,4.53-4.78l.05-.06v-5.04h.84v3.14l.45.04Zm-2.52-4.9l-2.88-4.94c.07.01.14.02.22.02.07,0,.14-.01.2-.02l2.83,3.33h1.4l1.78-.54c.22.19.49.33.79.38l-3.05,1.78h-1.29Z" />
                      <circle cx="5.04" cy="1.58" r=".73" />
                      <circle cx="12.3" cy="4.74" r=".73" />
                    </svg>{" "}
                    <span className="menu">Nouveau Bloc</span>
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

                    <Form onSubmit={AddFormTank}>
                      <Row>
                        <Col md={8} className="mt-3">
                          <Form.Group controlId="codeTank">
                            <Form.Label className="label">Code</Form.Label>
                            <Form.Control
                              type="text"
                              value={codeTank}
                              placeholder="code"
                              onChange={(event) => {
                                setCodeTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="gasTank">
                            <Form.Label className="label">Gaz</Form.Label>
                            <Form.Select
                              value={gasTank}
                              onChange={handleChangeSelect1}
                            >
                              <option value="">Sélectionnez un gaz</option>
                              <option value="Air">Air</option>
                              <option value="Nitrox">Nitrox</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={4} className="mt-3">
                          <Form.Group controlId="capacityTank">
                            <Form.Label className="label">
                              Capacité (litre)
                            </Form.Label>
                            <Form.Select
                              value={capacityTank}
                              onChange={handleChangeSelect2}
                            >
                              <option value="">
                                Sélectionnez une capacitée
                              </option>
                              <option value="4">4 Litres</option>
                              <option value="6">6 Litres</option>
                              <option value="7">7 Litres</option>
                              <option value="10">10 Litres</option>
                              <option value="12">12 Litres</option>
                              <option value="15">15 Litres</option>
                              <option value="18">18 Litres</option>
                              <option value="20">20 Litres</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={4} className="mt-3">
                          <Form.Group controlId="outletTank">
                            <Form.Label className="label">
                              Nombre de sortie
                            </Form.Label>
                            <Form.Select
                              value={outletTank}
                              onChange={handleChangeSelect3}
                            >
                              <option value="">
                                Sélectionnez le nombre de sortie
                              </option>
                              <option value="1">1 sortie</option>
                              <option value="2">2 sorties</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={4} className="mt-3">
                          <Form.Group controlId="operatingPressureTank">
                            <Form.Label className="label">
                              Pression de service
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={operatingPressureTank}
                              placeholder="(en bars)"
                              onChange={(event) => {
                                setOperatingPressureTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="builderTank">
                            <Form.Label className="label">
                              Constructeur
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={builderTank}
                              placeholder="constructeur"
                              onChange={(event) => {
                                setBuilderTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} className="mt-3">
                          <Form.Group controlId="markTank">
                            <Form.Label className="label">Marque</Form.Label>
                            <Form.Control
                              type="text"
                              value={markTank}
                              placeholder="marque"
                              onChange={(event) => {
                                setMarkTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="numberTank">
                            <Form.Label className="label">Numéro</Form.Label>
                            <Form.Control
                              type="text"
                              value={numberTank}
                              placeholder="numéro"
                              onChange={(event) => {
                                setNumberTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="peTank">
                            <Form.Label className="label">PE (bars)</Form.Label>
                            <Form.Control
                              type="text"
                              value={peTank}
                              placeholder="pe"
                              onChange={(event) => {
                                setPeTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="tivDate">
                            <Form.Label className="label">
                              Date de TIV
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={tivDate}
                              onChange={(event) => {
                                setTivDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="requalificationDate">
                            <Form.Label className="label">
                              Date de requalification
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={requalificationDate}
                              onChange={(event) => {
                                setRequalificationDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="firstTestDateTank">
                            <Form.Label className="label">
                              Date de 1er épreuve
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={firstTestDateTank}
                              onChange={(event) => {
                                setFirstTestDateTank(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-3">
                          <Form.Group controlId="qrcodeTank" className="mb-3">
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
                      {role === 3 ? (
                        <>
                          <Form.Group controlId="availabilityTank">
                            <Form.Control type="hidden" value="0" />
                          </Form.Group>
                          <Form.Group controlId="causeUnavailabilityTank">
                            <Form.Control type="hidden" value="perso" />
                          </Form.Group>
                        </>
                      ) : (
                        <div>
                          {" "}
                          {/* Ajout de la balise d'ouverture */}
                          <Row>
                            <Col md={4} className="mt-3">
                              <Form.Group controlId="availabilityTank">
                                <Form.Label className="label">
                                  Disponibilité
                                </Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch-user"
                                  label="Indisponible"
                                  value="0"
                                  checked={availabilityTank === 0}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setAvailabilityTank(0);
                                    }
                                  }}
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch-admin"
                                  label="Disponible"
                                  value="1"
                                  checked={availabilityTank === 1}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setAvailabilityTank(1);
                                    }
                                  }}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={8} className="mt-3">
                              {availabilityTank === 0 ? (
                                <Form.Group controlId="causeUnavailabilityTank">
                                  <Form.Label className="label">
                                    Cause d'indisponibilité
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={causeUnavailabilityTank}
                                    onChange={(event) => {
                                      setCauseUnavailabilityTank(
                                        event.target.value
                                      );
                                    }}
                                  />
                                </Form.Group>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
                      )}

                      {role === 1 || role === 2 ? (
                        <Row>
                          <Col lg={12} xl={6} className="mt-3">
                            <Form.Group>
                              <Form.Label className="label">
                                Nom du propriétaire
                              </Form.Label>
                              <Select
                                options={sortedOptions}
                                value={selectedUser}
                                onChange={handleNameChange}
                                placeholder="Sélectionnez un nom"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : (
                        <input type="hidden" name="userCoId" value={userCoId} />
                      )}

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

export default AddTank;
