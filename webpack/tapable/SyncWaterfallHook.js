// const {SyncWaterfallHook} = require('tapable')

class SyncWaterfallHook {
    constructor(args) {
        this.args = args
        this.tasks =[]
    }
    tap(key, task) {
        this.tasks.push(task)
    }
    call(...args) {
        const [fist, ...others] = this.tasks
        others.reduce((memo, cur) => {
            return cur(memo)
        }, fist(...args))
    }
}

const syncWaterfallHook = new SyncWaterfallHook(['name', 'age']) 

// 注册事件
// 类似 document.addEventListener('event', task)
syncWaterfallHook.tap('event', function(name, age) {
    console.log(1, name, age)
    return 1
})
syncWaterfallHook.tap('event2', function(data) {
    console.log(2, data)
    return 2
})
syncWaterfallHook.tap('event3', function(data) {
    console.log(3, data)
    return 3
})

// 触发事件
syncWaterfallHook.call('zs', 30)


/* 输出
    1 zs 30
    2 1
    3 2
*/