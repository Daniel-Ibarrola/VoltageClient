import { useState } from "react";
import Toast from "react-bootstrap/Toast";

import { identifyStations } from "../../utils/identifyStations.js";
import "./style.css"


const AlertToast = ({ body, date }) => {
  const [showToast, setShowToast] = useState(true);
  const toggleToast = () => setShowToast(!showToast);

  return (
      <Toast
          onClose={toggleToast}
          show={showToast}
          className="toast-alert">
        <Toast.Header>
          <strong className="me-auto">Alerta!</strong>
          <small>{date}</small>
        </Toast.Header>
        <Toast.Body>
          {body}
        </Toast.Body>
      </Toast>
  )
};

const Notifications = ({ reports }) => {

  const defectiveStations = identifyStations(reports);
  return (
      <>
        {defectiveStations.map(st => <AlertToast key={st.name} body={st.body} date={st.date} />)}
      </>
  );
};

export { Notifications };
