import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/')
    },
    filename: function(req,file,cb) {
        const now = new Date().getTime()
        const [,fileExtension] = file.mimetype.split("/")
        const filename = `${now}.${fileExtension}`
        cb(null,filename)
        req.body = {
            ...req.body,
            photo:filename
        }
    }
})

export const storageMiddlleware = multer({storage})