export function getRandomNum(min:number=0,max:number=100000000000000){
  var range = max - min;
  return(min + Math.round(Math.random() * range));
}
