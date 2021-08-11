
export interface PackInfo {
    id: string;
    createTime: Date;
    status: PackStatus;
    title: string;
}

export interface ItemInfo {
    id: string;
    packId: string;
    createTime: Date;
    content: string;
    status: ItemStatus; 
}

export enum ItemStatus {
    TODO = 1,
    DONE = 2,
}

export enum PackStatus {
    TODO = 1,
    DONE = 2,
}