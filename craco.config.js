const path = require("path");
const {whenProd} = require("@craco/craco");
module.exports = {
    webpack: {
        alias: {
            "src": path.resolve(__dirname, "./src")
        },
        configure: {
            ...whenProd(() => ({
                output: {
                    publicPath: "/app-ideas-challenge/"
                }
            }), {})
        }
    }
}