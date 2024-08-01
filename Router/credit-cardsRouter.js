// const express = require('express');
// const creditCardrouter = express.Router();
// const Card = require("../models/card-model");

// const menuItems = [
//     { url: '/', text: 'Home' },
//     { url: '/credit-cards', text: 'Credit Cards' },
//     { url: '/contact-us', text: 'Contact Us' },
//     { url: '/About', text: 'About' }
// ];

// // Static route for the credit cards page
// creditCardrouter.get('/credit-cards', (req, res) => {
//     res.render('credit-cards', { menuItems });
// });

// // Route to fetch card data
// creditCardrouter.get('/credit-cards/cards', async (req, res) => {
//     const { cardname, page = 1, limit = 8 } = req.query;
//     const queryObject = {};

//     if (cardname) {
//         queryObject.cardname = { $regex: cardname, $options: "i" };
//     }

//     let skip = (page - 1) * limit;

//     try {
//         const total = await Card.countDocuments(queryObject);
//         const totalPages = Math.ceil(total / limit);
//         const currentPage = Math.min(page, totalPages) || 1;
//         const myData = await Card.find(queryObject).skip((currentPage - 1) * limit).limit(limit);

//         if (myData.length === 0) {
//             return res.status(200).json({ message: "No results found" });
//         }

//         res.status(200).json({
//             totalPages,
//             currentPage,
//             data: myData
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// });

// // Dynamic route for each card
// creditCardrouter.get('/credit-cards/:cardname', async (req, res) => {
//     try {
//         const cardname = req.params.cardname.replace(/-/g, ' '); // Replace hyphens with spaces
//         const card = await Card.findOne({ cardname: cardname });

//         // if (!card) {
//         //     return res.status(404).render('404', { message: 'Card not found' });
//         // }

//         res.render(cardname.replace(/\s+/g, '-').toLowerCase(), { card, menuItems });
//     } catch (error) {
//         res.status(500).render('500', { message: 'Server Error', error });
//     }
// });

// creditCardrouter.get('/credit-cards', async (req, res) => {
//     const { issuer } = req.query;
    
//     // Fetch the card data
//     let cards = await getCreditCardData(); // Implement this function to get the card data
    
//     // Filter the data based on the issuer
//     if (issuer) {
//         cards = cards.filter(card => card.issuer === issuer);
//     }
    
//     // Send the filtered data as a response
//     res.json(cards);
// });

// module.exports = creditCardrouter;

const express = require('express');
const creditCardrouter = express.Router();
const Card = require("../models/card-model");

const menuItems = [
    { url: '/', text: 'Home' },
    { url: '/credit-cards', text: 'Credit Cards' },
    { url: '/contact-us', text: 'Contact Us' },
    { url: '/About', text: 'About' }
];

// Static route for the credit cards page
creditCardrouter.get('/credit-cards', (req, res) => {
    res.render('credit-cards', { menuItems });
});

// Route to fetch card data with filtering and pagination
creditCardrouter.get('/credit-cards/cards', async (req, res) => {
    const { cardname, issuer, page = 1, limit = 8 } = req.query;
    const queryObject = {};

    // Add card name filter if provided
    if (cardname) {
        queryObject.cardname = { $regex: cardname, $options: "i" };
    }

    // Add issuer filter if provided
    if (issuer) {
        queryObject.issuer = { $in: issuer.split(",") };
    }

    const skip = (page - 1) * limit;

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
});

// Dynamic route for each card
creditCardrouter.get('/credit-cards/:cardname', async (req, res) => {
    try {
        const cardname = req.params.cardname.replace(/-/g, ' '); // Replace hyphens with spaces
        const card = await Card.findOne({ cardname: cardname });

        // if (!card) {
        //     return res.status(404).render('404', { message: 'Card not found' });
        // }

        res.render(cardname.replace(/\s+/g, '-').toLowerCase(), { card, menuItems });
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error', error });
    }
});

module.exports = creditCardrouter;
