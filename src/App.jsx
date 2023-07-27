import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/layouts/Home";

import Login from "./pages/layouts/Login";
import Register from "./pages/layouts/Register";
import Noaccess from "./pages/layouts/Noaccess";
import Regulators from "./pages/regulators/Regulators";
import AddRegulator from "./pages/regulators/AddRegulator";
import EditRegulator from "./pages/regulators/EditRegulator";
import ShowRegulator from "./pages/regulators/ShowRegulator";
import Bcds from "./pages/bcds/Bcds";
import AddBcd from "./pages/bcds/AddBcd";
import EditBcd from "./pages/bcds/EditBcd";
import ShowBcd from "./pages/bcds/ShowBcd";
import Tanks from "./pages/tanks/Tanks";
import AddTank from "./pages/tanks/AddTank";
import EditTank from "./pages/tanks/EditTank";
import ShowTank from "./pages/tanks/ShowTank";
import TanksUser from "./pages/tanks/TanksUser";
import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import ShowUser from "./pages/users/ShowUser";
import Reservations from "./pages/reservations/Reservations";
import AddReservation from "./pages/reservations/AddReservation";
import EditReservation from "./pages/reservations/EditReservation";
import ShowReservation from "./pages/reservations/ShowReservation";
import ReservationUser from "./pages/reservations/ReservationsUser";
import ReturnReservation from "./pages/reservations/Return";
import Contacts from "./pages/contacts/Contacts";
import AddContact from "./pages/contacts/AddContact";
import ShowContact from "./pages/contacts/ShowContact";
import auth from "./services/auth/token"
import MentionsLegales from "./pages/layouts/MentionsLegales";
import Rgpd from "./pages/layouts/Rgpd";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Noaccess />} />

        <Route
          path="/home"
          element={
            auth.getExpiryTime() ? <Home />
           : <Navigate to="/login" replace={true} />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Noaccess" element={<Noaccess />} />

        <Route
  path="/regulators"
  element={
    auth.getExpiryTime()
      ? auth.loggedAndAdminOrEditorM() ? <Regulators /> : <Noaccess />
      : <Navigate to="/login" replace={true} />
  }
/>

        <Route
          path="/regulators/add"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <AddRegulator /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/regulators/edit/:regulator"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <EditRegulator /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/regulators/show/:regulator"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <ShowRegulator /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/contacts"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdmin() ? <Contacts /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/contacts/add"
          element={
            auth.getExpiryTime() ? <AddContact />
           : <Navigate to="/login" replace={true} />
          }

        />
        <Route
          path="/contacts/show/:contact"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdmin() ? <ShowContact /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/bcds"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <Bcds /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/bcds/add"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <AddBcd /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/bcds/edit/:bcd"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <EditBcd /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/bcds/show/:bcd"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <ShowBcd /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/tanks"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <Tanks /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route path="/tanks/add"
              element={
            auth.getExpiryTime() ?  <AddTank />
              : <Navigate to="/login" replace={true} />
          }
        />

        <Route
          path="/tanks/edit/:tank"
          element={
            auth.getExpiryTime()
              ?  <EditTank />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/tanks/show/:tank"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <ShowTank /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />        <Route
        path="/tanks/user/:user"
        element={
          auth.getExpiryTime() ? <TanksUser />
            : <Navigate to="/login" replace={true} />
        }
      />

        <Route
          path="/reservations"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <Reservations /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/reservations/add"
          element={
            auth.getExpiryTime() ? <AddReservation />
           : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/reservations/edit/:reservation"
          element={
            auth.getExpiryTime() ? <EditReservation />
           : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/reservations/show/:reservation"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <ShowReservation /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/reservations/user/:user"
          element={
            auth.getExpiryTime() ? <ReservationUser />
              : <Navigate to="/login" replace={true} />
          }
        />
                <Route
          path="/reservations/return/:reservation"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdminOrEditorM() ? <ReturnReservation /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />

        <Route
          path="/users"
          element={
            auth.getExpiryTime()
              ? auth.loggedAndAdmin() ? <Users /> : <Noaccess />
              : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/users/edit/:user"
          element={
            auth.getExpiryTime() ? <EditUser />
           : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/users/show/:user"
          element={
            auth.getExpiryTime() ? <ShowUser />
           : <Navigate to="/login" replace={true} />
          }
        />
                <Route
          path="/rgpd"
          element={
            auth.getExpiryTime() ? <Rgpd />
           : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/mentionlegales"
          element={
            auth.getExpiryTime() ? <MentionsLegales />
           : <Navigate to="/login" replace={true} />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
