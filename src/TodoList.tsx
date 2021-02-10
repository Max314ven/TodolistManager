import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css"
import {TasksArrType} from "./App";

type TodoListType = {
    title: string
    tasksArr: TasksArrType
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeActiveFilter: (value: "All" | "Active" | "Done") => void
}

export function TodoList(props: TodoListType) {
    let [title, setTitle] = useState("")


    const addTask = () => {
        props.addTask(title)
    }
    const onAllClickHandler = () => {
        props.changeActiveFilter("All")
    }
    const onActiveClickHandler = () => {
        props.changeActiveFilter("Active")
    }
    const onCompletedClickHandler = () => {
        props.changeActiveFilter("Done")
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const inputOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }


    return (
        <div className={s.todolist_container}>
            <div className={s.todolist_container__header}>
                <div className={s.todolist_container__header_title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={s.todolist_container__header_input}>
                    <input type="text"
                           placeholder="Type new task here..."
                           value={title}
                           onChange={inputOnChangeHandler}
                           onKeyPress={inputOnKeyPressHandler}
                    />
                    <button onClick={addTask}>+</button>
                </div>
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    {
                        props.tasksArr.map(task => {
                            const removeTask=()=>props.removeTask(task.id)

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={removeTask}>🗙</button>
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