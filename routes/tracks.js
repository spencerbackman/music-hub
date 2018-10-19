const express = require('express');
const trackRouter = express.Router();
const Track = require('../models/tracks');

trackRouter.get('/', (req, res) => {
    Track.find((err, tracks) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(tracks);
    })
})

trackRouter.post('/', (req, res) => {
    const newTrack = new Track(req.body);
    newTrack.save((err, newTrack) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newTrack);
    })
})

trackRouter.delete('/:id', (req, res) => {
    Track.findOneAndRemove({_id: req.params.id}, (err, deletedTrack) => {
            if (err) return res.status(500).send(err)
            return res.send({message: "track has been succesfully deleted", deletedTrack})
        })
})

module.exports = trackRouter;