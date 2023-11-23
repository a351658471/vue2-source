let id = 0

export class Dep {
    constructor(){
        this.id = id++
        this.subs = []
    }
    //收集依赖watcher
    depend(){
        Dep.target.addDep(this)
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    //更新
    notify(){
        this.subs.forEach(watcher => {
            watcher.updata()
        })
    }
}

Dep.target = null
export function pushTarget(watcher){
    Dep.target = watcher
}
export function PopTarget(){
    Dep.target = null
}