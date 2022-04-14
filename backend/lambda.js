const fetch = require("node-fetch");

exports.handler = async () => {
    const response = {
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
    };
    try {
        const resSsr = await fetch(
          "https://weatherportal.eu/api/HelloWorld"
        );

        const parsedData = await resSsr.text();

        response.body = {
            data: parsedData
        };

        response.statusCode = 200;
    } catch (e) {
        console.log("🛑 Error Response: ", e.message);
        response.statusCode = response.statusCode || 500;
        response.body = e.message;
    }
    return response;
}
