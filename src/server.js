const express = require("express");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const name = req.query.name || "developer";
  res.send(`
    <html>
      <body>
        <h1>Welcome, ${name}</h1>
        <p>This demo app intentionally contains security issues.</p>
      </body>
    </html>
  `);
});

app.use("/users", usersRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Vulnerable demo app listening on port ${port}`);
});
