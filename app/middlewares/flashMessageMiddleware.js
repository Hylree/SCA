
const flashMiddleware = (req, res, next) => {

    const   jsonParseSuccess = req.cookies.flashSuccess,
            jsonParseErrors = req.cookies.flashErrors;
    
    res.locals.flashSuccess = jsonParseSuccess;
    res.locals.flashErrors = jsonParseErrors;
    
    res.clearCookie('flashSuccess');
    res.clearCookie('flashErrors');
    next();
}


module.exports = flashMiddleware;