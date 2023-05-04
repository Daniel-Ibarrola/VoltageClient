import * as React from "react";
import { useParams } from "react-router-dom";
import station_names from "../shared/station_names.js";


const Station = () => {
    const { stationName } = useParams();
    let prettyName = "";
    if (Object.hasOwn(station_names, stationName)){
        prettyName = station_names[stationName];
    }

    return (
        <div>
            {prettyName !== ""
                ?
                <h1>{prettyName}</h1>
                :
                <h1>Estación Invalida</h1>
            }

        </div>
    );
};

export { Station };
