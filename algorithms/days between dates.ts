
let d1 = Date.now();
let dueDate = Date.parse("12/6/2017");
const one_day_mili = 1000 * 60 * 60 * 24; // miliseconds in one day

let diff = dueDate - d1;
console.log("Due date - current date= " + diff );
console.log("Due Date - current date= (Days)" + diff / one_day_mili);

