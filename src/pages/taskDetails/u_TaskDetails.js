import s from './s_TaskDetails.module.css'

export function shortenTask(id) {
    `Task ${id.slice(0, 4)}...
    ${id.slice(id.length - 5, id.length)}`
}

export function getClass(label) {
    return `${label.type === "radio"
        ? s["task-name-label-radio"]
        : s["task-name-label"]
        } ${label.name === "completed" ? s.completed : ""}`
}


