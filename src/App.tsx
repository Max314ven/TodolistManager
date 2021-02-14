import React, {useState} from 'react';
import s from "./App.module.css";
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterValueType = "All" | "Active" | "Done"

type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type TasksArrType = {
    id: string,
    title: string,
    isDone: boolean
}[]

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()


    let [todoListArr, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "Active"},
        {id: todoListID2, title: "What to bye", filter: "Done"},
    ])

    function deleteTodoList (todoListID:string){
        let filteredTodoList = todoListArr.filter(tl=>tl.id !==todoListID )
        setTodoLists(filteredTodoList)
        delete tasksArr[todoListID]
        setTasksArr({...tasksArr})
    }

    let [tasksArr, setTasksArr] = useState({
            [todoListID1]: [
                {id: v1(), title: "Learn JS", isDone: true},
                {id: v1(), title: "Learn React", isDone: true},

            ],
            [todoListID2]: [
                {id: v1(), title: "Code practice", isDone: false},
                {id: v1(), title: "Learn English", isDone: false}
            ]
        }
    )


    function changeActiveFilter(value: filterValueType, todoListID: string) {
        let todoList = todoListArr.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoListArr])
        }

    }

    function removeTask(taskID: string, todoListID: string) {
        setTasksArr({...tasksArr, [todoListID]: tasksArr[todoListID].filter(t => t.id !== taskID)})
    }

    function addTask(title: string, todoListID:string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let tasks = tasksArr[todoListID]
        tasksArr[todoListID]=[newTask, ...tasks]
        setTasksArr({...tasksArr})
    }

    function changeStatus(id: string, isDone: boolean, todoListID:string) {
        let tasks = tasksArr[todoListID]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksArr({...tasksArr})
        }

    }

    return (
        <div className={s.app_container}>
            {todoListArr.map(tl => {

                let tasksForTodoList = tasksArr[tl.id]

                if (tl.filter === "Active") {
                    tasksForTodoList = tasksArr[tl.id].filter(task => !task.isDone)
                }
                if (tl.filter === "Done") {
                    tasksForTodoList = tasksArr[tl.id].filter(task => task.isDone)
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasksArr={tasksForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeActiveFilter={changeActiveFilter}
                        changeCheckboxStatus={changeStatus}
                        filter={tl.filter}
                        deleteTodoList={deleteTodoList}

                    />
                )

            })}

        </div>

    )
}

export default App
