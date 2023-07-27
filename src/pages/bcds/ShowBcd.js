import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowBcd = () => {
  const { bcd } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [showBcd, setShowBcd] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  useEffect(() => {
    displayShowBcd();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowBcd = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/bcds/${bcd}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      // console.log(res.data.data);
      setShowBcd(response.data.data);
      setImage(response.data.data.qrcode_BCD);

      // console.log(res.data[0]);
      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
  };

  const deleteShowBcd = (id) => {
    axios
      .delete(`http://localhost:8000/api/bcds/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        navigate("/bcds"); // Redirige vers la page d'index après la suppression
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

  // ============================================================== vérification plus de 2ans =================================
  // Vérifie si la date est expirée (plus de deux ans)
  const isDateExpired2 = (date) => {
    const twoYearInMilliseconds = 63072000000; // Nombre de millisecondes dans deux ans
    const currentDate = new Date(); // Date actuelle

    // Convertit la date du tiv en objet Date
    const revisionBcdDate = new Date(date);

    // Vérifie si la différence entre la date actuelle et la date du tiv dépasse un an
    return currentDate - revisionBcdDate > twoYearInMilliseconds;
  };

  const revisionBcdDate = formatDateShow(showBcd.revision_BCD_date);
  const isExpired2 = isDateExpired2(showBcd.revision_BCD_date);

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
                    <span className="menu">Stab {showBcd.code_BCD}</span>
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
                            <th>Code</th>
                            <td>{showBcd.code_BCD}</td>
                          </tr>
                          <tr>
                            <th>Marque</th>
                            <td>{showBcd.mark_BCD}</td>
                          </tr>
                          <tr>
                            <th>Modèle</th>
                            <td>{showBcd.model_BCD}</td>
                          </tr>
                          <tr>
                            <th>Taille</th>
                            <td>{showBcd.size_BCD}</td>
                          </tr>

                          <tr>
                            <th>Année</th>
                            <td>{showBcd.year_BCD}</td>
                          </tr>
                          <tr>
                            <th>Date de la révision</th>
                            <td className={isExpired2 ? "expired2" : ""}>
                              {isExpired2 && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  class="bi bi-exclamation-circle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>
                              )}
                              {revisionBcdDate}
                            </td>
                          </tr>
                          <tr>
                            <th>nom QrCode</th>
                            <td>
                              {showBcd.qrcode_BCD === null
                                ? "Aucun"
                                : showBcd.qrcode_BCD}
                            </td>
                          </tr>
                          <tr>
                            <th>image QrCode</th>
                            <td>
                              {showBcd.qrcode_BCD === null ? (
                                "Aucune"
                              ) : (
                                <img
                                  src={`http://localhost:8000/storage/uploads/bcds/${image}`}
                                  alt={showBcd.qrcode_BCD}
                                  width="100px"
                                />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Compteur d'emprunt</th>
                            <td
                              className={
                                showBcd.counter_loan_BCD >= 100
                                  ? "expired2"
                                  : ""
                              }
                            >
                              {showBcd.counter_loan_BCD >= 100 ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  class="bi bi-exclamation-circle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>
                              ) : null}
                              {showBcd.counter_loan_BCD}
                            </td>
                          </tr>
                          <tr>
                            <th>Disponibilité</th>
                            <td
                              className={
                                showBcd.availability_BCD === 0
                                  ? "expired2"
                                  : null
                              }
                            >
                              {showBcd.availability_BCD === 1
                                ? "Disponible"
                                : "Indisponible"}
                            </td>
                          </tr>
                          {showBcd.availability_BCD === 0 ? (
                            <tr>
                              <th>Cause d'indisponibilité</th>
                              <td>{showBcd.cause_unavailability_BCD}</td>
                            </tr>
                          ) : null}
                          <tr>
                            <th>Date de création</th>
                            <td>{formatDateShow2(showBcd.created_at)}</td>
                          </tr>
                          <tr>
                            <th>Date de modification</th>
                            <td>{formatDateShow2(showBcd.updated_at)}</td>
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
                              <Link
                                to={`/bcds/edit/${showBcd.id}`}
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

                              <Button
                                className="btn btnRed btn-sm"
                                onClick={() => {
                                  deleteShowBcd(showBcd.id);
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

export default ShowBcd;
