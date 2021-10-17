// const {SyncHook} = require('tapable')

class SyncHook {
    constructor(args) {
        this.args = args
        this.tasks =[]
    }
    tap(key, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => task(...args))
    }
}

const syncHook = new SyncHook(['name', 'age']) 

// 注册事件
// 类似 document.addEventListener('event', task)
syncHook.tap('event', function(...args) {
    console.log(...args)
})

// 触发事件
syncHook.call('zs', 30)