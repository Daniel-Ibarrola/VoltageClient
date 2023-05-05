import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import station_names from "../shared/station_names.js";
import { actions, stationDataReducer } from "./stationReducer.js";
import { Chart } from "./Chart.jsx";
import { Statistics } from "./Statistics.jsx";


const baseUrl = "http://localhost:5000/api/v1";
const stationsUrl = baseUrl + "/stations/"
// const lastReportUrl = baseUrl + "/lastreports/"
const reportCountUrl = baseUrl + "/reportcount/"

const Station = () => {
    const { stationName } = useParams();
    const [stationData, dispatchStationData] = React.useReducer(
        stationDataReducer,
        {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: false,
        }
    )

    let prettyName = "";
    if (Object.hasOwn(station_names, stationName)){
        prettyName = station_names[stationName];
    }

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
        fetchStationData();
    }, []);

    return (
        <div>
            {prettyName !== ""
                ?
                (<div>
                    <h1>{prettyName}</h1>
                    {stationData.isError && <p>Error: No se pudo cargar los últimos datos</p>}
                    {stationData.isLoading && <p>Cargando los últimos datos</p>}
                    {(!stationData.isLoading && !stationData.isError) && (
                        <>
                            <Chart data={stationData.voltages} />
                            <Chart data={stationData.reports} />
                            <Statistics data={stationData.voltages} />
                        </>
                    )}
                </div>)
                :
                <h1>Estación invalida</h1>
            }
        </div>
    );
};

export { Station };
