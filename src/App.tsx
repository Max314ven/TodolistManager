import React, {useState} from 'react';
import s from "./App.module.css";
import {TodoList} from "./TodoList";
import {v1} from "uuid";

type TodoListType = {
    title: string
}

export type TasksArrType = {
    id: string,
    title: string,
    isDone: boolean
}[]
function App() {

    let todoList: TodoListType = {
        title: "First Todo",
    }

    let [tasksArr, setTasksArr] = useState(
        [{
            id: v1(),
            title: "Learn JS",
            isDone: true
        },
            {
                id: v1(),
                title: "Learn React",
                isDone: true
            },
            {
                id: v1(),
                title: "Code practice",
                isDone: false
            },
            {
                id: v1(),
                title: "Learn English",
                isDone: false
            }
        ]
    )
    let[activeFilter, setActiveFilter]=useState<"All"|"Active"|"Done">("All")

    let tasksForTodoList = tasksArr

    if(activeFilter === "Active"){
        tasksForTodoList = tasksForTodoList.filter(task=>!task.isDone)
    }
    if(activeFilter === "Done"){
        tasksForTodoList = tasksForTodoList.filter(task=>task.isDone)
    }

    function changeActiveFilter (value:"All"|"Active"|"Done"){
        setActiveFilter(value)
    }

    function removeTask (taskID:string){
        let filteredTask= tasksArr.filter(t=> t.id !==taskID)
        setTasksArr(filteredTask)
    }

    function addTask (title:string){
        let newTask = {id:v1(), title: title, isDone:true}
        let newTasksArr = [newTask, ...tasksArr]
        setTasksArr(newTasksArr)
    }

    return (
        <div className={s.app_container}>
            <TodoList title={todoList.title}
                      tasksArr={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeActiveFilter={changeActiveFilter}

            />
        </div>

    )
}

export default App;
