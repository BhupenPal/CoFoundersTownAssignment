const multer = require("multer"),
    fs = require("fs"),
    { extname } = require('path'),
    MaxSize = 50 * 1024 * 1024; //1024 * 1024 = 1MB

const fileFilter = (req, file, cb) => {
    if (req.ValidationDataSet === false) {
		const { Make, Model, ModelYear, Price, BodyType, SeatCount, VINum, KMsDriven, Color, EngineSize, FuelType, WOFExpiry, REGExpiry, Description, Transmission, isExteriorVideo, isExteriorSlider } = req.body;
		
        //All this info is required and one out of Exterior Video or Slider is Mandatory
        if ((!Make || !Model || !ModelYear || !Price || !BodyType || !SeatCount || !VINum || !KMsDriven || !Color || !EngineSize || !FuelType || !WOFExpiry || !REGExpiry || !Description || !Transmission) || (!isExteriorVideo && !isExteriorSlider)) {
            return cb(new Error('Please fill in all the required fields'))
        } else {
            req.ValidationDataSet = true
        }
    }

    if (file.fieldname === 'ExteriorSlider') {
        const FileTypes = /jpeg|jpg|png|webp/
        const MIMEType = FileTypes.test(file.mimetype.toLowerCase())
        const EXT = FileTypes.test(extname(file.originalname).toLowerCase())

        if (MIMEType && EXT) {
            cb(null, true)
        } else {
            return cb(null, false, new Error('Only Images Are Supported For Exterior Slider And Interior'))
        }
    }

    else if (file.fieldname === 'ExteriorVideo') {
        const FileTypes = /avi|mp4|mov|quicktime/
        const MIMEType = FileTypes.test(file.mimetype.toLowerCase())
        const EXT = FileTypes.test(extname(file.originalname).toLowerCase())

        if (MIMEType && EXT) {
            cb(null, true)
        } else {
            return cb(null, false, new Error('Only Video is Supported For Exterior 360'))
        }
    }

    else {
        const FileTypes = /jpeg|jpg|png|webp/
        const MIMEType = FileTypes.test(file.mimetype.toLowerCase())
        const EXT = FileTypes.test(extname(file.originalname).toLowerCase())

        if (MIMEType && EXT) {
            cb(null, true)
        } else {
            return cb(null, false, new Error('Only Images Are Supported For Exterior Slider And Interior'))
        }
    }

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        let { VINum } = req.body;
        VINum = VINum.toUpperCase()

        //Creates folder for exterior, interior, and thumbnail
        if (!fs.existsSync(`./assets/uploads/cars/${VINum}`)) {
            fs.mkdirSync(`./assets/uploads/cars/${VINum}`)
            fs.mkdirSync(`./assets/uploads/cars/${VINum}/exterior`)
            fs.mkdirSync(`./assets/uploads/cars/${VINum}/exterior360`)
            fs.mkdirSync(`./assets/uploads/cars/${VINum}/interior360`)
            fs.mkdirSync(`./assets/uploads/cars/${VINum}/thumbnail`)
        }

        if (file.fieldname === 'ExteriorSlider') {
            cb(null, `./assets/uploads/cars/${VINum}/exterior/`)
        }

        else if (file.fieldname === 'ExteriorVideo') {
            cb(null, `./assets/uploads/cars/${VINum}/exterior360/`)
        }

        else {
            cb(null, `./assets/uploads/cars/${VINum}/interior360/`)
        }
    },

    filename: (req, file, cb) => {

        let ext = file.originalname.split(".").pop()
        let filename = ''

        if (file.fieldname === 'ExteriorSlider') {
            req.ExteriorSliderCount++
            filename = 'PHOTO_' + req.ExteriorSliderCount + "." + ext
            cb(null, filename)
        }

        else if (file.fieldname === 'ExteriorVideo') {
            filename = "video" + "." + ext
            cb(null, filename)
        }

        else {
            filename = file.fieldname + "." + ext;
            cb(null, filename.toUpperCase())
        }
    }
})

module.exports = multer({
    limits: { fileSize: MaxSize },
    fileFilter,
    storage
})
.fields([
    { name: "ExteriorSlider", maxCount: 12 },
    { name: "ExteriorVideo", maxCount: 1 },
    { name: "Interior", maxCount: 1 }
])