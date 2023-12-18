const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

 export function formatTimestampToDDMonthYYYY(timestamp:string):string {

  
    const dateObject = new Date(timestamp);
    const day = dateObject.getUTCDate();
    const month = months[dateObject.getUTCMonth()];
    const year = dateObject.getUTCFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  