import express from "express";
import cors from "cors";
import records from "./routes/record.js"
import events from "./routes/events.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/events", events)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})