import axios from "axios";

/**
 * Fetches geolocation information for the client's IP address using the ipapi.co service.
 *
 * @returns Axios promise resolving to the IP geolocation data (country, city, etc.).
 *
 * @remarks
 * - **HTTP Method:** `GET`
 * - **Endpoint:** `https://ipapi.co/json` (external third-party API).
 * - **Auth:** None required.
 */
export const fetchIpInfo = () => {
    return axios({
        method: "GET",
        url: 'https://ipapi.co/json',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    });
};
