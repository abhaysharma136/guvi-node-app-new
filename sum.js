const sum=(n1,n2)=>n1+n2;
// console.log(sum(5,5));
// console.log(process.argv);

const[,,num1,num2]=process.argv;
console.log(sum(+num1,+num2));