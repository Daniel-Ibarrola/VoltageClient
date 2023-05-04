import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Stations } from "./Stations/index.js";
import { Station } from "./Station/index.js";

const App = () => {
    return (
        <>
            <Routes>
                <Route index element={<Stations />} />
                <Route path="stations" element={<Stations />} />
                <Route path="stations/:stationName" element={<Station />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


const NoMatch = () => {
    return <h1>Aqui no hay nada: 404</h1>
}


export { App };
