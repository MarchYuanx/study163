const arr = [{p: 100, b:true},{p: 70, b:false},{p: 90, b:true}]
const b = false
const sum = arr.map(a => a.p*a.b).reduce((x,y)=>(x+y))

console.log(sum)