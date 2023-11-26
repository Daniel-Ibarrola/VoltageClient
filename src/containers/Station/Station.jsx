import { useContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import AuthContext from "../../context/AuthProvider.jsx";
import { STATION_NAMES } from "../../data/index.js";
import { FailAlert, LoadSpinner } from "../../components/index.js";
import { STATION_ACTION, stationDataReducer } from "../../reducers/index.js";
import { VoltageChart } from "./VoltageChart.jsx";
import { ReportsChart } from "./ReportsChart.jsx";
import { Statistics } from "./Statistics.jsx";
import { getDateWithDelta } from "../../utils/index.js";
import "./style.css"



const getPrettyName = (stationName) => {
    if (Object.hasOwn(STATION_NAMES, stationName)){
        return STATION_NAMES[stationName];
    }
    return "";
}

const Station = () => {
    const { stationName } = useParams();
    const [stationData, dispatchStationData] = useReducer(
        stationDataReducer,
        {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: false,
            name: getPrettyName(stationName),
        }
    );
    const { token } = useContext(AuthContext);

    let initialDate = getDateWithDelta(new Date(Date.now()), 7);
    const [urlParams, setUrlParams] = useState({
        // TODO: pass parameters to axios.get
        voltages: `?startdate=${initialDate}`,
        reports: `?startdate=${initialDate}`,
    });

    const getRequest = async (url, action) => {
        const result = await axios.get(
            url,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        dispatchStationData({
            type: action,
            payload: result.data,
        });
    }

    const fetchStationData = async () => {
        // dispatchStationData({type: STATION_ACTION.initFetch});
        // const requestData = [
        //     {
        //         action: STATION_ACTION.successFetchStations,
        //         url: reportsUrl + stationName + urlParams.voltages
        //     },
        //     {action:
        //         STATION_ACTION.successFetchReportCount,
        //         url: reportsUrl + stationName + "/counts/" +  urlParams.reports
        //     },
        // ]
        // for (let ii = 0; ii < requestData.length; ii++){
        //     try {
        //         await getRequest(requestData[ii].url, requestData[ii].action);
        //     } catch {
        //         dispatchStationData({type: STATION_ACTION.failFetch});
        //         break;
        //     }
        // }
    }

    useEffect(() => {
        if (stationData.name){
            fetchStationData();
        }
    }, [urlParams]);

    const handleDateChange = (period, type) => {
        const date = new Date(Date.now());
        let days = null;
        switch (period){
            case "week":
                days = 7;
                break;
            case "month":
                days = 30;
                break;
            case "year":
                days= 365;
                break;
            default:
                break;
        }
        if (days !== null){
            const startDate = getDateWithDelta(date, days);
            setUrlParams({
                ...urlParams,
                [type]: `?startdate=${startDate}`,
            });
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
