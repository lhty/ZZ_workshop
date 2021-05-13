type concatFn = (...args: Array<string>) => string;

const concat: concatFn = (...args) => args.reduce((acc, str) => (acc += str), '');

concat('Hello ', 'World'); // -> Hello World;

//

interface ImyHometask {
  [key: string]: string | Array<string | number> | Array<ImyHometask>;
}

const myHometask: ImyHometask = {
  howIDoIt: 'I Do It Wel',
  simeArray: ['string one', 'string two', 42],
  withData: [{ howIDoIt: 'I Do It Wel', simeArray: ['string one', 23] }],
};

//

interface MyArray<T> {
  [key: number]: T;

  map<U>(cb: (n: T) => U): U[];

  reduce<U>(cb: (acc: U, curr: T, i: number, arr: MyArray<T>) => U, initial?: U): U;
}

const test: MyArray<number> = [1, 2, 3, 4, 5];
test.map<number>((n) => n * 2);
test.reduce<number>((acc, n) => (acc += n));
