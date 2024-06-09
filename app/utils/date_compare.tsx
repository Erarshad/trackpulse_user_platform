export function compareDate(date1:Date, date2:Date){
    const date1Year = date1.getFullYear();
    const date1Month = date1.getMonth();
    const date1Day = date1.getDate();
  
    const date2Year = date2.getFullYear();
    const date2Month = date2.getMonth();
    const date2Day = date2.getDate();
  
    if (date1Year === date2Year && date1Month === date2Month && date1Day === date2Day) {
      return 0; // Dates are equal
    } else if (date1Year < date2Year || (date1Year === date2Year && date1Month < date2Month) || (date1Year === date2Year && date1Month === date2Month && date1Day < date2Day)) {
      return -1; // date1 is earlier than date2
    } else {
      return 1; // date1 is later than date2
    }
  };
  
//   // Example usage
//   const date1 = new Date('2024-02-05');
//   const date2 = new Date('2024-02-05');
//   const date3 = new Date('2024-02-06');
  
//   console.log(compareOnlyDate(date1, date2)); // Output: 0 (Dates are equal)
//   console.log(compareOnlyDate(date1, date3)); // Output: -1 (date1 is earlier than date3)
//   console.log(compareOnlyDate(date3, date1)); // Output: 1 (date3 is later than date1)
  