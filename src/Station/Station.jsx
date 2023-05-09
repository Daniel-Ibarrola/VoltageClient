import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import station_names from "../shared/station_names.js";
import { reportCountUrl, stationsUrl } from "../shared/api.js";
import { FailAlert, LoadSpinner } from "../shared/index.js";
import { actions, stationDataReducer } from "./stationReducer.js";
import { VoltageChart } from "./Chart/index.js";
import { ReportsChart } from "./Chart/index.js";
import { Dropdown } from "./Dropdown/index.js";
import { Statistics } from "./Statistics/index.js";
import "./style.css"


const getPrettyName = (stationName) => {
    if (Object.hasOwn(station_names, stationName)){
        return station_names[stationName];
    }
    return "";
}

const Station = () => {
    const { stationName } = useParams();
    const [stationData, dispatchStationData] = React.useReducer(
        stationDataReducer,
        {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: false,
            name: getPrettyName(stationName),
        }
    )

    const getRequest = async (url, action) => {
        const result = await axios.get(url);
        dispatchStationData({
            type: action,
            payload: result.data,
        });
    }

    const fetchStationData = async () => {
        dispatchStationData({type: actions.initFetch});
        const requestData = [
            {action: actions.successFetchStations, url: stationsUrl + stationName},
            {action: actions.successFetchReportCount, url: reportCountUrl + stationName},
        ]
        for (let ii = 0; ii < requestData.length; ii++){
            try {
                await getRequest(requestData[ii].url, requestData[ii].action);
            } catch {
                dispatchStationData({type: actions.failFetch});
                break;
            }
        }
    }

    React.useEffect(() => {
        if (stationData.name){
            fetchStationData();
        }
    }, []);

    // TODO: Add option to change date range
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

                    {stationData.isError && <FailAlert />}
                    {stationData.isLoading && <LoadSpinner />}
                    {(stationData.voltages.length > 0 && stationData.reports.length > 0)
                        && (
                        <>
                            <Row >
                                <Col>
                                    <VoltageChart voltages={stationData.voltages} />
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <ReportsChart reports={stationData.reports} />
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
