import React from 'react';
import s from "./App.module.css";
import {TodoList} from "./TodoList";

function App() {
    return (
        <div className={s.app_container}>
            <TodoList/>
        </div>

    )
}

export default App;
