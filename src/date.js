const dateFormat = require('dateformat');

export const getCurrentDate=()=> {
    const date = new Date();
    const formateDate=dateFormat(Date.parse(date), "yyyy-mm-dd");
    return formateDate;
  };

export const setDateTime=(itemDate)=> {
    const date = new Date(itemDate);
    const formateDate=dateFormat(Date.parse(date), "yyyy-mm-dd");
    return formateDate;
  };

export const setDateTimeNormal=(itemDate)=> {
    const date = new Date(itemDate);
    const year= date.getFullYear();
    const month=date.getMonth();
    const day=date.getDay();
    let formateDate='';
    if(year && month && day) {
         formateDate = dateFormat(Date.parse(date), "dd-mm-yyyy");
    }
    else if (year && month){
         formateDate = dateFormat(Date.parse(date), "mm-yyyy");
    }
    else{
         formateDate = dateFormat(Date.parse(date), "yyyy");
    }
    return formateDate;
  };