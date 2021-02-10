import React from "react";
import s from "./Todolist.module.css"

export function TodoList() {
    return (
        <div className={s.todolist_container}>
            <div className={s.todolist_container__header}>
                <div className={s.todolist_container__header_title}>
                    <h3>First Todolist</h3>
                </div>
                <div className={s.todolist_container__header_input}>
                    <input type="text" placeholder="Type new task here..."/>
                    <button>+</button>
                </div>
            </div>
            <div className={s.todolist_container__list}>
                <ul>
                    <li>
                        <input type="checkbox"/>
                        <span>TaskName</span>
                        <button>🗙</button>
                    </li>
                    <li>
                        <input type="checkbox"/>
                        <span>TaskName</span>
                        <button>🗙</button>
                    </li>
                    <li>
                        <input type="checkbox"/>
                        <span>TaskName TaskName TaskName TaskName TaskName TaskName TaskName TaskName TaskName TaskName TaskName TaskName  </span>
                        <button>🗙</button>
                    </li>
                </ul>

            </div>
        </div>
    )
}