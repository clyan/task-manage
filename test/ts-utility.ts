type Person = {
  name: string;
  age: number;
};

const xiaoming: Partial<Person> = { name: "小明" };

//Partial 实现原理
type Partial<T> = {
  [P in keyof T]?: T[P];
};
const shenmi: Omit<Person, "name"> = { age: 18 };

console.log(xiaoming);
