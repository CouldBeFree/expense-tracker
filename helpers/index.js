export function refactorData (data) {
  if(!data){
    return
  }
  let holder = {};
  data.forEach(el => {
    if (holder.hasOwnProperty(el.category)) {
      holder[el.category] = holder[el.category] + el.amount;
    } else {
      holder[el.category] = el.amount;
    }
  });
  
  let target = [];
  for (let prop in holder) {
    target.push({ category: prop, amount: holder[prop] });
  }
  return target;
}