// let range = {
//     from: 1,
//     to: 5,
//     *[Symbol.iterator]() {//前面加上*表示这是一个生成器函数
//         for (let current = this.from; current <= this.to; current++) {
//             yield current;//每次调用next方法时，函数会暂停在yield表达式处，并返回yield后面的值
//         }
//         // let current = this.from;
//         // return {
//         //     next: () => {
//         //         if (current <= this.to) {
//         //             return { value: current++, done: false }
//         //         } else {
//         //             return { done: true }
//         //         }
//         //     }
//         // }
//     }
// }
// const arr = 'abc';
// const arr = [1, 5, 6]
const arr = new Set([1, 2, 3, 6]);
const arr2 = new Map([['a', 1], ['b', 2], ['c', 3]]);
// console.log('arr2', arr2)
function a () {
    for (const element of arguments) {
        console.log('element', element)//可以像数组一样迭代arguments对象中的参数
    }
}
// a(2, 3, 5, 99);

// let range = {
//     from: 1,
//     to: 5,
//     *[Symbol.iterator]() {//前面加上*表示这是一个生成器函数
//         for (let current = this.from; current <= this.to; current++) {
//             yield current;//每次调用next方法时，函数会暂停在yield表达式处，并返回yield后面的值
//         }
//     }
// }
let asyncRange = {
    from: 1,
    to: 5,
    async *[Symbol.asyncIterator]() {//前面加上*表示这是一个生成器函数
        for (let current = this.from; current <= this.to; current++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            yield current;//每次调用next方法时，函数会暂停在yield表达式处，并返回yield后面的值
        }
    }
}
const run = async () => {
    for await (const item of asyncRange) {
        console.log('item', item)//尝试遍历range对象
    }
}
run();//1 2 3 4 5

// 可迭代函数
function* generateSequence() {
    yield 1//每次调用next方法时，函数会暂停在yield表达式处，并返回yield后面的值
    yield 2
    yield 3
    return 4
}

let generator = generateSequence();
// const run = () => {
//     for (const item of generator) {
//         console.log('item', item)
//     }
// }
// run()
// 运行结果：
// item 1
// item 2
// item 3

// console.log('generator', generator);//generator Object [Generator] {}
// console.log('generator.next()', generator.next());
// console.log('generator.next()', generator.next());
// console.log('generator.next()', generator.next());
// console.log('generator.next()', generator.next());//执行到最后一个yield表达式并停止，返回对象的value值为4
// console.log('generator', generator);
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

// for (const item of generator) {
//     console.log('item', item)
// }
const s = true || false
console.log('s', s)
