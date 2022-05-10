const express = require("express");
const jwt = require('jsonwebtoken');

const userRouter = require('./routers/users.router');
const categoriesRouter = require('./routers/categories.route');
const booksRouter = require('./routers/books.router');
const booksDetailRouter = require('./routers/booksDetail.router');
const ratingRouter = require('./routers/rating.router');
const readingListRouter = require('./routers/readingList.router');
const searchHistoryRouter = require('./routers/serachHistory.router');
const notificationRouter = require('./routers/notification.router');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const validUser = jwt.verify(req.headers.authorization.split(' ')[1], 'secret');
        
        if(validUser)
            req.user = validUser;
        else
            req.user = undefined;
    } else
        req.user = undefined;

    next();
});

app.use(userRouter);
app.use(categoriesRouter);
app.use(booksRouter);
app.use(booksDetailRouter);
app.use(ratingRouter);
app.use(readingListRouter);
app.use(searchHistoryRouter);
app.use(notificationRouter);

module.exports = app