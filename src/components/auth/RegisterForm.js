import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LogoRVB from "../LogoRVB";
import ReCAPTCHA from "react-google-recaptcha"; // Importez le composant ReCAPTCHA

function isPasswordValid(password) {
  // Exigences : au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/;

  return passwordRegex.test(password);
}

const RegisterForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState(""); // État pour stocker la valeur du reCAPTCHA
  const [pseudo, setPseudo] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [phone, setPhone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validationError = useState({});
  const [validationErrorMail, setValidationErrorMail] = useState("");

  const [showAlert, setShowAlert] = useState(false); // État pour afficher ou masquer l'alerte
  const [fieldName, setFieldName] = useState(""); // État pour stocker le nom du champ
  const [showError, setShowError] = useState(false);

  const handleBlur = (value, fieldName) => {
    if (value.trim() === "") {
      setShowAlert(true); // Afficher l'alerte si le champ est vide
      setFieldName(fieldName); // Stocker le nom du champ
    } else {
      setShowAlert(false); // Masquer l'alerte si le champ n'est pas vide
    }
    if (fieldName === "Mot de passe") {
      if (!isPasswordValid(value)) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  // const handleBlurMdp = (value, fieldName) => {
  //   if (fieldName === "Mot de passe") {
  //     if (!isPasswordValid(value)) {
  //       setShowError(true);
  //     } else {
  //       setShowError(false);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pseudo", pseudo);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email_user", emailUser);
    formData.append("phone", phone);
    formData.append("cellphone", cellphone);
    formData.append("address", address);
    formData.append("zip", zip);
    formData.append("city", city);
    formData.append("license_number", licenseNumber);

    formData.append("password", password);

    if (!recaptchaValue) {
      alert(
        "Veuillez vérifier que vous êtes un humain en cochant le reCAPTCHA."
      );
      return;
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/register`,
        formData
      );
      const data = response.data; // Les données sont déjà parsées par Axios
      if (data.status === "success") {
        console.log("Inscription réussie");
        console.log(data.authorisation.token);
        localStorage.setItem("token", data.authorisation.token);
        navigate("/", { replace: true });
      } else {
        console.error("Échec de l'inscription");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Le serveur a retourné une erreur 422 (Unprocessable Entity)
        setValidationErrorMail(
          "Cet e-mail est déjà utilisé. Veuillez en choisir un autre."
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6 mt-5">
          <Row>
            <div className="mb-5 d-flex justify-content-center">
              <LogoRVB />
            </div>
          </Row>
          <div className="card mb-3">
            <div className="card-header">
              <h3 className="card-title">Enregistrement</h3>
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
                <Row>
                  <Form onSubmit={handleSubmit}>
                    {validationErrorMail && (
                      <div className="alert alert-danger" role="alert">
                        {validationErrorMail}
                      </div>
                    )}
                    {showAlert && (
                      <div className="alert alert-danger" role="alert">
                        Le champ {fieldName} ne peut pas être vide !
                      </div>
                    )}
                    {showError && (
                      <div className="alert alert-danger" role="alert">
                        Le mot de passe ne respecte pas les exigences de
                        sécurité : Au moins 8 caractères dont au moins une
                        lettre minuscule, une lettre majuscule, un chiffre et un
                        caractère spécial.
                      </div>
                    )}
                    <Form.Group className="mb-3" controlId="formGroupPseudo">
                      <Form.Label>Pseudo*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        onBlur={(e) => handleBlur(e.target.value, "Pseudo")}
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupLastname"
                        >
                          <Form.Label>Nom*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nom"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            onBlur={(e) => handleBlur(e.target.value, "Nom")}
                          />
                        </Form.Group>{" "}
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupFirstname"
                        >
                          <Form.Label>Prénom*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Prénom"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            onBlur={(e) => handleBlur(e.target.value, "Prénom")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGroupEmailUser">
                      <Form.Label>Adresse mail*</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Adresse mail"
                        value={emailUser}
                        onChange={(e) => setEmailUser(e.target.value)}
                        onBlur={(e) =>
                          handleBlur(e.target.value, "Adresse mail")
                        }
                      />
                    </Form.Group>
                    <Row className="align-items-bottom">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupPhone">
                          <Form.Label>Téléphone fixe</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Téléphone fixe"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupCellphone"
                        >
                          <Form.Label>Téléphone portable*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Téléphone portable"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                            onBlur={(e) =>
                              handleBlur(e.target.value, "Téléphone portable")
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGroupAddress">
                      <Form.Label>Adresse*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Adresse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={(e) => handleBlur(e.target.value, "Adresse")}
                      />
                    </Form.Group>
                    <Row className="align-items-bottom">
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="formGroupZip">
                          <Form.Label>Code postal*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Code postal"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            onBlur={(e) =>
                              handleBlur(e.target.value, "Code postal")
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={9}>
                        <Form.Group className="mb-3" controlId="formGroupCity">
                          <Form.Label>Ville*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ville"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={(e) => handleBlur(e.target.value, "Ville")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupLicenseNumber"
                    >
                      <Form.Label>N° de licence*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="N° de licence"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        onBlur={(e) =>
                          handleBlur(e.target.value, "N° de licence")
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Mot de passe*</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) =>
                          handleBlur(e.target.value, "Mot de passe")
                        }
                      />
                      {showError && (
                        <div className="text-danger">
                          Le mot de passe ne respecte pas les exigences de
                          sécurité.
                        </div>
                      )}
                    </Form.Group>
                    <Row className="mb-3">
                      <i>* champs obligatoire</i>
                    </Row>
                    <ReCAPTCHA
                      sitekey="6LdqGEEnAAAAAGQZIeI6vNWfuuGvMXtA46T0ilvb"
                      onChange={(value) => setRecaptchaValue(value)}
                    />
                    <Button
                      className="btnBlue mt-2 btn-sm"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Enregistrement
                    </Button>
                  </Form>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
