const p1 = new Promise((resolve, reject) => setTimeout(reject, 1000, 1));
const p2 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'err 2'));
const p3 = new Promise((resolve) => setTimeout(resolve, 1500, 3));

Promise._allSettled = array => {
  const result = [];
  let counter = 0;
  
  return new Promise((resolve, reject) => {
    array.forEach((prom, i) => prom
      .then(
        value => result[i] = ({ status: 'fulfilled', value }),
        reason => result[i] = ({ status: 'rejected', reason }))
      .then(() => {
        counter++;
        if (counter === array.length) {
          resolve(result);
        }
      }));
  });
}

const prom = [p1, p2, p3];

Promise._allSettled([p1, p2, p3]).
  then(el => el.forEach(item => console.log(item)))