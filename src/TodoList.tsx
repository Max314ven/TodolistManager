import React from "react";
import s from "./Todolist.module.css"
import {TasksArrType} from "./App";

type TodoListType={
    title:string
    tasksArr:TasksArrType
    removeTask:(taskID:number)=>void
    changeActiveFilter:(value:"All"|"Active"|"Done")=>void
}

export function TodoList(props:TodoListType) {
    const onAllClickHandler=()=>{props.changeActiveFilter("All")}
    const onActiveClickHandler=()=>{props.changeActiveFilter("Active")}
    const onCompletedClickHandler=()=>{props.changeActiveFilter("Done")}




    return (
        <div className={s.todolist_container}>
            <div className={s.todolist_container__header}>
                <div className={s.todolist_container__header_title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={s.todolist_container__header_input}>
                    <input type="text" placeholder="Type new task here..."/>
                    <button>+</button>
                </div>
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    {
                        props.tasksArr.map(task=>{
                            return(
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={()=>props.removeTask(task.id)}>🗙</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={s.todolist_container__filters}>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Done</button>
            </div>
        </div>
    )
}