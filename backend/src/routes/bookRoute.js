import BookController from '../controllers/bookController.js';
import express from 'express';
import multer from "multer";

const router = express.Router();
const bookController = new BookController()

let imageName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
         imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + file.originalname.trim();
        cb(null, imageName)
    }
})

const upload = multer({ storage: storage })

// insert book 
router.post("/add", upload.single("image"), (req, res) => {
    bookController.addBook(req, res, imageName)
});

//get book by id
router.get("/:id", bookController.getBookById);

//get books  ?limit = 20
router.get("/", bookController.getBooks);

// update book
router.put("/update/:id", bookController.updateById);

//delete book by id
router.delete("/delete/:id", bookController.deleteBook);

//search books by query /search/all?q=
router.get("/search/all", bookController.searchBook);

export default router