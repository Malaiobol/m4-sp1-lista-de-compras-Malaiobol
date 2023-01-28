import express, { json, Application } from "express";

const app: Application = express();
app.use(json());

app.post("/purchaseList",);
app.get("/purchaseList",);
app.get("/purchaseList/:id",);
app.patch("/purchaseList/:id/itemName",);
app.delete("/purchaseList/:id/itemName",);
app.delete("/purchaseList/:id",);

const PORT: number = 3000;
const runningMsg: string = `Server is running on htpp://localhost:${PORT}`;
app.listen(PORT, ()=> console.log(runningMsg));