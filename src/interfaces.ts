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

export { Item, IbuyListRequest, IbuyList } 