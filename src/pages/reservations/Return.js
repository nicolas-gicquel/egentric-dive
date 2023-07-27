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

const ReturnReservation = () => {
  const navigate = useNavigate();
  const { reservation } = useParams();

  const [reservationDate, setReservationDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [reservationId, setReservationId] = useState("");

  const [validationError, setValidationError] = useState({});

  const [selectedUser, setSelectedUser] = useState({});

  const [selectedRegulator, setSelectedRegulator] = useState({});
  const [selectedRegulatorId, setSelectedRegulatorId] = useState("");

  const [selectedBcd, setSelectedBcd] = useState({});
  const [selectedBcdId, setSelectedBcdId] = useState("");
  const [tanks, setTanks] = useState([]);
  //   const [selectedTanks, setSelectedTanks] = useState([]);
  //   const [selectedTanksLabel, setSelectedTanksLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  const [confirmationDate, setConfirmationDate] = useState("");

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Ajouter un zéro devant le mois et le jour si nécessaire
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  //   console.log(tanks);

  // ================== GET - Récupère les valeurs de la fiche avec l'API=====================================================
  const getReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reservations/${reservation}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      //   console.log(response.data.data);
      setReservationDate(response.data.data.reservation_date);
      setReturnDate(response.data.data.return_date);
      setReservationId(response.data.data.id);
      setSelectedBcd({
        value: response.data.data.BCD_id,
        label: `${response.data.data.code_BCD} - ${response.data.data.size_BCD}`,
      });
      setSelectedBcdId(response.data.data.BCD_id || "");

      setSelectedRegulator({
        value: response.data.data.regulator_id,
        label: `${response.data.data.code_regulator}`,
      });

      setSelectedUser({
        value: response.data.data.user_id,
        label: `${response.data.data.lastname} ${response.data.data.firstname}`,
      });

      setSelectedRegulatorId(response.data.data.regulator_id || "");
      setTanks(response.data.data.tanks);

      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  // Mettre à jour la date lors du montage du composant
  useState(() => {
    const currentDate = getCurrentDate();
    setConfirmationDate(currentDate);
  }, []);

  const selectedTanks = tanks.map((tank) => ({
    value: tank.tank_id,
    label: `${tank.code_tank} - ${tank.capacity_tank} Litres - ${tank.outlet_tank} sortie - ${tank.gas_tank}`,
  }));
  console.log(selectedTanks);

  // // ------------Fonction de modification de reservation
  const DisplayReturn = async (e) => {
    e.preventDefault();

    const returnConfirmation = 1;

    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("reservation_date", reservationDate);
    formData.append("return_date", returnDate);
    formData.append("user_id", selectedUser.value);
    formData.append("BCD_id", selectedBcdId);
    formData.append("regulator_id", selectedRegulatorId);
    formData.append("confirmation_date", confirmationDate);
    formData.append("return_confirmation", returnConfirmation);

    // envoie des ids tanks
    const selectedTankIds = selectedTanks.map((tank) => tank.value);
    // console.log(selectedTankIds);
    for (let i = 0; i < selectedTankIds.length; i++) {
      formData.append("tank_id[]", selectedTankIds[i]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await axios
      .post(`http://127.0.0.1:8000/api/reservations/${reservation}`, formData, {
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
            <Col xs={9} sm={8} md={9} lg={8}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-file-earmark-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>{" "}
                    <span className="menu">
                      Restitution de la réservation N° {reservationId}
                    </span>
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
                    {isLoading ? (
                      // Afficher un message de chargement pendant le chargement des données
                      <p>Loading...</p>
                    ) : (
                      // Afficher les données une fois qu'elles sont récupérées

                      <Form onSubmit={DisplayReturn}>
                        <Row className="align-items-end">
                          <Col md={6} className="mt-3">
                            {/* ============================================Réservation Date===================================== */}
                            <Form.Group controlId="reservationDate">
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-calendar-check"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>{" "}
                                Date d'emprunt
                              </Form.Label>
                              <Form.Control
                                readOnly
                                type="date"
                                value={reservationDate}
                                onChange={(e) =>
                                  setReservationDate(e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mt-3">
                            {/* ============================================Retour Date===================================== */}
                            <Form.Group controlId="returnDate">
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-calendar-x"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>{" "}
                                Date de retour
                              </Form.Label>
                              <Form.Control
                                readOnly
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6} className="mt-3">
                            {/* ============================================Regulator===================================== */}
                            <Form.Group>
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  className="Regulator"
                                  viewBox="0 0 56.69 26.69"
                                >
                                  <path d="m39.62,10.3c-2.15,0-3.89,1.75-3.89,3.89s1.75,3.89,3.89,3.89,3.89-1.75,3.89-3.89-1.75-3.89-3.89-3.89Z" />
                                  <path d="m39.62,6.87c-4.04,0-7.32,3.28-7.32,7.32s3.28,7.32,7.32,7.32,7.32-3.28,7.32-7.32-3.28-7.32-7.32-7.32Zm0,11.76c-2.45,0-4.44-1.99-4.44-4.44s1.99-4.44,4.44-4.44,4.44,1.99,4.44,4.44-1.99,4.44-4.44,4.44Z" />
                                  <path d="m55.6,10.03h-1.41c0-.4-.21-.79-.59-.99l-3.7-1.93c-.91-1.32-2.08-2.46-3.42-3.35.27-.2.45-.52.45-.88v-1.78c0-.6-.49-1.1-1.1-1.1,0,0-2.3.73-6.3.73-4,0-6.3-.73-6.3-.73-.6,0-1.1.49-1.1,1.1v1.78c0,.4.21.74.53.94-2.02,1.35-3.62,3.28-4.57,5.54-.1-.03-.19-.04-.3-.04h-4.4c-.5,0-.93.34-1.05.81h-4.86c-.13-.46-.55-.81-1.05-.81H6.62c-.6,0-1.09.49-1.09,1.08H0v4.74h5.52c0,.6.5,1.08,1.09,1.08h9.81c.5,0,.93-.34,1.05-.81h4.86c.13.46.55.81,1.05.81h3.89c.97,5.93,6.13,10.48,12.33,10.48,4.26,0,8.03-2.14,10.29-5.41l3.7-1.93c.34-.18.54-.5.58-.86h1.41c.6,0,1.1-.49,1.1-1.1v-6.27c0-.6-.49-1.1-1.1-1.1Zm-38.07.64h4.78v4.19h-4.78v-4.19Zm22.1,12.92c-5.18,0-9.4-4.21-9.4-9.4s4.22-9.4,9.4-9.4,9.4,4.22,9.4,9.4-4.21,9.4-9.4,9.4Z" />{" "}
                                </svg>{" "}
                                Détendeur
                              </Form.Label>
                              {selectedRegulator.value === null ? (
                                <>
                                  <Form.Control
                                    readOnly
                                    type="text"
                                    value="Pas de détendeur emprunté"
                                  />
                                </>
                              ) : (
                                <>
                                  <Form.Control
                                    readOnly
                                    type="text"
                                    value={selectedRegulator.label}
                                  />
                                  <input
                                    type="hidden"
                                    name="regulatorId"
                                    value={selectedRegulatorId}
                                  />
                                </>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mt-3">
                            {/* ============================================BCD===================================== */}
                            <Form.Group>
                              <Form.Label className="label mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
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
                                Stab
                              </Form.Label>
                              {selectedRegulator.value === null ? (
                                <>
                                  <Form.Control
                                    readOnly
                                    type="text"
                                    value="Pas de stab empruntée"
                                  />
                                </>
                              ) : (
                                <>
                                  <Form.Control
                                    readOnly
                                    type="text"
                                    value={selectedBcd.label}
                                  />
                                  <input
                                    type="hidden"
                                    name="BcdId"
                                    value={selectedBcdId}
                                  />
                                </>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="mt-3">
                            {/* ============================================Tank===================================== */}
                            <Form.Group>
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  className="tank"
                                  viewBox="0 0 17.44 57.07"
                                >
                                  <path d="m13.24,7.77l1.46,1.46c.22.22.58.22.8,0l1.77-1.77c.22-.22.22-.58,0-.8l-1.46-1.46c-.22-.22-.58-.22-.8,0l-.21.21-.92-.65s0,0,0,0c0-.87-.71-1.58-1.58-1.58s-1.58.71-1.58,1.58c0,.1.01.19.03.28l-1.43.44h-.79l-2.37-2.78c.28-.28.45-.67.45-1.1,0-.87-.71-1.58-1.58-1.58s-1.58.71-1.58,1.58c0,0,0,.01,0,.02l-1.02.7c-.19-.1-.43-.09-.61.06L.21,3.63c-.25.19-.29.55-.09.8l1.56,1.97c.19.25.55.29.8.09l1.62-1.28c.22-.17.26-.47.14-.71l.15-.12,2.16,3.7h-.36v1.72h.29v2.26c-3.06.55-5.32,3.21-5.32,6.36v30.43c0,.08,0,.16.01.24v3.57h.25s0,3.68,0,3.68h1.3l.03-.08c.16-.39.45-.63.76-.63.49,0,.89.58.89,1.3v.14s.93,0,.93,0v-.4h6.93v.4h.78l.13-.02v-.13c0-.71.4-1.29.89-1.29.31,0,.6.24.76.63l.03.08h1.09v-3.69h.21s0-3.62,0-3.62c0-.06,0-.12,0-.18v-30.43c0-3.19-2.28-5.85-5.38-6.37v-2.25h.3v-1.72h-.09l1.88-1.1.26.16c-.1.21-.06.46.11.64Zm.7-1.75l-.28.27-.43-.26c.12-.08.22-.19.31-.3l.41.29Zm-1.63-2.34c.59,0,1.07.48,1.07,1.07s-.48,1.07-1.07,1.07-1.07-.48-1.07-1.07.48-1.07,1.07-1.07ZM5.04.5c.59,0,1.07.48,1.07,1.07s-.48,1.07-1.07,1.07-1.07-.48-1.07-1.07.48-1.07,1.07-1.07Zm-1.41,3.2l-.52-.65.71-.48c.17.21.39.38.65.48l-.84.66Zm3.39,9.28l.45-.05v-3.14h.44v3.46c-3.57.64-5.32,2.24-5.32,6.42v26.39c-.16-.06-.31-.12-.44-.19v-27.46c0-2.8,2.09-5.13,4.87-5.43Zm3.21,0c2.81.27,4.93,2.61,4.93,5.44v27.41c-1.22.66-3.74,1.09-6.54,1.09-1.56,0-3.04-.13-4.26-.37v-26.88c.05-4.23,2.18-4.52,4.53-4.78l.05-.06v-5.04h.84v3.14l.45.04Zm-2.52-4.9l-2.88-4.94c.07.01.14.02.22.02.07,0,.14-.01.2-.02l2.83,3.33h1.4l1.78-.54c.22.19.49.33.79.38l-3.05,1.78h-1.29Z" />
                                  <circle cx="5.04" cy="1.58" r=".73" />
                                  <circle cx="12.3" cy="4.74" r=".73" />
                                </svg>{" "}
                                Bloc
                              </Form.Label>{" "}
                              {selectedTanks.length === 0 ? (
                                <>
                                  <Form.Control
                                    readOnly
                                    type="text"
                                    value="Pas de bloc empruntée"
                                  />
                                </>
                              ) : (
                                <>
                                  {selectedTanks.map((tank) => (
                                    <React.Fragment key={tank.value}>
                                      <Form.Control
                                        type="text"
                                        readOnly
                                        value={tank.label}
                                      />
                                      <Form.Control
                                        type="hidden"
                                        name="selectedTanks"
                                        value={tank.value}
                                      />
                                    </React.Fragment>
                                  ))}
                                </>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mt-3 mb-3">
                            {/* ============================================User===================================== */}
                            <Form.Group>
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-person"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>{" "}
                                Nom de l'emprunteur
                              </Form.Label>
                              <Form.Control
                                readOnly
                                type="text"
                                value={selectedUser.label}
                              />
                            </Form.Group>
                          </Col>

                          <input
                            type="hidden"
                            name="userId"
                            value={selectedUser.value}
                          />
                        </Row>
                        <hr></hr>
                        <Row className="align-items-end">
                          <Col md={6} className="mt-3">
                            {/* ============================================Confirmation Date===================================== */}
                            <Form.Group controlId="reservationDate">
                              <Form.Label className="label">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-calendar"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>{" "}
                                Date
                              </Form.Label>
                              <Form.Control
                                readOnly
                                type="date"
                                value={confirmationDate}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Button
                              className="btnRed mt-3 btn-sm"
                              size="lg"
                              block="block"
                              type="submit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-file-earmark-arrow-down"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                              </svg>{" "}
                              <span className="menu ">Restitution</span>
                            </Button>
                          </Col>
                        </Row>
                        <Button
                          className="btn btnBlue mt-3 btn-sm me-2"
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
                      </Form>
                    )}
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

export default ReturnReservation;
