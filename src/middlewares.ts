import { NextFunction, Request, Response } from "express"
import { BuyListData } from "./database";

const validateBuyListData = (req: Request, resp: Response, next: NextFunction): void | Response =>{
    const requiredKeys = ["listName", "data"];
    const actualKeys = Object.keys(req.body);

    let validateKeys = requiredKeys.every(key => actualKeys.includes(key)) 
    && requiredKeys.some(key => actualKeys.includes(key));
    console.log(validateKeys);

    if(req.method === "PATCH"){
        validateKeys = requiredKeys.some(key => actualKeys.includes(key)) 
        && requiredKeys.every((key: string) => actualKeys.includes(key))
        console.log(validateKeys);
    }
    if(!validateKeys){
        return resp.status(400).send(`Required keys are [${requiredKeys}]`)
    }
    next();
}

const validateItemList = (req: Request, resp: Response, next: NextFunction): void | Response =>{
    const requiredKeys = ["name", "quantity"];
    const actualList = req.body.data;
    const verifyList = () =>{
        const dataIsArray = Array.isArray(actualList);

        if(dataIsArray && req.body.length > 0){
            actualList.map((item:{name?:string, quantity?:string})=>{
                const valid = requiredKeys.every(key => Object.keys(item).includes(key));
                if(!valid){
                   return resp.status(400).json(`Required keys are [${requiredKeys}] in data`);
                }
            })
        } else{
            return resp.status(400).json({
                message: "Bad request, please verify your data"
            });
        }
    }
    if(req.method === "PATCH"){
       const buyList = Object.keys(req.body).includes("data");
       buyList && verifyList();
    } else {
       verifyList(); 
    }  
    next();
}

const validateId = ( req: Request, resp: Response, next: NextFunction): void | Response =>{
    const ID = req.params.id;
    const idList = BuyListData.findIndex(list => list.id === +ID);
    if(idList !== -1){
        next(); 
    } else {
        return resp.status(404).json({message: `List not found`})
    }
}