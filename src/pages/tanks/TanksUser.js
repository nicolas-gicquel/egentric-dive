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

import auth from "../../services/auth/token.js";

const TanksUser = () => {
  const userId = auth.getId();
  const role = auth.getRoles();

  const [tanks, setTanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading pour gérer l'affichage de chargement

  const formatDate = (date) => {
    const dateParts = date.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  };

  // // ------------Affichage reservation----------------------------------------//

  const displayTanksUser = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tanks/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setTanks(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // ============= fonction delete =====================

  const deleteTank = (id) => {
    axios
      .delete(`http://localhost:8000/api/tanks/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayTanksUser);
  };

  useEffect(() => {
    if (userId) {
      displayTanksUser();
    }
  }, [userId]); // Sans les crochets ça tourne en boucle

  // ============================================================== vérification plus de 6ans =================================
  // Vérifie si la date est expirée (plus de 6 ans)
  const isDateExpired6 = (date) => {
    const sixYearsInMilliseconds = 189216000000; // Nombre de millisecondes dans 6 ans
    const currentDate = new Date(); // Date actuelle

    // Convertit la date de requalification en objet Date
    const requalifDate = new Date(date);

    // Vérifie si la différence entre la date actuelle et la date de requalification dépasse six ans
    return currentDate - requalifDate > sixYearsInMilliseconds;
  };

  // ============================================================== vérification moins de 2 mois avant expiration =================================
  // console.log(showTank.requalification_date);

  // Vérifie si on est à moins de 2 mois avant la date d'expiration (6 ans)
  const isTwoMonthsBeforeExpiration6 = (date) => {
    const currentDate = new Date();
    const requalifDate = new Date(date);

    // Ajoute 6 ans à la date de requalification
    requalifDate.setFullYear(requalifDate.getFullYear() + 6);

    // Soustrait deux mois à la date d'expiration
    const twoMonthsBeforeExpiration = new Date(requalifDate);
    twoMonthsBeforeExpiration.setMonth(requalifDate.getMonth() - 2);

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
                    <span className="menu">Blocs Perso</span>
                  </h3>
                </div>

                <div className="card-body">
                  <Link
                    to={`/tanks/add`}
                    className="btn btnBlue btn-sm me-2 mb-2 mt-2"
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
                    <span className="menu">Nouveau</span>
                  </Link>
                  {isLoading ? (
                    // Afficher un message de chargement pendant le chargement des données
                    <p>Loading...</p>
                  ) : (
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Codes</th>
                            <th className="d-none d-sm-table-cell">
                              Capacités
                            </th>
                            <th className="d-none d-md-table-cell">Gaz</th>
                            {role === 1 ? (
                              <th className="d-none d-md-table-cell">
                                Disponibilités
                              </th>
                            ) : null}
                            <th>Dates de requalification</th>
                            {role === 1 ? (
                              <th className="d-none d-md-table-cell">
                                Compteurs
                              </th>
                            ) : null}
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {tanks.map((tank) => {
                            const requalifDate = formatDate(
                              tank.requalification_date
                            );
                            const isExpired6 = isDateExpired6(
                              tank.requalification_date
                            );
                            return (
                              <tr key={tank.id}>
                                <td>{tank.code_tank}</td>
                                <td className="d-none d-sm-table-cell">
                                  {tank.capacity_tank} Litres
                                </td>
                                <td className="d-none d-md-table-cell">
                                  {tank.gas_tank}
                                </td>
                                {role === 1 ? (
                                  <td
                                    className={`d-none d-md-table-cell ${
                                      tank.availability_tank === 0
                                        ? "expired2"
                                        : null
                                    }`}
                                  >
                                    {tank.availability_tank === 1
                                      ? "Disponible"
                                      : "Indisponible"}
                                  </td>
                                ) : null}
                                <td
                                  className={`${
                                    isExpired6
                                      ? "expired"
                                      : isTwoMonthsBeforeExpiration6(
                                          tank.requalification_date
                                        )
                                      ? "expired2"
                                      : ""
                                  }`}
                                >
                                  {isExpired6 &&
                                    isTwoMonthsBeforeExpiration6(
                                      tank.requalification_date
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
                                  {!isExpired6 &&
                                    isTwoMonthsBeforeExpiration6(
                                      tank.requalification_date
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
                                  {!isExpired6 &&
                                    !isTwoMonthsBeforeExpiration6(
                                      tank.requalification_date
                                    ) &&
                                    null}
                                  {requalifDate}
                                </td>
                                {role === 1 ? (
                                  <td
                                    className={`d-none d-md-table-cell ${
                                      tank.counter_loan_tank >= 100
                                        ? "expired2"
                                        : ""
                                    }`}
                                  >
                                    {tank.counter_loan_tank >= 100 ? (
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
                                    {tank.counter_loan_tank}
                                  </td>
                                ) : null}
                                <td>
                                  <Link
                                    to={`/tanks/show/${tank.id}`}
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
                                  <Link
                                    to={`/tanks/edit/${tank.id}`}
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
                                  {role === 1 || role === 2 ? (
                                    <Button
                                      className="btn btnRed btn-sm"
                                      onClick={() => {
                                        deleteTank(tank.id);
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
                            );
                          })}
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

export default TanksUser;
