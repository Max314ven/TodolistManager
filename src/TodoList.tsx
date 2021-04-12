import React, {ChangeEvent} from "react";
import s from "./Todolist.module.css"
import {filterValueType, TasksArrType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {CheckBox, DeleteForever} from "@material-ui/icons";

type TodoListType = {
    id: string
    title: string
    tasksArr: TasksArrType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeActiveFilter: (value: filterValueType, todoListID: string) => void
    changeCheckboxStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    changeTodolistTitle: (newValue: string, TodolistID: string) => void
    filter: filterValueType
    deleteTodoList: (todoListID: string) => void
}

export function TodoList(props: TodoListType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    function changeTodolistTitle(newValue: string) {
        props.changeTodolistTitle(newValue, props.id)
    }


    const onAllClickHandler = () => {
        props.changeActiveFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeActiveFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeActiveFilter("done", props.id)
    }

    return (
        <div className={s.todolist_container}>
            <div className={s.todolist_container__header}>
                <div className={s.todolist_container__header_title}>
                    <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
                    <IconButton onClick={() => {
                        props.deleteTodoList(props.id)
                    }}>
                        <DeleteForever/>
                    </IconButton>
                </div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    {
                        props.tasksArr.map(task => {
                            const removeTask = () => props.removeTask(task.id, props.id)
                            const onChangeTaskTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(task.id, newValue, props.id)
                            }
                            const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeCheckboxStatus(task.id, newIsDoneValue, props.id)
                            }
                            return (
                                <li key={task.id}>
                                    <CheckBox>
                                        checked={task.isDone}
                                        onChange={onChangeStatusHandler}
                                    </CheckBox>
                                    <EditableSpan
                                        title={task.title}
                                        onChange={onChangeTaskTitleHandler}
                                    />
                                    <IconButton
                                        onClick={removeTask}>
                                        <DeleteForever/>
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={s.todolist_container__filters}>
                <Button
                    variant={"outlined"} color={props.filter === "all" ? "secondary" : "default"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={"outlined"} color={props.filter === "active" ? "secondary" : "default"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={"outlined"} color={props.filter === "done" ? "secondary" : "default"}
                    onClick={onCompletedClickHandler}>Done
                </Button>
            </div>
        </div>
    )
}
