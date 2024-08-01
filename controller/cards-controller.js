const Card = require("../models/card-model");

const displayCards = async (req, res) => {
    const { issuer,cardname, page = 1, limit = 8 } = req.query;
    const queryObject = {};

    if (cardname) {
        queryObject.cardname = { $regex: cardname, $options: "i" };
    }

    if (issuer) {
        queryObject.issuer = { $in: issuer.split(",") };
    }

    let skip = (page - 1) * limit;

    try {
        const total = await Card.countDocuments(queryObject);
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.min(page, totalPages) || 1;
        const myData = await Card.find(queryObject).skip((currentPage - 1) * limit).limit(limit);

        if (myData.length === 0) {
            return res.status(200).json({ message: "No results found" });
        }

        res.status(200).json({
            totalPages,
            currentPage,
            data: myData
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = displayCards;
