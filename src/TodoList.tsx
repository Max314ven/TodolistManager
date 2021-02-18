import React, {ChangeEvent} from "react";
import s from "./Todolist.module.css"
import {filterValueType, TasksArrType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListType = {
    id: string
    title: string
    tasksArr: TasksArrType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeActiveFilter: (value: filterValueType, todoListID: string) => void
    changeCheckboxStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle:(id: string, newValue: string, todoListID: string) => void
    filter: filterValueType
    deleteTodoList: (todoListID: string) => void
}

export function TodoList(props: TodoListType) {
    const addTask = (title:string) => {
        props.addTask (title, props.id)
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

    return (
        <div className={s.todolist_container}>
            <div className={s.todolist_container__header}>
                <div className={s.todolist_container__header_title}>
                    <h3>{props.title}</h3>
                    <button className={s.todolist_container__header_title_btn} onClick={() => {
                        props.deleteTodoList(props.id)
                    }}>🗙
                    </button>
                </div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    {
                        props.tasksArr.map(task => {
                            const removeTask = () => props.removeTask(task.id, props.id)
                            const onChangeTaskTitleHandler = (newValue:string) => {
                                props.changeTaskTitle(task.id, newValue, props.id)
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeCheckboxStatus(task.id, newIsDoneValue, props.id)
                            }
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                                    <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler} />
                                    <button onClick={removeTask}>🗙</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={s.todolist_container__filters}>
                <button
                    className={props.filter === "All" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "Active" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "Done" ? s.todolist_container__filters_active_button : s.todolist_container__filters_button}
                    onClick={onCompletedClickHandler}>Done
                </button>
            </div>
        </div>
    )
}
