Promise._any = array => {
  const result = [];
  let counter = 0; ы

  return new Promise((resolve, _) => {
    array.forEach((prom, i) => prom
      .then(
        value => resolve(value),
        reason => result[i] = ({ status: 'rejected', reason }))
      .then(() => {
        counter++;
        if (counter === array.length) {
          resolve(result);
        }
      }));
  });
}

Promise._allSettled = array => {
  const result = [];
  let counter = 0;

  return new Promise((resolve, _) => {
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

Promise._finally = fn => {
  const fn2 = () => this;
  const prom = () => Promise.resolve(fn()).then(fn2);
  return this.then(prom, prom);
};
