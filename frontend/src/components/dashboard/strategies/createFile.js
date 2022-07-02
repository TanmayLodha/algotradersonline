// Update the unique user file with credentials and appned the strategy
import { BaseURL } from "../../../BaseURL";

export const createFile = (props, current) => {

    const request = { username: current.data.username };
    console.log("createFile")
    fetch(BaseURL + `api/strategies/${props.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
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

