var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname))//Date.now() + '-' + file.originalname + path.extname(file.originalname)
    }
})

var upload = multer({ storage: storage }).array('images');

upload(req, res, async function (err) {
    if (err) { reject(err) }
    if (req.files === undefined) { return resolve(false) }
    // console.log('req.files', req.files)
    const imgURLS = []
    for (let i = 0; i < req.files.length; i++) {
        // const IMGURL = { URL: req.files[i].path }
        // console.log('req.files[i].path', req.files[i].path)
        imgURLS.push(req.files[i].path)
    }
    console.log('imgURLS', imgURLS)
    resolve(imgURLS)
});