// const {AsyncSeriesHook} = require('tapable')

class AsyncSeriesHook {
    constructor(args) {
        this.args = args
        this.tasks = []
        this.step = 0
    }

    tapAsync(key, task) {
        this.tasks.push(task)
    }

    callAsync(...args) {
        let callback = args.pop()
        let i = 0
        let next = () => {
            let task = this.tasks[i]
            if (task) {
                task(...args, next) // 递归
                i++
            } else {
                callback()
            }
        }
        next()
    }

    tapPromise(key, task) {
        this.tasks.push(task)
    }

    promise(...args) {
        const [first, ...others] = this.tasks
        return others.reduce((memo, cur) => {
            return memo.then(() => cur(...args))
        }, first(...args))
    }
}

const asyncSeriesHook = new AsyncSeriesHook(['name'])

// /*** tap & callAsync ****/
// asyncSeriesHook.tapAsync('event1', function (name, next) {
//     setTimeout(() => {
//         console.log('event1', name)
//         next()
//     }, 1000);
// })

// asyncSeriesHook.tapAsync('event2', function (name, next) {
//     setTimeout(() => {
//         console.log('event2', name)
//         next()
//     }, 1000);
// })

// asyncSeriesHook.callAsync('zs', function() {
//     console.log('all done')
// })

/*** tapPromise & promise ****/
asyncSeriesHook.tapPromise('event1', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('event1', name)
            resolve()
        }, 1000);
    })
})

asyncSeriesHook.tapPromise('event2', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('event2', name)
            resolve()
        }, 1000);
    })
})

asyncSeriesHook.promise('zs').then(function () {
    console.log('all done')
})