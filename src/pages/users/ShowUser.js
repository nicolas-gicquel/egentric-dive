import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import auth from "../../services/auth/token.js";

const ShowUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [showUser, setShowUser] = useState("");
  const role = auth.getRoles();
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  useEffect(() => {
    displayShowUser();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${user}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setShowUser(response.data.data);
      setImage(response.data.data.picture);

      // console.log(showUser);
      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
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

  const deleteShowUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        navigate("/users"); // Redirige vers la page d'index après la suppression
      })
      .catch((error) => {
        console.log(error);
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
            <Col xs={10} sm={11}>
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>{" "}
                    <span className="menu">Compte de {showUser.pseudo}</span>
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
                            <th>Image</th>
                            <td>
                              {showUser.picture === null ? (
                                "Aucune"
                              ) : (
                                <img
                                  src={`http://localhost:8000/storage/uploads/users/${image}`}
                                  alt={showUser.picture}
                                  width="100px"
                                />
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th>Pseudo</th>
                            <td>{showUser.pseudo}</td>
                          </tr>
                          <tr>
                            <th>Civilité</th>
                            <td>{showUser.civility}</td>
                          </tr>
                          <tr>
                            <th>Nom</th>
                            <td>{showUser.lastname}</td>
                          </tr>
                          <tr>
                            <th>Prénom</th>
                            <td>{showUser.firstname}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{showUser.email_user}</td>
                          </tr>
                          <tr>
                            <th>Téléphone</th>
                            <td>{showUser.phone}</td>
                          </tr>
                          <tr>
                            <th>Portable</th>
                            <td>{showUser.cellphone}</td>
                          </tr>
                          <tr>
                            <th>Adresse</th>
                            <td>{showUser.address}</td>
                          </tr>
                          <tr>
                            <th>Code postal</th>
                            <td>{showUser.zip}</td>
                          </tr>
                          <tr>
                            <th>Ville</th>
                            <td>{showUser.city}</td>
                          </tr>
                          <tr>
                            <th>Nom de l'image</th>
                            <td>
                              {showUser.picture === null
                                ? "Aucun"
                                : showUser.picture}
                            </td>
                          </tr>
                          <tr>
                            <th>Numéro de Licence</th>
                            <td>{showUser.license_number}</td>
                          </tr>
                          <tr>
                            <th>Date de la licence</th>
                            <td>{formatDateShow(showUser.license_date)}</td>
                          </tr>
                          <tr>
                            <th>Licencié</th>
                            <td>
                              {showUser.licensee === 1 ? (
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
                          <tr>
                            <th>Date du certificat médical</th>
                            <td>
                              {formatDateShow(
                                showUser.medical_certificate_date
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th>Role</th>
                            <td>{showUser.role}</td>
                          </tr>
                          <tr>
                            <th>Date de création</th>
                            <td>{formatDateShow2(showUser.created_at)}</td>
                          </tr>
                          <tr>
                            <th>Date de modification</th>
                            <td>{formatDateShow2(showUser.updated_at)}</td>
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
                                to={`/users/edit/${showUser.id}`}
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
                              {role === 1 ? (
                                <Button
                                  className="btn btnRed btn-sm"
                                  onClick={() => {
                                    deleteShowUser(showUser.id);
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

export default ShowUser;
