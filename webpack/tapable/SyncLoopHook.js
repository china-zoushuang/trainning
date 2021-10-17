// const {SyncLoopHook} = require('tapable')

class SyncLoopHook {
    constructor(args) {
        this.args = args
        this.tasks =[]
    }
    tap(key, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret
            do{
                ret = task(...args)
            }while(ret)
        })
    }
}

const syncLoopHook = new SyncLoopHook(['name', 'age']) 

let total = 0
// 注册事件
// 类似 document.addEventListener('event', task)
syncLoopHook.tap('loop', function(...args) {
    console.log('total', total, ...args)
    if (total < 3) {
        total++
        return true
    } else {
        return undefined
    }
})

let total2 = 0
syncLoopHook.tap('loop2', function(...args) {
    console.log('total2', total2, ...args)
    if (total2 < 3) {
        total2++
        return true
    } else {
        return undefined
    }
})


// 触发事件
syncLoopHook.call('zs', 30)