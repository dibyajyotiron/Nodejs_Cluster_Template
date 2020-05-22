module.exports = {
    validateReqBody(joiSchema) {
        return (req, res, next) => {
            const { error } = joiSchema(req.body, req);
            if (!error) return next();
            return res.status(422).json({
                error: true,
                message: error.details ? error.details[0].message : error.message,
            });
        };
    },
};
