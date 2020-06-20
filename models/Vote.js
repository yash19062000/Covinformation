const mong = require('mongoose');
const Schema = mong.Schema;

const VoteSchema = new Schema({
    points: {
        type: String,
        required: true
    },
    os: {
        type: String,
        //required: true
    },
    os1: {
        //required: true,
        type: String
    },
    os2: {
        //required: true,
        type: String
    },
    os3: {
        //required: true,
        type: String
    },
    os4: {
        //required: true,
        type: String
    },
    os5: {
        //required: true,
        type: String
    },
    os6: {
        //required: true,
        type: String
    }
});

//Creating collection and add schema
const Vote = mong.model('Vote', VoteSchema);

module.exports = Vote;