console.log("Starting   server");

var data;


const workerFetch = ({ method = "get", url = "http://localhost:8000", data = {}, listener = "" }) => {
    fetch({ method, url, data })
.then(response => response.json())
        .then( data  => {
            localStorage.setItem("data",JSON.stringify(data));
         this.data = localStorage.getItem("data");
            console.log(this.data);
            self.postMessage({ cmd: `worker_fetch_${listener}`, success: true, data });

        })
        .catch(error => {
            self.postMessage({ cmd: `worker_fetch_${listener}`, success: false, data: error });
        });
};

self.addEventListener(
    "message",
    ({ data }) => {
        switch (data.cmd) {
            case "worker_fetch":
                workerFetch(data.payload);
                break;
            default:
                return null;
        }
    },
    false
);



