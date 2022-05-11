const errorHandler = (err, req, res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({ 
        msg:err?.message,
        //if it is production then dont give us which file was an error
        stack: process.env.NODE_ENV === 'production' ? null: err?.stack,
    });
};


//Route not found
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req?.originalUrl}`);
    //not found error
    res.status(404);
    //pass the error to the pipeline to handle
    next(error);
};

module.exports =  {errorHandler,notFound};