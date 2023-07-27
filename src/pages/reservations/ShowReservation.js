import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowReservation = () => {
  const { reservation } = useParams();
  const navigate = useNavigate();
  const [showReservation, setShowReservation] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  useEffect(() => {
    displayShowReservation();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reservations/${reservation}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setShowReservation(response.data.data);
      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
  };

  const deleteShowReservation = (id) => {
    axios
      .delete(`http://localhost:8000/api/reservations/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        navigate("/reservations"); // Redirige vers la page d'index après la suppression
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDateShow = (date) => {
    if (date) {
      const dateParts = date.split("-");
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      return formattedDate;
    }
    return ""; // ou une autre valeur par défaut si date n'est pas définie
  };

  const formatDateShow2 = (date) => {
    if (date) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("fr", options).format(
        new Date(date)
      );
      return formattedDate;
    }
    return ""; // ou une autre valeur par défaut si date n'est pas définie
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
                      className="reservation"
                      viewBox="0 0 63.01 56.69"
                    >
                      <path d="m62.89,55.49l-3.01-4.6c-.14-.22-.39-.35-.65-.35h-23.62v-2.06h23.62c.43,0,.78-.35.78-.78,0-9.27-7.13-17.15-16.31-18.12v-3.21h2.04v-2.94h-7.9v2.94h2.04v3.21c-1.48.16-2.91.49-4.26.99V7.82c0-.46-.37-.84-.84-.84h-5.57v1.67h4.73v22.62c-2.56,1.24-4.79,3.06-6.51,5.28h-15.55c-.46,0-.84.37-.84.84s.37.84.84.84h14.39c-.97,1.58-1.7,3.31-2.16,5.14h-12.23c-.46,0-.84.37-.84.84s.37.84.84.84h11.9c-.13.87-.2,1.76-.2,2.66,0,.43.35.78.78.78h9.59v2.06h-9.59c-.26,0-.51.13-.65.35l-.21.33H1.67V8.65h4.37v-1.67H.84c-.46,0-.84.37-.84.84v44.23c0,.46.37.84.84.84h21.55l-1.7,2.6c-.16.24-.17.54-.03.8.14.25.4.41.69.41h40.9c.29,0,.55-.16.69-.41.14-.25.12-.56-.03-.8Zm-33.49-8.58h-4.26c.03-.63.1-1.26.2-1.88.09-.57.22-1.13.37-1.67.51-1.85,1.33-3.58,2.41-5.14.4-.57.83-1.12,1.3-1.64,1.28-1.43,2.81-2.64,4.52-3.57.54-.29,1.1-.56,1.67-.79.12-.05.23-.09.35-.14-.11.09-.23.2-.35.3-.54.47-1.11,1.03-1.67,1.7-1.77,2.07-3.51,5.12-4.22,9.45-.07.46-.14.93-.19,1.42-.06.63-.12,1.27-.13,1.95Zm3.91,0c.06-1.41.29-2.8.63-4.14.41-1.61,1-3.14,1.67-4.54,1.82-3.76,4.32-6.54,5.99-7.2h.05s.09,0,.14,0c8.86,0,16.23,7.09,16.64,15.88h-25.13Zm-4.72,8.23h-5.81l1.47-2.25.52-.79h4.51l-.18.79-.51,2.25Zm5.06,0v-3.05h25.16l1.99,3.05h-27.15Z" />
                      <path d="m29.2,16.12H11.87c-.46,0-.84.37-.84.84s.37.84.84.84h17.34c.46,0,.84-.37.84-.84s-.37-.84-.84-.84Z" />
                      <path d="m6.58,17.46c.02.05.05.1.08.14.03.05.06.09.1.13.04.04.08.07.13.1.05.03.09.06.14.08.05.02.1.04.16.05.05.01.11.02.16.02s.11,0,.16-.02c.05,0,.1-.03.16-.05.05-.02.1-.05.14-.08.05-.03.09-.06.13-.1.16-.16.25-.37.25-.59s-.09-.44-.25-.59c-.04-.04-.08-.08-.13-.1-.05-.03-.09-.06-.14-.08-.05-.02-.1-.03-.16-.05-.11-.02-.22-.02-.33,0-.05.01-.11.03-.16.05s-.1.05-.14.08c-.05.03-.09.06-.13.1-.04.04-.07.08-.1.13-.03.05-.06.1-.08.15-.02.05-.04.1-.05.15-.01.05-.02.11-.02.16s0,.11.02.16c0,.05.03.11.05.16Z" />
                      <path d="m29.2,22.93H11.87c-.46,0-.84.37-.84.84s.37.84.84.84h17.34c.46,0,.84-.37.84-.84s-.37-.84-.84-.84Z" />
                      <path d="m6.58,24.26c.02.05.05.1.08.14.03.05.06.09.1.13.16.15.37.24.59.24s.44-.09.59-.24c.16-.15.25-.37.25-.59,0-.05,0-.11-.02-.16,0-.05-.03-.1-.05-.15-.02-.05-.05-.1-.08-.15-.03-.05-.06-.09-.1-.13-.31-.31-.87-.31-1.18,0-.04.04-.07.08-.1.13-.03.05-.06.1-.08.15-.02.05-.04.1-.05.15-.01.05-.02.11-.02.16s0,.11.02.16c0,.05.03.11.05.16Z" />
                      <path d="m29.2,29.74H11.87c-.46,0-.84.37-.84.84s.37.84.84.84h17.34c.46,0,.84-.37.84-.84s-.37-.84-.84-.84Z" />
                      <path d="m7.36,31.59c.22,0,.44-.09.59-.25.16-.15.25-.37.25-.59s-.09-.44-.25-.59c-.31-.31-.87-.31-1.18,0-.04.04-.07.08-.1.13-.03.05-.06.1-.08.15-.02.05-.04.1-.05.15-.01.05-.02.11-.02.17,0,.22.09.44.24.59.16.15.37.25.59.25Z" />
                      <path d="m6.58,37.88c.02.05.05.1.08.15.03.05.06.09.1.13.04.04.08.08.13.1.05.03.09.05.14.08.05.02.1.04.16.05.05,0,.11.02.16.02s.11,0,.16-.02c.05-.01.1-.03.16-.05.05-.02.1-.05.14-.08s.09-.07.13-.1c.04-.04.08-.08.1-.13.03-.05.06-.1.08-.15.02-.05.04-.1.05-.15.01-.05.02-.11.02-.16s0-.11-.02-.16c0-.05-.03-.11-.05-.16-.02-.05-.05-.1-.08-.14-.03-.05-.06-.09-.1-.13-.04-.04-.08-.07-.13-.1-.05-.03-.09-.05-.14-.08-.05-.02-.1-.04-.16-.05-.11-.02-.22-.02-.33,0-.05,0-.11.03-.16.05-.05.02-.1.05-.14.08-.05.03-.09.07-.13.1-.04.04-.07.08-.1.13-.03.04-.06.09-.08.14-.02.05-.04.1-.05.16-.01.05-.02.11-.02.16s0,.11.02.16c0,.05.03.1.05.15Z" />
                      <path d="m6.58,44.69c.02.05.05.1.08.15.03.05.06.09.1.13.16.16.37.25.59.25s.44-.09.59-.25c.16-.15.25-.37.25-.59s-.09-.44-.25-.59c-.04-.04-.08-.08-.13-.1-.05-.03-.09-.06-.14-.08-.05-.02-.1-.04-.16-.05-.11-.02-.22-.02-.33,0-.05,0-.11.03-.16.05-.05.02-.1.05-.14.08-.05.03-.09.06-.13.1-.15.15-.24.37-.24.59,0,.05,0,.11.02.16,0,.05.03.1.05.15Z" />
                      <path d="m11.83,10.58h11.32c2.27,0,4.11-1.84,4.11-4.11,0-.99-.8-1.79-1.79-1.79h-3.19c0-2.58-2.1-4.68-4.68-4.68s-4.68,2.1-4.68,4.68h-3c-.99,0-1.79.8-1.79,1.79v.41c0,2.05,1.66,3.7,3.7,3.7Zm5.77-7.8c1.04,0,1.89.85,1.89,1.89s-.85,1.89-1.89,1.89-1.89-.85-1.89-1.89.85-1.89,1.89-1.89Z" />
                    </svg>{" "}
                    <span className="menu">
                      Réservation N°{showReservation.id}
                    </span>
                  </h3>
                </div>

                <div className="card-body">
                  {isLoading ? (
                    // Afficher un message de chargement pendant le chargement des données
                    <p>Loading...</p>
                  ) : (
                    // Afficher les données une fois qu'elles sont récupérées
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <tbody>
                          <tr>
                            <th>Référence</th>
                            <td>{showReservation.id}</td>
                          </tr>
                          <tr>
                            <th>Emprunteur</th>
                            <td>
                              {showReservation.lastname}{" "}
                              {showReservation.firstname}
                            </td>
                          </tr>
                          <tr>
                            <th>Date de l'emprunt</th>
                            <td>
                              {formatDateShow(showReservation.reservation_date)}
                            </td>
                          </tr>
                          <tr>
                            <th>Date de Retour</th>
                            <td>
                              {formatDateShow(showReservation.return_date)}
                            </td>
                          </tr>
                          <tr>
                            <th>Détendeur</th>
                            <td>{showReservation.code_regulator}</td>
                          </tr>
                          <tr>
                            <th>Stab</th>
                            <td>
                              {showReservation.code_BCD}
                              {showReservation.size_BCD && (
                                <span>
                                  <span className="circle"></span>
                                  Taille {showReservation.size_BCD}
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Bloc</th>
                            <td>
                              <ul>
                                {showReservation.tanks.map((tank) => (
                                  <li key={tank.id}>
                                    {tank.code_tank}
                                    <span className="circle"></span>
                                    {tank.capacity_tank} litres
                                    <span className="circle"></span>
                                    {tank.outlet_tank === 1
                                      ? "1 sortie"
                                      : `${tank.outlet_tank} sorties`}
                                    <span className="circle"></span>
                                    {tank.gas_tank}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th>Restitué</th>
                            <td>
                              {showReservation.return_confirmation === 1 ? (
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
                          </tr>
                          {showReservation.return_confirmation === 1 ? (
                            <tr>
                              <th>Date de restitution</th>
                              <td>
                                {formatDateShow(
                                  showReservation.confirmation_date
                                )}
                              </td>
                            </tr>
                          ) : null}
                          <tr>
                            <th>Date de création</th>
                            <td>
                              {formatDateShow2(showReservation.created_at)}
                            </td>
                          </tr>
                          <tr>
                            <th>Date de modification</th>
                            <td>
                              {formatDateShow2(showReservation.updated_at)}
                            </td>
                          </tr>
                          <tr>
                            <th>Actions</th>
                            <td>
                              <Button
                                className="btn btnBlue btn-sm me-2"
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
                              {showReservation.return_confirmation === 0 ? (
                                <Link
                                  to={`/reservations/edit/${showReservation.id}`}
                                  className="btn btnGreen btn-1 btn-sm me-2"
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
                                  deleteShowReservation(showReservation.id);
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
                              {showReservation.return_confirmation === 0 ? (
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

export default ShowReservation;
