import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

const Rgpd = () => {
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
                    <span className="menu">Politique de confidentialité</span>
                  </h3>
                </div>

                <div className="card-body">
                  <h2>Collecte de l’information</h2>
                  <p>
                    Nous recueillons des informations lorsque vous naviguez sur
                    le site, lorsque vous passez une commande et lorsque vous
                    remplissez l’un des formulaires.
                  </p>
                  <p>
                    En outre, nous recevons et enregistrons automatiquement des
                    informations à partir de votre ordinateur et navigateur,
                    comme :
                  </p>
                  <ul>
                    <li>votre adresse IP</li>
                    <li>le type de matériel et de navigateur utilisés</li>
                    <li>la/les page(s) que vous consultez</li>
                  </ul>
                  <h2>Utilisation des informations</h2>
                  <p>
                    Toute les informations que nous recueillons auprès de vous
                    peuvent être utilisées pour :
                  </p>
                  <ul>
                    <li>
                      Personnaliser votre expérience et répondre à vos besoins
                      individuels
                    </li>
                    <li>Fournir un contenu publicitaire personnalisé</li>
                    <li>Améliorer notre site Web</li>
                    <li>
                      Améliorer le service client et vos besoins de prise en
                      charge
                    </li>
                    <li>Vous contacter par email</li>
                    <li>
                      Administrer un concours, une promotion, ou une enquête
                    </li>
                  </ul>
                  <h2>Divulgation à des tiers</h2>
                  <p>
                    Nous ne vendons, n’échangeons et ne transférons pas vos
                    informations personnelles identifiables à des tiers. Cela ne
                    comprend pas les tierces parties de confiance qui nous
                    aident à exploiter notre site Web, tant que ces parties
                    conviennent de garder ces informations confidentielles.
                  </p>
                  <p>
                    Les informations non-privées, cependant, peuvent être
                    fournies à d’autres parties pour le marketing, la publicité,
                    ou d’autres utilisations.
                  </p>
                  <h2>Protection des informations</h2>
                  <p>
                    Nous mettons en œuvre une variété de mesures de sécurité
                    pour préserver la sécurité de vos informations personnelles
                    :
                  </p>
                  <ul>
                    <li>Protocole SSL</li>
                    <li>Gestion des accès par login/mot de passe</li>
                    <li>Logiciels de surveillance réseau</li>
                    <li>Sauvegardes informatiques multiples</li>
                    <li>Pare-feu</li>
                  </ul>
                  <p>
                    Nous protégeons également vos informations hors ligne. Seuls
                    les employés qui ont besoin d’effectuer un travail
                    spécifique (par exemple, la facturation ou le service à la
                    clientèle) ont accès aux informations personnelles
                    identifiables. Les ordinateurs et serveurs utilisés pour
                    stocker des informations personnelles identifiables sont
                    conservés dans un environnement sécurisé.
                  </p>
                  <h2>Cookies :</h2>
                  <p>
                    Les cookies sont des fichiers textes, souvent cryptés,
                    stockés dans votre navigateur. Ils sont créés lorsque le
                    navigateur d’un utilisateur charge un site internet donné :
                    le site envoie des informations au navigateur, qui créé
                    alors un fichier texte. Chaque fois que l’utilisateur
                    revient sur le même site, le navigateur récupère ce fichier
                    et l’envoie au serveur du site internet.
                  </p>
                  <p>
                    On peut distinguer deux types de cookies, qui n’ont pas les
                    mêmes finalités : les cookies techniques et les cookies
                    publicitaires :
                  </p>
                  <ul>
                    <li>
                      Les cookies techniques sont utilisés tout au long de votre
                      navigation, afin de la faciliter et d’exécuter certaines
                      fonctions. Un cookie technique peut par exemple être
                      utilisé pour mémoriser les réponses renseignées dans un
                      formulaire ou encore les préférences de l’utilisateur
                      s’agissant de la langue ou de la présentation d’un site
                      internet, lorsque de telles options sont disponibles.
                    </li>
                  </ul>
                  <ul>
                    <li>
                      Les cookies publicitaires peuvent être créés non seulement
                      par le site internet sur lequel l’utilisateur navigue,
                      mais également par d’autres sites internet diffusant des
                      publicités, annonces, widgets ou autres éléments sur la
                      page affichée. Ces cookies peuvent notamment être utilisés
                      pour effectuer de la publicité ciblée, c’est-à-dire de la
                      publicité déterminée en fonction de la navigation de
                      l’utilisateur.
                    </li>
                  </ul>
                  <p>
                    Nous utilisons des cookies techniques et des cookies
                    publicitaires.
                  </p>
                  <p>
                    Nous utilisons Google Analytics qui est un outil statistique
                    d’analyse d’audience qui génère un cookie permettant de
                    mesurer le nombre de visites , le nombre de pages vues et
                    l’activité des visiteurs. Votre adresse IP est également
                    collectée pour déterminer la ville depuis laquelle vous vous
                    connectez.
                  </p>
                  <p>
                    Nous vous rappelons à toutes fins utiles qu’il vous est
                    possible de vous opposer au dépôt de cookies techniques et
                    publicitaires en configurant votre navigateur. Retrouvez
                    plus d’informations sur l’utilisation des cookies sur le
                    site de la CNIL :{" "}
                    <a
                      href="http://www.cnil.fr/vos-droits/vos-traces/les-cookies/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://www.cnil.fr/vos-droits/vos-traces/les-cookies/
                    </a>
                  </p>
                  <p>
                    Un tel refus pourrait toutefois empêcher le bon
                    fonctionnement du site Internet.
                  </p>
                  <h2>Se désabonner</h2>
                  <p>
                    Nous utilisons l’adresse e-mail que vous fournissez pour
                    vous envoyer des informations et mises à jour relatives à
                    votre commande, des actualités de façon occasionnelle, des
                    informations sur des produits, des nouveautés etc. Si vous
                    souhaitez à tout moment vous désinscrire et ne plus recevoir
                    d’e-mails, il vous suffit d’en faire la demande en
                    remplissant{" "}
                    <a href="{{ path('contacts_new') }}">
                      <strong>
                        <u>ce formulaire.</u>
                      </strong>
                    </a>
                  </p>
                  <h2>
                    Droit d’accès, de modification et de suppression de vos
                    données
                  </h2>
                  <p>
                    Si, à tout moment, vous souhaitez avoir accès aux
                    informations personnelles vous concernant, ou si vous
                    souhaitez les modifier ou les supprimer, il vous suffit d’en
                    faire la demande directement sur{" "}
                    <Link to={`/contacts/add`}>
                      <strong>
                        <u>ce formulaire</u>
                      </strong>
                    </Link>
                  </p>
                  <p>
                    Nous nous engageons à vous offrir un droit d’opposition et
                    de retrait quant à vos renseignements personnels. Le droit
                    d’opposition s’entend comme étant la possibilité offerte aux
                    internautes de refuser que leurs renseignements personnels
                    soient utilisés à certaines fins mentionnées lors de la
                    collecte.
                  </p>
                  <p>
                    Pour pouvoir exercer ces droits, vous pouvez nous contacter
                    :<br />
                    <strong>
                      Erwan Gentric
                      <br />
                    </strong>
                    4 la touche au Robin, 44530 Guenrouet
                    <br />
                    Loire Atlantique – Pays de la Loire
                    <br />
                    {/* {# <strong>Tél</strong> : <a href="tel:00332512 6231">02 51 23 62 31</a><br /> #} */}
                    <a href="mailto:infogentric@gmail.com">
                      mailto:infogentric@gmail.com
                    </a>
                    <br />
                    Section du site web :{" "}
                    <Link to={`/contacts/add`}>
                      /gestion-de-vos-donnees-personnelles/
                    </Link>
                  </p>
                  <h2>Conservation des données</h2>
                  <p>
                    Les données personnelles de nos internautes sont conservées
                    dans un délai maximum de 36 mois
                  </p>
                  <h2>Consentement</h2>
                  <p>
                    En utilisant notre site, vous consentez à notre politique de
                    confidentialité.
                  </p>
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
export default Rgpd;
