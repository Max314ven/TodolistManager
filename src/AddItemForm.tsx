import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./AddItemForm.module.css";

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
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
        <div className={s.todolist_container__header_input}>
            <input type="text"
                   placeholder="Type new task here..."
                   value={title}
                   onChange={inputOnChangeHandler}
                   onKeyPress={inputOnKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>

    )

}