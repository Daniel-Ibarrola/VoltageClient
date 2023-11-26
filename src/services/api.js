import axios from "axios";


const getApiUrl = () => {
    const apiId = import.meta.env.VITE_API_GATEWAY_ID;
    const region = import.meta.env.VITE_AWS_REGION;
    return `https://${apiId}.execute-api.${region}.amazonaws.com/Prod`;
};

/**
 * @typedef {Object} Report
 * @property {string} date - The date of the report.
 * @property {string} station - Name of the station.
 * @property {number} battery - Voltage of the battery.
 * @property {number} panel - Voltage of the panel.
 */


/**
 * @typedef {Object} LastReportsData
 * @property {Array<Report>} data - The last reports of the stations
 * @property {string} error - An error message. Empty if there is no error.
 */

/**
 * Get the last reports of all stations
 * @param {string} token - The authentication token from Cognito
 * @returns {Promise<LastReportsData>}
 */
export const getLastReports = async (token) => {
    const url = getApiUrl() + "/last_reports";
    try {
        const response = await axios.get(
            url,
            {headers: {Authorization: {token}}}
        );
        return {
            data: response.data,
            error: ""
        };
    } catch (error) {
        console.error(error);
        return {
            data: [],
            error: error.message
        };
    }
};
