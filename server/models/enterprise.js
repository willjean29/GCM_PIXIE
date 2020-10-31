const {Schema, model} = require('mongoose');

const EnterpriseSchema = new Schema({
    nameEnterprise: {
        type: String,
        required: true
    },
    rucEnterprise: {
        type: String,
        required: true
    },
    imgEnterprise: {
        type: String,
        required: true
    },
    administrador: {
        type: ObjectId,
        required: true
    },
    networkEnterprise: Array,
    clients: Array
}, {
    timestamps: true
});

module.exports = model('enterprises', EnterpriseSchema);