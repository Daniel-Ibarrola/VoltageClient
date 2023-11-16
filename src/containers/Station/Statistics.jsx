import Card from "react-bootstrap/Card";
import { getDataMax, getDataMin, getLastDate } from "../../utils/index.js";
import "./style.css"

const Statistics = ({ data }) => {

    return (
            <Card className="stats-card">
                {
                    data && (
                        <>
                            <Card.Header>
                                <Card.Title className="stats-title">Estadísticas de la estación</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="stats-subtitle">Último reporte</Card.Subtitle>
                                <Card.Text className="stats-text">{getLastDate(data)}</Card.Text>

                                <Card.Subtitle className="stats-subtitle">Voltajes Batería</Card.Subtitle>
                                <Card.Text className="stats-text"><strong>Máximo</strong>: {getDataMax(data, "battery")}</Card.Text>
                                <Card.Text className="stats-text"><strong>Mínimo</strong>: {getDataMin(data, "battery")}</Card.Text>

                                <Card.Subtitle className="stats-subtitle">Voltajes Panel</Card.Subtitle>
                                <Card.Text className="stats-text"><strong>Máximo</strong>: {getDataMax(data, "panel")}</Card.Text>
                                <Card.Text className="stats-text"><strong>Mínimo</strong>: {getDataMin(data, "panel")}</Card.Text>

                                <Card.Footer className="stats-footer">Nota: valores de los úlimos 7 días</Card.Footer>
                            </Card.Body>
                        </>
                    )
                }
            </Card>
    )
};

export { Statistics };
