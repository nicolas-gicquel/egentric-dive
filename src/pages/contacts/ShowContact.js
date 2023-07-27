import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

const ShowContact = () => {
  const { contact } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  useEffect(() => {
    displayShowContact();
  }, []);
  // Sans les crochets ça tourne en boucle

  const formatDate = (date) => {
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

  const displayShowContact = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/contacts/${contact}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      // console.log(res.data.data[0]);
      setShowContact(response.data.data[0]);

      setIsLoading(false); // Mettez isLoading à false une fois les données récupérées
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      setIsLoading(false); // Mettez isLoading à false en cas d'erreur également
    }
  };

  const deleteShowContact = (id) => {
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        displayShowContact();
        navigate("/contacts"); // Navigation à la page précédente
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
                      className="bi bi-envelope-at"
                      viewBox="0 0 16 16"
                    >
                      Name
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>{" "}
                    <span className="menu">Contact</span>
                  </h3>

                  <hr />
                  {isLoading ? (
                    // Afficher un message de chargement pendant le chargement des données
                    <p>Loading...</p>
                  ) : (
                    // Afficher les données une fois qu'elles sont récupérées
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <tbody>
                          <tr>
                            <th>Email</th>
                            <td>{showContact.email_contact}</td>
                          </tr>
                          <tr>
                            <th>Sujet</th>
                            <td>{showContact.topic_contact}</td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <td>{showContact.description_contact}</td>
                          </tr>
                          <tr>
                            <th>Date</th>
                            <td>{formatDate(showContact.created_at)}</td>
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
                              <Button
                                className="btn btnRed btn-sm"
                                onClick={() => {
                                  deleteShowContact(showContact.id);
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

export default ShowContact;
