import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

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
        <div>
            <TextField
                type="text"
                variant={"outlined"}
                label={"Add new task"}
                value={title}
                onChange={inputOnChangeHandler}
                onKeyPress={inputOnKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={addTask}>
               <Add/>
                </IconButton>
        </div>

    )

}