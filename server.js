const express = require("express");
const dotenv = require("dotenv").config();
const postsRouter = require("./routers/posts");
const categoriesRouter = require("./routers/category");
const tagsRouter = require("./routers/tag");
const authRouter = require("./routers/auth");
const routeNotFoundMiddleware = require("./middlewares/routeNotFound");
const errorsFormatterMiddleware = require("./middlewares/errorsFormatter");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);
app.use("", authRouter);



app.use(errorsFormatterMiddleware);

app.use(routeNotFoundMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port http://localhost:${process.env.PORT}`)
})