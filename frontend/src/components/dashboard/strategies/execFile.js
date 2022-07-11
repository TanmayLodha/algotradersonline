// Execute File
import { BaseURL } from "../../../BaseURL";
export const execfile = (current) => {

    console.log("execfile");
    fetch(BaseURL + "api/execute/", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Token ${current.data.token}`, },

    })
        .then((response) => {
            if (response.ok === true) return response.json();
            else {
                throw new Error();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
};