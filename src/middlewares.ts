import { NextFunction, Request, Response } from "express"
import { BuyListData } from "./database";
import { IbuyList, Item } from "./interfaces";

const validateBuyListData = (req: Request, resp: Response, next: NextFunction): void | Response =>{
    const requiredKeys = ["listName", "data"];
    const actualKeys = Object.keys(req.body);
    let validateKeys = requiredKeys.every(key => actualKeys.includes(key)); 

    if(req.method === "PATCH"){
        validateKeys = requiredKeys.some(key => actualKeys.includes(key)) 
        && requiredKeys.every((key: string) => actualKeys.includes(key))
    };
    if(!validateKeys){
        throw new Error (`Required keys are [${requiredKeys}]`)
    };
    next();
}

const validateItemList = (req: Request, resp: Response, next: NextFunction): void | Response =>{
    const requiredKeys = ["name", "quantity"];
    const actualList = req.body.data;
    const verifyList = () =>{
        const dataIsArray = Array.isArray(actualList);
        if(dataIsArray && actualList.length > 0){
            actualList.map((item: Item)=>{
                let valid = requiredKeys.every(key => Object.keys(item).includes(key));
                if((typeof(item.name, item.quantity) !== "string")){
                    valid = false;
                } 
                if(!valid){
                   return resp.status(400).json(`Required keys are [${requiredKeys}] in data`);
                }
            })
        } else{
            return resp.status(400).json({
                message: "Bad request, please verify your data request"
            })
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
    const ID = +req.params.id;
    const actualList = BuyListData.findIndex(list => list.id === ID);
    if(actualList !== -1){
        next();
    }else{
        return resp.status(404).json({
            message: `List not found`
        })
    }
}

const validateUpdateRequest = ( req: Request, resp: Response, next: NextFunction ): void | Response =>{
    const ID:number = +req.params.id;
    const itemNameParams = req.params.itemName;
    const nameItemReq:string = req.body.name;
    const quantityItemReq:string = req.body.quantity;
    const actualList = BuyListData.find(list => list.id === ID);
    const validateNameParams = (actualList?.data.some(item => item.name === itemNameParams));
    if(typeof(nameItemReq && quantityItemReq) === "string" && validateNameParams){
        next();
    } else{
        return resp.status(400).json({
            message: `Verify your request`
        })
    }
}

export { validateBuyListData, validateItemList, validateId, validateUpdateRequest }