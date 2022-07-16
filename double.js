const dbl=(n)=>n*2;
// console.log(dbl(5));

// console.log(process.argv);
const [,,num]=process.argv;
console.log(dbl(num));