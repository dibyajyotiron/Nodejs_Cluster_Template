const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { uidPlugin } = require("./plugins");
const userSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});
userSchema.pre("save", function(next) {
    if (!this.isNew) {
        this.updatedAt = Date.now();
    }
    next();
})
// mongoose.plugin(uidPlugin);
module.exports.User = mongoose.model("User", userSchema);
