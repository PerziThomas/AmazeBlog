function buildErrorObject(error, msg) {
    return {
        code: error,
        msg: msg,
        time: Date.now()
    }
}

export default buildErrorObject;