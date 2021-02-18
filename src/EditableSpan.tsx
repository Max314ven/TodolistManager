import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    onChange:(newValue:string)=>void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const inputOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.onChange(title)
            setEditMode(false)
        }
    }
    return (
        editMode ? <input value={title} onChange={onChangeTitleHandler} onKeyPress={inputOnKeyPressHandler} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}