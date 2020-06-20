const exp = require('express');
const Pusher = require('pusher');
const mong = require('mongoose');

const Vote = require('../models/Vote');

var pusher = new Pusher({
    appId: '1018883',
    key: 'e1f18e97ce7218d0fba1',
    secret: '8156dbb34cbc9e0c91a9',
    cluster: 'ap2',
    useTLS: true
});

//A Router instance is a complete middleware and routing system
const rout = exp.Router();

rout.get('/', (request, respond) => {
    Vote.find().then(votes => respond.json({ success: true, votes: votes }));
});

rout.post('/', (request, respond) => {

    const newVote = {
        os: request.body.os,
        points: 1,
        os1: request.body.os1,
        os2: request.body.os2,
        os3: request.body.os3,
        os4: request.body.os4,
        os5: request.body.os5,
        os6: request.body.os6
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('a', 'b', {
            points: 1,
            os: request.body.os,
            os1: request.body.os1,
            os2: request.body.os2,
            os3: request.body.os3,
            os4: request.body.os4,
            os5: request.body.os5,
            os6: request.body.os6
        });
        return respond.json({ success: true, message: "Come back soon" });
    });


});
module.exports = rout;
