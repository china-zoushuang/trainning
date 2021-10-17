// const {SyncBailHook} = require('tapable')

class SyncBailHook {
    constructor(args) {
        this.args = args
        this.tasks =[]
    }
    tap(key, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret // task 执行返回值
        let i = 0
        // 串行同步执行，有一个返回值不为 null，则跳过剩下的逻辑
        do{
            ret = this.tasks[i](...args)
            i++
        }while(!ret)
    }
}

const syncBailHook = new SyncBailHook(['name', 'age']) 

// 类似 document.addEventListener('eventName', task)
syncBailHook.tap('event', function(data) {
    console.log('此处返回了非空值，则此处终止，不会执行 注册事件event2',data)
    return data
})

syncBailHook.tap('event2', function(data) {
    console.log(data)
})

syncBailHook.call(123)