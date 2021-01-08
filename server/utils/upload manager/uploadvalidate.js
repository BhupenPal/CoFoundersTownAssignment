const CarModel = require('../../models/Car.model'),
	createError = require('http-errors')

module.exports = (req, res, next) => {

	const { VINExistCheck } = req.query

	if (!VINExistCheck) res.json(createError.BadRequest())

	CarModel.findOne({ VINum: VINExistCheck }, (err, doc) => {
		if (!doc) {
			req.ValidationDataSet = false
			req.ExteriorSliderCount = 0
			next()
		} else {
			res.json(createError.Conflict('Car with same VIN/Plate already exists'))
		}
	})

}