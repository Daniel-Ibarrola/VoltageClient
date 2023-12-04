import { useContext, useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import AuthContext from "../../context/AuthProvider.jsx";
import { FailAlert, LoadSpinner } from "../../components/index.js";
import { STATION_ACTION, stationDataReducer } from "../../reducers/index.js";
import { VoltageChart } from "./VoltageChart.jsx";
import { ReportsChart } from "./ReportsChart.jsx";
import { Statistics } from "./Statistics.jsx";
import { getDateWithDelta, getNumberOfDays } from "../../utils/index.js";
import { getStationReports, getStationReportCounts} from "../../services/index.js";
import "./style.css"


const Station = () => {
    // TODO: station names with spaces/accents get a 404
    const { stationName } = useParams();
    const [stationData, dispatchStationData] = useReducer(
        stationDataReducer,
        {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: false,
            station: stationName,
        }
    );
    const { token } = useContext(AuthContext);

    const [reportsDate, setReportsDate] = useState(
        getDateWithDelta(new Date(Date.now()), 7)
    );
    const [countsDate, setCountsDate] = useState(
        getDateWithDelta(new Date(Date.now()), 7)
    );


    const fetchStationReports = async () => {
        dispatchStationData({type: STATION_ACTION.INIT_FETCH})
        const reports = await getStationReports(stationName, reportsDate, token);
        if (reports.data.length > 0) {
            dispatchStationData({
                type: STATION_ACTION.SUCCESS_FETCH_REPORTS,
                payload: reports.data
            });
        } else {
            dispatchStationData({
                type: STATION_ACTION.FAIL_FETCH,
                payload: reports.error
            });
        }
    };

    const fetchReportCounts = async () => {
        const reports = await getStationReportCounts(stationName, countsDate, token);
        if (reports.data.length > 0) {
            dispatchStationData({
                type: STATION_ACTION.SUCCESS_FETCH_COUNT,
                payload: reports.data
            });
        } else {
            dispatchStationData({
                type: STATION_ACTION.FAIL_FETCH,
                payload: reports.error
            });
        }
    }

    useEffect(() => {
        fetchStationReports();
    }, [reportsDate]);

    useEffect(() => {
        fetchReportCounts();
    }, [countsDate]);


    const handleDateChange = (period, type) => {
        const days = getNumberOfDays(period);
        const date = new Date(Date.now());
        const startDate = getDateWithDelta(date, days);
        if (type === "voltages"){
            setReportsDate(startDate);
        } else if (type === "reports"){
            setCountsDate(startDate);
        }
    };

    return (
        <Container>
            {stationData.name !== ""
                ?
                (<>
                    <Row md={1}>
                        <Col>
                            <h1>{stationData.name}</h1>
                        </Col>
                    </Row>

                    {stationData.isError &&
                        <FailAlert>
                            <p><strong>Error:</strong> No se pudo cargar los últimos datos</p>
                        </FailAlert>
                    }
                    {stationData.isLoading && <LoadSpinner />}
                    {(stationData.voltages.length > 0 && stationData.reports.length > 0)
                        && (
                        <>
                            <Row >
                                <Col>
                                    <VoltageChart
                                        voltages={stationData.voltages}
                                        onDropDownItemClick={handleDateChange}
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <ReportsChart
                                        reports={stationData.reports}
                                        onDropDownItemClick={handleDateChange}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md={{ span: 4}}>
                                    <Statistics data={stationData.voltages} />
                                </Col>
                            </Row>
                        </>
                    )}
                </>)
                :
                <h1>Estación Invalida</h1>
            }
        </Container>
    );
};

export { Station };
