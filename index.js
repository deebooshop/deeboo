require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB connection
mongoose.set("strictQuery", true);
mongoose.connect(`mongodb+srv://yassinedhrif:22183977aze@cluster0.vy75o.mongodb.net/?retryWrites=true&w=majority`, {
    
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", err => {
   
  console.log("mongoose failed with", err);
});

// Import routes
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const authRouter = require("./routes/auth.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const cartRouter = require("./routes/cart.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes middlewares
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/carts", cartRouter);

app.use(express.static("./build"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

// Server listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});