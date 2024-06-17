// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
app.use(bodyParser.json());


app.use(cors());

const db = "mongodb+srv://mounikapriyaguddanti:jSm1hOv8mJylaDIH@cluster0.eviujnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(db)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    description: String,
    photo: String,
});

const stateSchema = new Schema({
    name: String,
    places: [placeSchema]
});

const categorySchema = new Schema({
    name: String,
    states: [stateSchema]
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

app.post('/categories', async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({ name, states: [] });
    await newCategory.save();
    res.json({ message: "Category added successfully!" });
});

app.post('/states', async (req, res) => {
    const { categoryName, stateName } = req.body;
    const category = await Category.findOne({ name: categoryName });
    if (category) {
        category.states.push({ name: stateName, places: [] });
        await category.save();
        res.json({ message: "State added successfully!" });
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

app.post('/places', async (req, res) => {
    const { categoryName, stateName, placeName, description, photo } = req.body;
    const category = await Category.findOne({ name: categoryName });
    if (category) {
        const state = category.states.find(state => state.name === stateName);
        if (state) {
            state.places.push({ name: placeName, description, photo });
            await category.save();
            res.json({ message: "Place added successfully!" });
        } else {
            res.status(404).json({ message: "State not found" });
        }
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

app.get('/locations', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
