class NetworkHelper {
    static responseSuccess(code, data, res) {
        return res
            .status(code)
            .json(data);
    }


    static responseError(code, error, res) {
        return res
            .status(code)
            .json({
                error: error
            })
    }

}

module.exports = NetworkHelper;