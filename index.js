const fs= require("fs");
const readline=require("readline");
const rl =readline.createInterface({
 input:process.stdin,
 output:process.stdout,
});
let employees=[];
function loadEmployees(){
 const data =fs.readFileSync("employees.json");
 employees=JSON.parse(data);
}
function saveEmployees(){
 fs.writeFileSync("employees.json",JSON.stringify(employees,null,2));
}
function showMenu(){
 console.log("Employee Management System");
 console.log("1. Add Employee");
 console.log("2. View Employees");
 console.log("3. Update Employees");
 console.log("4. Delete Employee");
 console.log("5. Exit");
 rl.question("Choose an option: ",(choice)=>{
  switch(choice){
   case "1":
    addEmployee();
    break;
    case "2":
     viewEmployee();
     break;
     case "3":
      updateEmployee();
      break;
      case "4":
      deleteEmployee();
      break;
      case "5":
       rl.close();
       break;
       default:
        console.log("Invalid Choice!");
        showMenu();
  }
 });
}
function addEmployee(){
 rl.question("Enter Employee ID: ",(id)=>{
  rl.question("Enter Name: ",(name)=>{
   rl.question("Enter Salary: ",(salary)=>{
    if(!id||!name||isNaN(salary)){
     console.log("Invalid input");
     return showMenu();
    }
    employees.push({
     id,
     name,
     salary:Number(salary),
    });
    saveEmployees();
    console.log("Employee added successfully");
    showMenu();
   });
  });
 });
}
function viewEmployee(){
 if(employees.length===0){
  console.log("No employees found");
 }else{
  console.table(employees);
 }
 showMenu();
}
function updateEmployee(){
 rl.question("Enter Employee ID to Update: ",(id)=>{
  const emp=employees.find(e=>e.id===id);
  if(!emp){
   console.log("Employee not found");
   return showMenu();
  }
  rl.question("Enter new Name: ",(name)=>{
   rl.question("Enter new salary: ",(salary)=>{
    if(!name|| isNaN(salary)){
     console.log("Invalid input");
     return showMenu();
    }
    emp.name=name;
    emp.salary=Number(salary);
    saveEmployees();
    console.log("Employee update successfully");
    showMenu();
   });
  });
 });
}
function deleteEmployee(){
 rl.question("Enter Employee ID to delete:",(id)=>{
  const index=employees.findIndex(e=>e.id===id);
  if(index===-1){
   console.log("Employeee not found");
   return showMenu();
  }
  employees.splice(index,1);
  saveEmployees();
  console.log("Employee deleted successfully");
  showMenu();
 });
}
loadEmployees();
showMenu();