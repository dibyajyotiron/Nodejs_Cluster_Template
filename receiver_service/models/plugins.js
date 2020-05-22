module.exports = {
    uidPlugin: function(schema) {
        schema.add({
            uid: {
                type: String,
                required: true,
            },
            sequelizeId: String,
        });
    }
};
