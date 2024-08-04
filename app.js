const express = require('express');
const fs = require('fs'); 
const path = require('path');
const app = express();
const connectDb = require('./utils/db');
const hbs = require('hbs');
const SendData = require('./models/user-model'); 
const webContact = require('./models/contact-us-models');
const creditCardrouter = require('./Router/credit-cardsRouter');

app.use(cors(
    {
        origin: ['http://deploy-mern-1whq.vercel.app'],
        methods: ['GET', 'POST'],
        credentials :true
    }
))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', creditCardrouter);


const templateJoin = path.join(__dirname, 'templates/views');
const partialJoin = path.join(__dirname, 'templates/Partials');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', templateJoin);
hbs.registerPartials(partialJoin);

const menuItems = [
    { url: '/', text: 'Home' },
    { url: '/credit-cards', text: 'Credit Cards' },
    { url: '/contact-us', text: 'Contact Us' },
    { url: '/About', text: 'About' }
    
];

const images = [
    '/assets/slider-img/Accor-infinite.png',
    '/assets/slider-img/etihad-infinite-card_tcm51-al-h.png',
    '/assets/slider-img/saqer.png',
    '/assets/slider-img/manUtdCard_showcase.png',
    '/assets/slider-img/skywardsInfinite-nbd.png',
    '/assets/slider-img/Al-hilalSmart-platinum-card.jpg',
    '/assets/slider-img/cashback-plus-card-1487576128645.jpg',
    '/assets/who.jpg',
    '/navlogo.png',
    '/logo.png?v=2',
];


app.get('/', (req, res) => {
    res.render('index', { menuItems, images });
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us', { menuItems });
})

app.get('/About', (req, res) => {
    res.render('About', { menuItems });
})

app.post('/contact-us', async (req, res) => {
    try {
        const { username, email, message } = req.body;

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }

        const userdtls = new webContact({
            username,
            email,
            message
        });

        await userdtls.save();
        return res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Failed to process request", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/cards', async (req, res) => {
    try {
        const { username, phone, email, salary, hiddenData1, hiddenData2 } = req.body;

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
        }
        if (phone.length < 10 || phone.length > 20) {
            return res.status(400).json({ message: 'Phone number must be between 10 and 20 characters long.' });
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }
        if (salary < 5000) {
            return res.status(400).json({ message: 'Salary must be at least 5000.' });
        }

        const userdtls = new SendData({
            username: username,
            phone: phone,
            email: email,
            salary: salary,
            hiddenData1: hiddenData1,
            hiddenData2: hiddenData2
        });

        await userdtls.save();

        return res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Failed to process request", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});
