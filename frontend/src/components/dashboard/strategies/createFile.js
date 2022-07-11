// Update the unique user file with credentials and appned the strategy
import { BaseURL } from "../../../BaseURL";

export const createFile = (props, current) => {
    console.log("createFile")
    fetch(BaseURL + `api/strategies/${props.id}`, {
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

