// promise code
const AsyncHandeler = (requestHandeler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandeler(req, res))
            .catch(err => next(err));
    };
};


export { AsyncHandeler }