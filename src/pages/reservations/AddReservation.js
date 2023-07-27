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

const AddReservation = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [reservationDate, setReservationDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const userCoId = auth.getId();
  const role = auth.getRoles();
  const firstname = auth.getFirstname();
  const lastname = auth.getLastname();

  const [users, setUsers] = useState([]); // Tableau de données des utilisateurs
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedRegulator, setSelectedRegulator] = useState({
    value: "",
    label: "Aucun détendeur",
  });
  const [selectedRegulatorId, setSelectedRegulatorId] = useState("");

  const [selectedBcd, setSelectedBcd] = useState({
    value: "",
    label: "Aucune Stab",
  });
  const [selectedBcdId, setSelectedBcdId] = useState("");

  const [selectedTanks, setSelectedTanks] = useState([]);

  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);
  const [reservationsDateRegulator, setReservationsDateRegulator] = useState(
    []
  );
  const [reservationsDateBcd, setReservationsDateBcd] = useState([]);
  const [reservationsDateTank, setReservationsDateTank] = useState([]);

  // // ------------Envoyé mes requetes DateReservations pour les selects----------------------------------------//

  const AddReservationsDate = async (event) => {
    event.preventDefault();
    setIsFirstFormSubmitted(true);

    const formData = new FormData();
    formData.append("start_date", reservationDate);
    formData.append("end_date", returnDate);

    await axios
      .post(
        `http://127.0.0.1:8000/api/check-availability-regulator`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        setReservationsDateRegulator(res.data);
        // console.log(res.data);
      });

    await axios
      .post(`http://127.0.0.1:8000/api/check-availability-bcd`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setReservationsDateBcd(res.data);
        // console.log(res.data);
      });

    await axios
      .post(`http://127.0.0.1:8000/api/check-availability-tank`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setReservationsDateTank(res.data);
        // console.log(res.data);
      });
  };

  useEffect(() => {
    displayUsers();
  }, []);
  console.log(users);
  // // ------------Select users----------------------------------------//

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
  // // ------------Select regulators----------------------------------------//

  const handleNameChangeR = (selectedOptionR) => {
    setSelectedRegulator(selectedOptionR);
    setSelectedRegulatorId(selectedOptionR.value);
  };

  let sortedOptionsR = [];
  if (reservationsDateRegulator.length > 0) {
    sortedOptionsR = [
      { value: "", label: "Aucun détendeur" },
      ...reservationsDateRegulator.map((regulator) => ({
        value: regulator.id,
        label: `${regulator.code_regulator}`,
      })),
    ].sort((a, b) => a.label.localeCompare(b.label));
  } else {
    sortedOptionsR = [];
  }

  // // ------------Select bcds----------------------------------------//

  const handleNameChangeB = (selectedOptionB) => {
    setSelectedBcd(selectedOptionB);
    setSelectedBcdId(selectedOptionB.value);
  };

  let sortedOptionsB = [];
  if (reservationsDateBcd.length > 0) {
    sortedOptionsB = [
      { value: "", label: "Aucune Stab" },
      ...reservationsDateBcd.map((bcd) => ({
        value: bcd.id,
        label: `${bcd.code_BCD} - ${bcd.size_BCD}`,
      })),
    ].sort((a, b) => {
      if (a.label === "Aucune Stab") {
        return -1; // Place 'Aucune Stab' en premier
      }
      if (b.label === "Aucune Stab") {
        return 1; // Place 'Aucune Stab' en premier
      }
      return a.label.localeCompare(b.label);
    });
  } else {
    sortedOptionsB = [];
  }

  // // ------------Multi Select tanks----------------------------------------//
  const handleNameChangeT = (selectedOptionT) => {
    setSelectedTanks(selectedOptionT);
  };
  let sortedOptionsT = [];
  if (reservationsDateTank.length > 0) {
    sortedOptionsT = [
      { value: "", label: "Aucun Bloc" },
      ...reservationsDateTank.map((tank) => ({
        value: tank.id,
        label: `${tank.code_tank} - ${tank.capacity_tank} Litres - ${tank.outlet_tank} sortie - ${tank.gas_tank}`,
      })),
    ].sort((a, b) => {
      if (a.label === "Aucun Bloc") {
        return -1; // Place 'Aucun Bloc' en premier
      }
      if (b.label === "Aucun Bloc") {
        return 1; // Place 'Aucun Bloc' en premier
      }
      return a.label.localeCompare(b.label);
    });
  } else {
    sortedOptionsT = [];
  }

  // // ------------Fonction d'ajout de reservation-------------------------------------------
  const AddReservations = async (e) => {
    e.preventDefault();

    // Determine the user ID based on the role
    const userId = role === 1 || role === 2 ? selectedUser.value : userCoId;

    const formData = new FormData();
    formData.append("reservation_date", reservationDate);
    formData.append("return_date", returnDate);
    formData.append("user_id", userId);
    formData.append("BCD_id", selectedBcdId);
    formData.append("regulator_id", selectedRegulatorId);

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
      .post(`http://127.0.0.1:8000/api/reservations`, formData, {
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
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="reservation"
                      viewBox="0 0 58.69 45.96"
                    >
                      <path d="m5.17,34.55h48.35c.55,0,1-.45,1-1,0-12.83-9.89-23.74-22.6-25.04V3.91h2.82V0h-10.78v3.91h2.82v4.61c-12.71,1.3-22.6,12.21-22.6,25.04,0,.55.45,1,1,1ZM29.07,10.39h.28c12.34,0,22.62,9.89,23.15,22.17H17.51c.43-11.06,7.73-20.68,11.56-22.17Zm-7.38,1.3c-3.69,2.93-9.13,9.21-9.43,20.87h-6.06c.41-9.45,6.7-17.76,15.5-20.87Z" />
                      <path d="m58.53,44.41l-4.17-6.38c-.19-.28-.5-.45-.84-.45H5.17c-.34,0-.65.17-.84.45L.16,44.41c-.2.31-.22.7-.04,1.02.17.32.51.52.88.52h56.69c.37,0,.71-.2.88-.52.18-.32.16-.72-.04-1.02Zm-5.55-4.83l2.86,4.38H17.98v-4.38h35Zm-40.88,0l-.99,4.38H2.85l2.86-4.38h6.39Z" />{" "}
                    </svg>{" "}
                    <span className="menu">Réserver</span>
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

                    <Form onSubmit={AddReservationsDate}>
                      <Row className="align-items-end">
                        <Col md={6} lg={4} className="mt-3">
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
                              type="date"
                              value={reservationDate}
                              onChange={(event) => {
                                setReservationDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6} lg={4} className="mt-3">
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
                              type="date"
                              value={returnDate}
                              onChange={(event) => {
                                setReturnDate(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={12} md={12} lg={4}>
                          <Button
                            className="btnGreen mt-4 btn-sm"
                            size="lg"
                            block="block"
                            type="submit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-calendar-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>{" "}
                            <span className="menu ">Valider date</span>
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                    {isFirstFormSubmitted && (
                      <Form onSubmit={AddReservations}>
                        <Row className="mt-3">
                          <Col md={6} className="mt-3">
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
                              <Select
                                options={sortedOptionsR.map((regulator) => ({
                                  value: regulator.value,
                                  label: regulator.label,
                                }))}
                                value={selectedRegulator}
                                onChange={handleNameChangeR}
                                placeholder="Sélectionnez un détendeur"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mt-3">
                            <Form.Group>
                              <Form.Label className="label">
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
                              <Select
                                options={sortedOptionsB.map((bcd) => ({
                                  value: bcd.value,
                                  label: bcd.label,
                                }))}
                                value={selectedBcd}
                                onChange={handleNameChangeB}
                                placeholder="Sélectionnez une stab"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="mt-3">
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
                              </Form.Label>
                              <Select
                                options={sortedOptionsT.map((tank) => ({
                                  value: tank.value,
                                  label: tank.label,
                                }))}
                                value={selectedTanks}
                                onChange={handleNameChangeT}
                                isMulti
                                placeholder="Sélectionnez un ou des Blocs"
                              />
                            </Form.Group>
                          </Col>
                          {role === 1 || role === 2 ? (
                            <Col md={6} className="mt-3">
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
                                <Select
                                  options={sortedOptions}
                                  value={selectedUser}
                                  onChange={handleNameChange}
                                  placeholder="Sélectionnez un nom"
                                />
                              </Form.Group>
                            </Col>
                          ) : (
                            <input
                              type="hidden"
                              name="userCoId"
                              value={userCoId}
                            />
                          )}
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
                          <span className="menu ">Réserver</span>
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

export default AddReservation;
