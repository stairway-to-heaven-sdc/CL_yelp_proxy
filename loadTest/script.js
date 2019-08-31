import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    stages: [
        { duration: "2m", target: 100 },
        { duration: "1m30s", target: 200 },
        { duration: "60s", target: 300 },
        { duration: "2m", target: 500 },
        { duration: "1m30s", target: 600 },
        { duration: "60s", target: 700 },
        { duration: "60s", target: 800 },
        { duration: "1m30s", target: 900 },
        { duration: "2m", target: 1000 },
        { duration: "60s", target: 800 },
        { duration: "60s", target: 600 },
    ]
};

export default function () {
    let res = http.get("http://localhost:3000/");
    check(res, {
        "status was 200": (r) => r.status == 200,
        "transaction time OK": (r) => r.timings.duration < 1000
    });


    //sleep(1);
};

// export default function () {
//     let res = http.get("http://localhost:3002/user/999990");
//     check(res, {
//         "status was 200": (r) => r.status == 200,
//         "transaction time OK": (r) => r.timings.duration < 200
//     });
//     //sleep(1);
// };

