import express from "express";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening in port ${PORT}`);

app.listen(PORT, handleListen);
