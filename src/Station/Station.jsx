import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import station_names from "../shared/station_names.js";
import { actions, stationDataReducer } from "./stationReducer.js";
import { VoltageChart } from "./Chart/index.js";
import { ReportsChart } from "./Chart/index.js";
import { Statistics } from "./Statistics/index.js";


const baseUrl = "http://localhost:5000/api/v1";
const stationsUrl = baseUrl + "/stations/"
// const lastReportUrl = baseUrl + "/lastreports/"
const reportCountUrl = baseUrl + "/reportcount/"


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

    return (
        <div>
            {stationData.name !== ""
                ?
                (<div>
                    <h1>{stationData.name}</h1>
                    {stationData.isError && <p>Error: No se pudo cargar los últimos datos</p>}
                    {stationData.isLoading && <p>Cargando los últimos datos</p>}
                    {(stationData.voltages.length > 0 && stationData.reports.length > 0)
                        && (
                        <>
                            <VoltageChart voltages={stationData.voltages} />
                            <ReportsChart reports={stationData.reports} />
                            <Statistics data={stationData.voltages} />
                        </>
                    )}
                </div>)
                :
                <h1>Estación Invalida</h1>
            }
        </div>
    );
};

export { Station };
