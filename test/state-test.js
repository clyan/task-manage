const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `num value in message ${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};
const add = test();
const unmount = add();
add();
add();
add();
add();
unmount();
