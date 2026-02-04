import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 1. GET all events
router.get("/", async (req, res) => {
    let collection = await db.collection("events");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// 2. CREATE a new event
router.post("/", async (req, res) => {
    try {
        let newEvent = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            description: req.body.description,
            createdAt: new Date() // Optional: good for sorting
        };
        let collection = await db.collection("events");
        let result = await collection.insertOne(newEvent);
        res.send(result).status(204);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error adding event");
    }
});

// 3. UPDATE an event
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                title: req.body.title,
                date: req.body.date,
                image: req.body.image,
                description: req.body.description,
            },
        };
        let collection = await db.collection("events");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error updating event");
    }
});

// 4. DELETE an event
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("events");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting event");
    }
});

export default router;