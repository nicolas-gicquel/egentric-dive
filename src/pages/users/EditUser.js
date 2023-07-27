import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import auth from "../../services/auth/token.js";

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [civility, setCivility] = useState("");
  const [phone, setPhone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [licenseDate, setLicenseDate] = useState("");
  const [licensee, setLicensee] = useState("");
  const [certificateDate, setCertificateDate] = useState("");

  const [role_id, setRoleId] = useState("");
  const [validationError, setValidationError] = useState({});

  // On récupère le role du user
  const roleCo = auth.getRoles();

  const changeHandler = (event) => {
    setPicture(event.target.files[0]);
  };

  const setLabelValue = useState("");

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const valueToSend = isChecked ? 1 : 0;

    setLicensee(valueToSend);
    setLabelValue(isChecked ? licensee.toString() : "");

    if (!isChecked) {
      window.alert("La licence sera désactivée !");
    }
    if (isChecked) {
      window.alert("La licence sera activée !");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setFirstname(res.data.data.firstname);
        setLastname(res.data.data.lastname);
        setEmail(res.data.data.email_user);
        setPseudo(res.data.data.pseudo);
        setCivility(res.data.data.civility);
        setPhone(res.data.data.phone);
        setCellphone(res.data.data.cellphone);
        setAddress(res.data.data.address);
        setZip(res.data.data.zip);
        setCity(res.data.data.city);
        // setPicture(res.data.data.picture);
        setLicenseNumber(res.data.data.license_number);
        setLicenseDate(res.data.data.license_date);
        setLicensee(res.data.data.licensee);
        setCertificateDate(res.data.data.medical_certificate_date);
        setRoleId(res.data.data.role_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fonction de modification d'article
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("pseudo", pseudo);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    // formData.append("civility", civility);
    formData.append("email_user", email);
    // formData.append("phone", phone);
    formData.append("cellphone", cellphone);
    formData.append("address", address);
    formData.append("zip", zip);
    formData.append("city", city);
    formData.append("license_number", LicenseNumber);
    // formData.append("license_date", licenseDate);
    formData.append("licensee", licensee);
    // formData.append("medical_certificate_date", certificateDate);
    formData.append("role_id", role_id);

    if (picture !== null) {
      formData.append("picture", picture);
    }
    if (civility !== null) {
      formData.append("civility", civility);
    }
    if (phone !== null) {
      formData.append("phone", phone);
    }
    if (licenseDate !== null) {
      formData.append("licensee", licensee);
    }
    if (certificateDate !== null) {
      formData.append("medical_certificate_date", certificateDate);
    }

    // La boucle suivante utilise la méthode formData.entries() pour afficher toutes les paires clé-valeur de l'objet FormData dans la console.
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    await axios
      .post(`http://localhost:8000/api/users/${user}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/users"))
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
          <Row className="justify-content-center  mt-4 mb-5">
            <Col xs={9} sm={8} md={9} lg={8}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>{" "}
                    <span className="menu">Modifier {pseudo}</span>
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
                    <Form onSubmit={updateUser}>
                      <Row>
                        <Col md={2} className="mt-3">
                          <Form.Group controlId="civility">
                            <Form.Label className="label">Civilité</Form.Label>
                            <Form.Control
                              type="text"
                              value={civility}
                              onChange={(event) => {
                                setCivility(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={5} className="mt-3">
                          <Form.Group controlId="lastname">
                            <Form.Label className="label">Nom</Form.Label>
                            <Form.Control
                              type="text"
                              value={lastname}
                              onChange={(event) => {
                                setLastname(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={5} className="mt-3">
                          <Form.Group controlId="firstname">
                            <Form.Label className="label">Prénom</Form.Label>
                            <Form.Control
                              type="text"
                              value={firstname}
                              onChange={(event) => {
                                setFirstname(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="pseudo">
                            <Form.Label className="label">Pseudo</Form.Label>
                            <Form.Control
                              type="text"
                              value={pseudo}
                              onChange={(event) => {
                                setPseudo(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="email">
                            <Form.Label className="label">Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="phone">
                            <Form.Label className="label">Téléphone</Form.Label>
                            <Form.Control
                              type="text"
                              value={phone}
                              onChange={(event) => {
                                setPhone(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mt-3">
                          <Form.Group controlId="cellphone">
                            <Form.Label className="label">Mobile</Form.Label>
                            <Form.Control
                              type="text"
                              value={cellphone}
                              onChange={(event) => {
                                setCellphone(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Form.Group controlId="address">
                          <Form.Label className="label">Adresse</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="2"
                            value={address}
                            onChange={(event) => {
                              setAddress(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Row>

                      <Row>
                        <Col md={4} className="mt-3">
                          <Form.Group controlId="zip">
                            <Form.Label className="label">
                              Code Postal
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={zip}
                              onChange={(event) => {
                                setZip(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={8} className="mt-3">
                          <Form.Group controlId="city">
                            <Form.Label className="label">Ville</Form.Label>
                            <Form.Control
                              type="text"
                              value={city}
                              onChange={(event) => {
                                setCity(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Form.Group controlId="picture" className="mb-3">
                            <Form.Label className="label">Image</Form.Label>
                            <Form.Control
                              type="file"
                              onChange={changeHandler}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4} className="mt-3">
                          <p className="label">
                            Licence à jour :{" "}
                            {licensee === 1 ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="rgb(149, 176, 51)"
                                className="bi bi-check-lg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="rgb(176, 96, 86)"
                                className="bi bi-x-octagon"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                              </svg>
                            )}
                          </p>
                        </Col>
                        {roleCo === 1 && (
                          <Col md={8} className="mt-3">
                            <Form.Group controlId="licensee">
                              <Form.Label className="label">
                                Activation/désactivation de la licence
                              </Form.Label>
                              <Form.Check
                                type="checkbox"
                                id="custom-checkbox-licensee"
                                label="Licence activé"
                                checked={licensee === 1}
                                onChange={handleCheckboxChange}
                              />
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                      <Row>
                        <Col lxl={4} className="mt-3">
                          <Form.Group controlId="licenseNumber">
                            <Form.Label className="label">
                              N° de licence
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={LicenseNumber}
                              onChange={(event) => {
                                setLicenseNumber(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={4} className="mt-3">
                          <Form.Group controlId="licenseDate">
                            <Form.Label className="label">
                              Date de la licence
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={licenseDate}
                              onChange={(event) => {
                                setLicenseDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={4} className="mt-3">
                          <Form.Group controlId="certificateDate">
                            <Form.Label className="label">
                              Date du certificat médical
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={certificateDate}
                              onChange={(event) => {
                                setCertificateDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        {roleCo === 1 && (
                          <Col>
                            <Form.Group controlId="Role">
                              <Form.Label className="label">Role</Form.Label>
                              <Form.Check
                                type="switch"
                                id="custom-switch-user"
                                label="Utilisateur"
                                value="3"
                                checked={role_id === 3}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setRoleId(3);
                                  }
                                }}
                              />
                              <Form.Check
                                type="switch"
                                id="custom-switch-editorM"
                                label="Editeur Matériel"
                                value="2"
                                checked={role_id === 2}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setRoleId(2);
                                  }
                                }}
                              />
                              <Form.Check
                                type="switch"
                                id="custom-switch-admin"
                                label="Administrateur"
                                value="1"
                                checked={role_id === 1}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setRoleId(1);
                                  }
                                }}
                              />
                            </Form.Group>
                          </Col>
                        )}
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
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>{" "}
                        <span className="menu ">Modifier</span>
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
export default EditUser;
