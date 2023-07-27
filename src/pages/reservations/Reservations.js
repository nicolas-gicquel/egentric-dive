import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  const formatDate = (date) => {
    const dateParts = date.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  };

  useEffect(() => {
    displayReservations();
  }, []); // Sans les crochets ça tourne en boucle

  // // ------------Affichage reservation----------------------------------------//

  const displayReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/reservations",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        }
      );

      const sortedReservations = response.data.data.sort((a, b) => {
        // Compare les dates de réservation (supposant que la date est une propriété "date" de chaque réservation)
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setReservations(sortedReservations);
      // console.log(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // ============= fonction delete =====================

  const deleteReservation = (id) => {
    axios
      .delete(`http://localhost:8000/api/reservations/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayReservations);
  };

  return (
    <div>
      <Navigation />
      <Row className="m-0">
        <Col xs={1} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={11} md={9} lg={10}>
          <Row className="justify-content-center mt-4 mb-5">
            <Col xs={10} sm={11}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="ListeResa"
                      viewBox="0 0 58.98 56.69"
                    >
                      <path d="m22.78,48.99h32.65c.4,0,.73-.33.73-.73,0-8.67-6.68-16.05-15.26-16.95v-3.01h1.91v-2.75h-7.39v2.75h1.91v3.01c-8.59.9-15.26,8.28-15.26,16.95,0,.4.33.73.73.73Zm8.39-1.46c.31-7.15,5.13-13.83,7.76-14.86h.04s.09,0,.13,0c8.29,0,15.19,6.63,15.58,14.86h-23.51Zm2.48-13.88c-2.49,2.06-5.93,6.28-6.14,13.88h-3.98c.29-6.23,4.38-11.71,10.12-13.88Z" />
                      <path d="m58.86,55.56l-2.82-4.31c-.14-.21-.36-.33-.61-.33H22.78c-.25,0-.48.12-.61.33l-2.82,4.31c-.15.22-.16.51-.03.75.13.24.37.38.64.38h38.28c.27,0,.51-.15.64-.38.13-.24.12-.52-.03-.75Zm-27.37-.33v-2.85h23.55l1.86,2.85h-25.41Zm-4.09-2.85l-.64,2.85h-5.44l1.86-2.85h4.22Z" />
                      <path d="m9.28,6.64h.59v-.11h-4.87c-.43,0-.78.35-.78.78v1.57h1.57v-.79h.9c.54-.87,1.5-1.46,2.59-1.46Z" />
                      <path d="m36.76,6.53h-5.21v1.57h4.43v16.48h1.57V7.31c0-.43-.35-.78-.78-.78Z" />
                      <path d="m35.97,30.52c.12-.02.24-.05.36-.07v-1.17h-.36v1.23Z" />
                      <path d="m28.05,4.38h-2.99c0-2.42-1.96-4.38-4.38-4.38-1.66,0-3.1.92-3.84,2.28.47.03.93.12,1.37.26,0,0,0,0,.01,0,.44.14.85.33,1.23.57,0,0,0,0,0,0,.32-.31.75-.5,1.23-.5.98,0,1.77.79,1.77,1.77,0,.57-.27,1.07-.69,1.39,0,0,0,0,0,0,.06.14.11.28.16.42.05.15.09.29.13.44h1.78c1.68,0,3.05,1.37,3.05,3.05,0,.03,0,.05,0,.08,1.64-.44,2.85-1.93,2.85-3.71,0-.93-.75-1.68-1.68-1.68Z" />
                      <path d="m33.33,10.95c0-.43-.35-.78-.78-.78h-5.21v1.57h4.43v20.1c.51-.23,1.03-.44,1.57-.62V10.95Z" />
                      <path d="m1.57,51.56V11.73h4.09v-1.57H.78c-.43,0-.78.35-.78.78v41.4c0,.43.35.78.78.78h19l1.02-1.57H1.57Z" />
                      <path d="m27.33,18.72H11.11c-.43,0-.78.35-.78.78s.35.78.78.78h16.22c.43,0,.78-.35.78-.78s-.35-.78-.78-.78Z" />
                      <path d="m6.16,19.97s.04.09.07.13c.03.04.06.08.09.12.04.04.08.07.12.09.04.03.09.05.13.07.05.02.1.04.15.04.05.01.1.02.15.02s.1,0,.15-.02c.05,0,.1-.02.15-.04.05-.02.09-.04.13-.07.04-.03.08-.06.12-.09.15-.15.23-.35.23-.56s-.08-.41-.23-.55c-.04-.04-.07-.07-.12-.1-.04-.03-.09-.05-.13-.07-.05-.02-.1-.03-.15-.04-.1-.02-.2-.02-.31,0-.05.01-.1.02-.15.04s-.09.05-.13.07c-.04.03-.08.06-.12.1-.04.04-.07.07-.09.12-.03.04-.05.09-.07.14-.02.05-.04.09-.04.14-.01.05-.02.1-.02.15s0,.1.02.15c0,.05.02.1.04.15Z" />
                      <path d="m27.33,25.09H11.11c-.43,0-.78.35-.78.78s.35.78.78.78h16.22c.43,0,.78-.35.78-.78s-.35-.78-.78-.78Z" />
                      <path d="m6.16,26.34s.04.09.07.13c.03.04.06.09.09.12.15.14.35.23.56.23s.41-.08.55-.23c.15-.14.23-.35.23-.56,0-.05,0-.1-.02-.15,0-.05-.02-.1-.04-.14-.02-.05-.04-.09-.07-.14-.03-.04-.06-.08-.1-.12-.29-.29-.81-.29-1.11,0-.04.04-.07.07-.09.12-.03.04-.05.09-.07.14-.02.05-.04.09-.04.14-.01.05-.02.1-.02.15s0,.11.02.15c0,.05.02.1.04.15Z" />
                      <path d="m27.33,31.46H11.11c-.43,0-.78.35-.78.78s.35.78.78.78h16.22c.43,0,.78-.35.78-.78s-.35-.78-.78-.78Z" />
                      <path d="m6.88,33.2c.21,0,.41-.09.55-.23.15-.14.23-.35.23-.55s-.08-.41-.23-.56c-.29-.29-.81-.29-1.11,0-.04.04-.07.08-.09.12-.03.04-.05.09-.07.14-.02.05-.04.1-.04.14-.01.05-.02.11-.02.16,0,.2.08.41.23.55.15.14.35.23.56.23Z" />
                      <path d="m11.11,37.84c-.43,0-.78.35-.78.78s.35.78.78.78h12.36c.31-.54.64-1.06,1.01-1.57h-13.36Z" />
                      <path d="m6.16,39.09s.04.09.07.14c.03.04.06.08.09.12.04.04.08.07.12.1.04.03.09.05.13.07.05.02.1.04.15.05.05,0,.1.02.15.02s.1,0,.15-.02c.05-.01.1-.03.15-.05.05-.02.09-.04.13-.07s.08-.06.12-.1c.04-.04.07-.07.1-.12.03-.04.05-.09.07-.14.02-.05.04-.09.04-.14.01-.05.02-.1.02-.15s0-.1-.02-.15c0-.05-.02-.1-.04-.15-.02-.05-.04-.09-.07-.13-.03-.04-.06-.09-.1-.12-.04-.04-.07-.07-.12-.1-.04-.03-.09-.05-.13-.07-.05-.02-.1-.04-.15-.04-.1-.02-.2-.02-.31,0-.05,0-.1.02-.15.04-.05.02-.09.04-.13.07-.04.03-.08.06-.12.1-.04.04-.07.08-.09.12-.03.04-.05.09-.07.13-.02.05-.04.1-.04.15-.01.05-.02.1-.02.15s0,.1.02.15c0,.05.02.1.04.14Z" />
                      <path d="m11.11,44.21c-.43,0-.78.35-.78.78s.35.78.78.78h10.15c.08-.53.18-1.05.3-1.57h-10.44Z" />
                      <path d="m6.16,45.46s.04.09.07.14c.03.04.06.08.09.12.15.15.35.23.56.23s.41-.08.55-.23c.15-.14.23-.34.23-.55s-.08-.41-.23-.55c-.04-.04-.07-.07-.12-.1-.04-.03-.09-.05-.13-.07-.05-.02-.1-.04-.15-.04-.1-.02-.2-.02-.31,0-.05,0-.1.02-.15.04-.05.02-.09.04-.13.07-.04.03-.08.06-.12.1-.14.14-.23.34-.23.55,0,.05,0,.1.02.15,0,.05.02.1.04.14Z" />
                      <path d="m11.07,13.54h10.6c2.13,0,3.85-1.72,3.85-3.85,0-.93-.75-1.68-1.68-1.68h-2.99c0-2.42-1.96-4.38-4.38-4.38s-4.38,1.96-4.38,4.38h-2.81c-.93,0-1.68.75-1.68,1.68v.38c0,1.91,1.55,3.47,3.47,3.47Zm5.4-7.3c.98,0,1.77.79,1.77,1.77s-.79,1.77-1.77,1.77-1.77-.79-1.77-1.77.79-1.77,1.77-1.77Z" />
                    </svg>{" "}
                    <span className="menu">Liste des réservations</span>
                  </h3>
                </div>

                <div className="card-body">
                  <Link
                    to={`/reservations/add`}
                    className="btn btnBlue btn-sm me-2 mb-2 mt-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="reservation"
                      viewBox="0 0 58.69 45.96"
                    >
                      <path d="m5.17,34.55h48.35c.55,0,1-.45,1-1,0-12.83-9.89-23.74-22.6-25.04V3.91h2.82V0h-10.78v3.91h2.82v4.61c-12.71,1.3-22.6,12.21-22.6,25.04,0,.55.45,1,1,1ZM29.07,10.39h.28c12.34,0,22.62,9.89,23.15,22.17H17.51c.43-11.06,7.73-20.68,11.56-22.17Zm-7.38,1.3c-3.69,2.93-9.13,9.21-9.43,20.87h-6.06c.41-9.45,6.7-17.76,15.5-20.87Z" />
                      <path d="m58.53,44.41l-4.17-6.38c-.19-.28-.5-.45-.84-.45H5.17c-.34,0-.65.17-.84.45L.16,44.41c-.2.31-.22.7-.04,1.02.17.32.51.52.88.52h56.69c.37,0,.71-.2.88-.52.18-.32.16-.72-.04-1.02Zm-5.55-4.83l2.86,4.38H17.98v-4.38h35Zm-40.88,0l-.99,4.38H2.85l2.86-4.38h6.39Z" />{" "}
                    </svg>{" "}
                    <span className="menu">Réservation</span>
                  </Link>
                  {isLoading ? (
                    // Afficher un message de chargement pendant le chargement des données
                    <p>Loading...</p>
                  ) : (
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Réf</th>
                            <th className="d-none d-md-table-cell">
                              Emprunteur
                            </th>
                            <th>Date emprunt</th>
                            <th className="d-none d-lg-table-cell">
                              Détendeur
                            </th>
                            <th className="d-none d-lg-table-cell">Stab</th>
                            <th className="d-none d-lg-table-cell">Bloc</th>
                            <th>Restituer</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                              <td>{reservation.id}</td>
                              <td className="d-none d-md-table-cell">
                                {reservation.lastname} {reservation.firstname}
                              </td>
                              <td>
                                {formatDate(reservation.reservation_date)}
                              </td>
                              <td className="d-none d-lg-table-cell">
                                {reservation.code_regulator}
                              </td>
                              <td className="d-none d-lg-table-cell">
                                {reservation.code_BCD}
                              </td>
                              <td className="d-none d-lg-table-cell">
                                <ul>
                                  {reservation.tanks.map((tank) => (
                                    <li key={tank.code_tank}>
                                      {tank.code_tank}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                {reservation.return_confirmation === 1 ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="rgb(149, 176, 51)"
                                    className="bi bi-check-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="rgb(176, 96, 86)"
                                    className="bi bi-x-octagon"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                  </svg>
                                )}
                              </td>
                              <td>
                                <Link
                                  to={`/reservations/show/${reservation.id}`}
                                  className="btn btnBlue2 btn-sm me-2"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                  </svg>{" "}
                                  <span className="menu">Voir</span>
                                </Link>
                                {reservation.return_confirmation === 0 ? (
                                  <Link
                                    to={`/reservations/edit/${reservation.id}`}
                                    className="btn btnGreen btn-sm me-2"
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
                                    <span className="menu">Modifier</span>
                                  </Link>
                                ) : null}
                                <Button
                                  className="btn btnRed btn-sm me-2"
                                  onClick={() => {
                                    deleteReservation(reservation.id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash3"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                  </svg>{" "}
                                  <span className="menu">Supprimer</span>
                                </Button>
                                {reservation.return_confirmation === 0 ? (
                                  <Link
                                    to={`/reservations/return/${reservation.id}`}
                                    className="btn btnBlue3 btn-sm"
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
                                    <span className="menu">Restituer</span>
                                  </Link>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
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

export default Reservations;
