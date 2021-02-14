import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css"
import {filterValueType, TasksArrType} from "./App";

type TodoListType = {
    id:string
    title: string
    tasksArr: TasksArrType
    removeTask: (taskID: string, todoListID:string) => void
    addTask: (title: string, todoListID:string) => void
    changeActiveFilter: (value: filterValueType, todoListID:string) => void
    changeCheckboxStatus: (id: string, isDone: boolean, todoListID:string) => void
    filter:filterValueType
    deleteTodoList:(todoListID:string)=>void
}

export function TodoList(props: TodoListType) {
    let [title, setTitle] = useState("")
    let[error, setError]= useState<string|null>(null)


    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        }else{
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => {
        props.changeActiveFilter("All", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeActiveFilter("Active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeActiveFilter("Done", props.id)
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
                    <button className={s.todolist_container__header_title_btn} onClick={()=>{props.deleteTodoList(props.id)}}>🗙</button>
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
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    {
                        props.tasksArr.map(task => {
                            const removeTask = () => props.removeTask(task.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeCheckboxStatus(task.id, newIsDoneValue, props.id)
                            }
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                                    <span>{task.title}</span>
                                    <button onClick={removeTask}>🗙</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={s.todolist_container__filters}>
                <button className={props.filter ==="All" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button } onClick={onAllClickHandler}>All</button>
                <button className={props.filter ==="Active" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button } onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter ==="Done" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button } onClick={onCompletedClickHandler}>Done</button>
            </div>
        </div>
    )
}