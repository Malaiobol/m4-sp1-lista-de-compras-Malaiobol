import express, { json, Application } from "express";
import { 
    validateBuyListData, validateItemList, 
    validateId, validateUpdateRequest 
} from "./middlewares";
import { 
    createList, getBuyLists, 
    getBuyListId, updateListItem, 
    deleteListItem, deleteList 
} from "./logic";

const app: Application = express();
app.use(json());

app.post("/purchaseList", validateBuyListData, validateItemList, createList);

app.get("/purchaseList", getBuyLists);
app.get("/purchaseList/:id", validateId, getBuyListId);

app.patch("/purchaseList/:id/:itemName", validateId, validateItemList, validateUpdateRequest, updateListItem);

app.delete("/purchaseList/:id", validateId, deleteList);
app.delete("/purchaseList/:id/:itemName", validateId, deleteListItem);

const PORT: number = 3000;
const runningMsg: string = `Server is running on htpp://localhost:${PORT}`;
app.listen(PORT, ()=> console.log(runningMsg));