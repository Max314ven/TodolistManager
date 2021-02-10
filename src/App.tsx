import React, {useState} from 'react';
import s from "./App.module.css";
import {TodoList} from "./TodoList";

type TodoListType = {
    title: string
}

export type TasksArrType = {
    id: number,
    title: string,
    isDone: boolean
}[]
function App() {

    let todoList: TodoListType = {
        title: "First Todo",
    }

    let [tasksArr, setTasksArr] = useState(
        [{
            id: 1,
            title: "Learn JS",
            isDone: true
        },
            {
                id: 2,
                title: "Learn React",
                isDone: true
            },
            {
                id: 3,
                title: "Code practice",
                isDone: false
            },
            {
                id: 4,
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

    function removeTask (taskID:number){
        let filteredTask= tasksArr.filter(t=> t.id !==taskID)
        setTasksArr(filteredTask)
    }


    return (
        <div className={s.app_container}>
            <TodoList title={todoList.title}
                      tasksArr={tasksForTodoList}
                      removeTask={removeTask}
                      changeActiveFilter={changeActiveFilter}
            />
        </div>

    )
}

export default App;
