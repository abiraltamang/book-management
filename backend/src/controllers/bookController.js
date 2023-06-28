import bookModel from '../models/bookModel.js';
import { Op } from "sequelize";
import textConstants from "../constants/textConstants.js";
import urlConstants from "../constants/urlConstants.js";

export default class BookController {
    async addBook(req, res, imageName) {
        const data = await bookModel.create({ ...req.body, image: imageName })
        if (data) {
            res.json(data)
        } else {
            res.json({ success: false, message: "error during adding the book" })
        }
    }

    //get book by id
    async getBookById(req, res) {
        const { id } = req.params;

        if (id) {
            const data = await bookModel.findByPk(id);
            console.log(data)
            data ? res.json(data) : res.json([])
        }
        else
            res.json({ success: false, message: "Book id not provided" })
    }

    //update book by id
    async updateById(req, res) {
        const { id } = req.params;

        if (id) {
            const data = await bookModel.update(req.body, {
                where: {
                    id: id,
                }
            });
            if (data[0] === 1) {
                res.json({ success: true, message: "book is updated succesfully" })
            }
            else
                res.json({ success: false, message: "book not updated" })

        } else res.json({ success: false, messsage: " Book id not provied" })

    }

    //delete book by id
    async deleteBook(req, res) {
        const { id } = req.params;

        if (id) {
            const data = await bookModel.destroy({
                where: {
                    id: id,
                }
            });
            if (data) {
                res.json({ success: true, message: "book is deleted succesfully" })
            }
            else
                res.json({ success: false, message: "book not deleted" })

        } else res.json({ success: false, messsage: " Book id not provied" })

    }

    async searchBook(req, res) {
        const { q } = req.query;

        if (q) {
            const data = await bookModel.findAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${q}%`,
                        },
                        author: {
                            [Op.like]: `%${q}%`,
                        },
                    },
                },
                raw: true,
            });

            console.log(data);
            for (let d of data) {
                d.image = urlConstants.IMG_PATH_URL + d.image;
                console.log(d.image);
            }
            res.json(data);
        } else res.json({ success: false, message: "Empty Query Search string." });
    }

    async getBooks(req, res) {
        let { limit } = req.query;
        if (!limit) limit = 20;
        try {
            const data = await bookModel.findAll({
                limit: parseInt(limit),
                raw: true,
            });
            console.log(data);
            for (let d of data) {
                d.image = urlConstants.IMG_PATH_URL + d.image;
                console.log(d.image);
            }

            res.json(data);
        } catch (err) {
            res.json({ success: false, message: err });
        }
    }
}