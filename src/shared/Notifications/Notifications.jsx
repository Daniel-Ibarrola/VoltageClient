import * as React from "react";
import Toast from "react-bootstrap/Toast";
import "./style.css"
import { getStationsWithIssues } from "./reports.js";


const AlertToast = ({ body, date }) => {
  const [showToast, setShowToast] = React.useState(true);
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

  const defectiveStations = getStationsWithIssues(reports);
  return (
      <>
        {defectiveStations.map(st => <AlertToast key={st.name} body={st.body} date={st.date} />)}
      </>
  );
};

export { Notifications };
