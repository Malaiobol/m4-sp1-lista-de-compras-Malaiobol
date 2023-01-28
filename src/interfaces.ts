interface Item{
    name:string,
    quantity: string,
}

interface IbuyListRequest{
    listName:string,
    data: [Item],
}

interface IbuyList extends IbuyListRequest{
    id:number,
}

type ItemRequiredKeys = "name" | "quantity";

export { 
    Item, IbuyListRequest, IbuyList, ItemRequiredKeys 
}