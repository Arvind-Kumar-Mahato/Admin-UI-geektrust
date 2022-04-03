import config  from "../constants";

export const GetTotalPage = (length)=>{
    return Math.ceil(length/10);
}

export const GetRecordIndex = (page)=>{
    return (page-1) *config.Page_Size;
}