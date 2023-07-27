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

const ShowRegulator = () => {
  const { regulator } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [showRegulator, setShowRegulator] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  useEffect(() => {
    displayShowRegulator();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowRegulator = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/regulators/${regulator}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      // console.log(res.data.data);
      setShowRegulator(response.data.data);
      setImage(response.data.data.qrcode_regulator);

      // console.log(res.data[0]);
      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
  };

  const deleteShowRegulator = (id) => {
    axios
      .delete(`http://localhost:8000/api/regulators/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        navigate("/regulators"); // Redirige vers la page d'index après la suppression
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
    const revisionRegulatorDate = new Date(date);

    // Vérifie si la différence entre la date actuelle et la date du tiv dépasse un an
    return currentDate - revisionRegulatorDate > twoYearInMilliseconds;
  };

  const revisionRegulatorDate = formatDateShow(
    showRegulator.revision_regulator_date
  );
  const isExpired2 = isDateExpired2(showRegulator.revision_regulator_date);

  // ============================================================== vérification moins de 2 mois avant expiration =================================

  // Vérifie si on est à moins de 2 mois avant la date d'expiration (2 ans)
  const isTwoMonthsBeforeExpiration2 = (date) => {
    const currentDate = new Date(); // Date actuelle

    // Convertit la date du tiv en objet Date
    const revisionRegulatorDate = new Date(date);

    // Ajoute 2 ans à la date de requalification
    revisionRegulatorDate.setFullYear(revisionRegulatorDate.getFullYear() + 2);

    // Soustrait deux mois à la date d'expiration
    const twoMonthsBeforeExpiration = new Date(revisionRegulatorDate);
    twoMonthsBeforeExpiration.setMonth(revisionRegulatorDate.getMonth() - 2);

    // Vérifie si la date actuelle est supérieure à la date deux mois avant la date d'expiration
    return currentDate > twoMonthsBeforeExpiration;
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
                    <span className="menu">
                      Détendeur {showRegulator.code_regulator}
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
                            <th>Code</th>
                            <td>{showRegulator.code_regulator}</td>
                          </tr>
                          <tr>
                            <th>Marque</th>
                            <td>{showRegulator.mark_regulator}</td>
                          </tr>
                          <tr>
                            <th>Modèle</th>
                            <td>{showRegulator.model_regulator}</td>
                          </tr>
                          <tr>
                            <th>Année</th>
                            <td>{showRegulator.year_regulator}</td>
                          </tr>
                          <tr>
                            <th>Date de la révision</th>
                            <td
                              className={`${
                                isExpired2
                                  ? "expired"
                                  : isTwoMonthsBeforeExpiration2(
                                      showRegulator.revision_regulator_date
                                    )
                                  ? "expired2"
                                  : ""
                              }`}
                            >
                              {isExpired2 &&
                                isTwoMonthsBeforeExpiration2(
                                  showRegulator.revision_regulator_date
                                ) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-exclamation-triangle"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                  </svg>
                                )}
                              {!isExpired2 &&
                                isTwoMonthsBeforeExpiration2(
                                  showRegulator.revision_regulator_date
                                ) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-exclamation-circle"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                  </svg>
                                )}
                              {!isExpired2 &&
                                !isTwoMonthsBeforeExpiration2(
                                  showRegulator.revision_regulator_date
                                ) &&
                                null}
                              {revisionRegulatorDate}
                            </td>{" "}
                          </tr>
                          <tr>
                            <th>Nom QrCode</th>
                            <td>
                              {showRegulator.qrcode_regulator === null
                                ? "Aucun"
                                : showRegulator.qrcode_regulator}
                            </td>
                          </tr>
                          <tr>
                            <th>Image QrCode</th>
                            <td>
                              {" "}
                              {showRegulator.qrcode_regulator === null ? (
                                "Aucune"
                              ) : (
                                <img
                                  src={`http://localhost:8000/storage/uploads/regulators/${image}`}
                                  alt={showRegulator.qrcode_regulator}
                                  width="100px"
                                />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Compteur d'emprunt</th>
                            <td
                              className={
                                showRegulator.counter_loan_regulator >= 100
                                  ? "expired"
                                  : ""
                              }
                            >
                              {showRegulator.counter_loan_regulator >= 100 ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  class="bi bi-exclamation-triangle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                </svg>
                              ) : null}
                              {showRegulator.counter_loan_regulator}
                            </td>
                          </tr>
                          <tr>
                            <th>Disponibilité</th>
                            <td
                              className={
                                showRegulator.availability_regulator === 0
                                  ? "expired2"
                                  : null
                              }
                            >
                              {showRegulator.availability_regulator === 1
                                ? "Disponible"
                                : "Indisponible"}
                            </td>
                          </tr>
                          {showRegulator.availability_regulator === 0 ? (
                            <tr>
                              <th>Cause d'indisponibilité</th>
                              <td>
                                {showRegulator.cause_unavailability_regulator}
                              </td>
                            </tr>
                          ) : null}
                          <tr>
                            <th>Date de création</th>
                            <td>{formatDateShow2(showRegulator.created_at)}</td>
                          </tr>
                          <tr>
                            <th>Date de modification</th>
                            <td>{formatDateShow2(showRegulator.updated_at)}</td>
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
                                to={`/regulators/edit/${showRegulator.id}`}
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
                                  deleteShowRegulator(showRegulator.id);
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

export default ShowRegulator;
