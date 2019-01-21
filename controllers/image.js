const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ffc7fa482fad4a3eb148750d9a002847'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
};

const handleImage = (req, res, db) => {
    const {id} = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json())

};

module.exports = {
    handleImage,
    handleApiCall
};