const mongoose = require("mongoose");
const { Schema } = mongoose;
const { uidPlugin } = require("./plugins");
const eventSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    filterValue: {
        type: Boolean,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});
eventSchema.pre("save", function(next) {
    if (!this.isNew) {
        this.updatedAt = Date.now();
    }
    next();
})
mongoose.plugin(uidPlugin);
module.exports.Event = mongoose.model("Event", eventSchema);
