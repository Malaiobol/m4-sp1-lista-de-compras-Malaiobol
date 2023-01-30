import { Request, Response } from "express";
import { BuyListData } from "./database";
import { IbuyList, Item } from "./interfaces";

let listId = 1;
const createList = ( req: Request, resp: Response ): Response => {
    try {
        const newList = req.body;
        const newListData: IbuyList = {
            id: listId++,
            ...newList,
        }
        BuyListData.push(newListData);
        return resp.status(201).json(newListData);  
    } catch (err) {
        if(err instanceof Error){
            return resp.status(404).json({
                message: err.message,
            })
        };
        return resp.status(500).json({
            message: "Internal Server Error"
        });
    };
};

const getBuyLists = ( req: Request, resp: Response ): Response => {
    return resp.status(200).json(BuyListData);
}

const getBuyListId = ( req: Request, resp: Response ): Response => {
    try{
        const ID = +req.params.id;
        BuyListData.forEach((list: IbuyList)=>{
            if(list.id === ID){
                return resp.status(200).json(list);
            }
        })
        return resp.status(400).json({
            message: "Bad request"
        })
    }catch(err){
        if(err instanceof Error){
            return resp.status(404).json({
                message: err.message,
            })
        };
        return resp.status(500).json({
            message: "Internal Server Error"
        })
    };
}
const updateListItem = ( req: Request, resp: Response ): Response => {
    try {
        const ID = +req.params.id;
        const itemName = req.params.itemName;
        const updateReq = req.body;
        const actualList = BuyListData.find(list => list.id === ID);
        if(actualList){
            const updateItem = actualList.data.findIndex(item => item.name === itemName);
            actualList.data.splice(updateItem, 1, updateReq);
        }   
        return resp.status(200).json(actualList?.data);
    } catch (err) {
        if(err instanceof Error){
            return resp.status(404).json({
                message: err.message,
            })
        };
        return resp.status(500).json({
            message: "Internal Server Error"
        })
    };     
}  


const deleteListItem = ( req: Request, resp: Response ): Response => {
    try {
        const ID: number = +req.params.id;
        const requestedItem: string = req.params.itemName;
        BuyListData.forEach((list: IbuyList)=>{
            if(list.id === ID){
               const listItens: Array<Item> = list.data;
               listItens.forEach((item: Item)=>{
                    if(item.name === requestedItem){
                        const indexItem = listItens.indexOf(item);
                        listItens.splice(indexItem, 1);
                    }
               })
            }
        })
        return resp.status(204).json();  
    } catch (err) {
        if(err instanceof Error){
            return resp.status(404).json({
                message: err.message,
            })
        };
        return resp.status(500).json({
            message: "Internal Server Error"
        })
    };  
}
const deleteList = ( req: Request, resp: Response ): Response => {
    try{
        const ID = req.params.id;
        const listIndex = BuyListData.findIndex(list => list.id === +ID);
        BuyListData.splice(listIndex, 1);
        return resp.status(204).json();
    }catch(err){
        if(err instanceof Error){
            return resp.status(404).json({
                message: err.message,
            })
        };
        return resp.status(500).json({
            message: "Internal Server Error"
        });
    };
}

export {
    createList,
    getBuyLists,
    getBuyListId,
    updateListItem,
    deleteListItem,
    deleteList,
}