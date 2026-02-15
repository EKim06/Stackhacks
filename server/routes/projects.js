import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 1. GET all projects
router.get("/", async (req, res) => {
    let collection = await db.collection("projects");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// 2. CREATE a new project
router.post("/", async (req, res) => {
    try {
        let newproject = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            description: req.body.description,
            createdAt: new Date() // Optional: good for sorting
        };
        let collection = await db.collection("projects");
        let result = await collection.insertOne(newproject);
        res.send(result).status(204);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error adding project");
    }
});

// 3. UPDATE an project
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
        let collection = await db.collection("projects");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error updating project");
    }
});

// 4. DELETE an project
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("projects");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting project");
    }
});

export default router;