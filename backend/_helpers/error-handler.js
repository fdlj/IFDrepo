module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        console.log('// custom application error')
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        console.log('// mongoose validation error')
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        console.log('// jwt authentication error')
        return res.status(401).json({ message: 'Invalid Token' });
    }

    console.log('// default to 500 server error')
    return res.status(500).json({ message: err.message });
}