function handleError(err, req, res, next) {
    if(Object.keys(err).includes("code")) {
        res.status(err.code).send(err);
    } else {
        res.status(400).send(err.message);
    }
}

export default handleError;