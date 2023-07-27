import React from "react";
import Row from "react-bootstrap/Row";

const Noaccess = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Accès refusé</h2>
              <hr />
              <div className="noaccess">
                <Row>
                  <h4 className="card-title">Page non accessible</h4>
                </Row>
                <Row>
                  <p>
                    merci de vous
                    <a href="/login" className="access">
                      {" "}
                      connecter
                    </a>{" "}
                    ou de vous
                    <a href="/register" className="access">
                      {" "}
                      enregistrer
                    </a>
                  </p>
                </Row>
                <Row>
                  <p>
                    sinon retourner à la
                    <a href="/home" className="access">
                      {" "}
                      visite du site
                    </a>
                  </p>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Noaccess;
