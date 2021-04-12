import {filterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionTypes = RemoveTodolistType|AddTodolistType|ChangeTodoListType|ChangeTodolistFilter


export type RemoveTodolistType = {
    type:'REMOVE-TODOLIST',
    id:string
}

export type AddTodolistType={
    type:'ADD-TODOLIST',
    title:string
}

export type  ChangeTodoListType={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}

export type ChangeTodolistFilter ={
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: filterValueType
}
export const todolistsReducer = (state: Array<TodoListType>, action: ActionTypes) :Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl=>tl.id !=action.id)
        }
        case 'ADD-TODOLIST':{
            return [...state,{id:v1(), title:action.title, filter:"all"}]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            let todolist= state.find(tl=> tl.id===action.id)
                if(todolist){
                    todolist.title=action.title
                }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let todolist=state.find(tl=>tl.id===action.id)
            if(todolist){
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistID:string): RemoveTodolistType =>{
    return {type: "REMOVE-TODOLIST", id:todolistID}
}

export const AddTodolistAC=(newTodolistTitle:string):AddTodolistType =>{
    return {type:'ADD-TODOLIST', title:newTodolistTitle}
}

export const ChangeTodoListAC=(newTitle:string,todolistID:string):ChangeTodoListType=>{
    return {type:'CHANGE-TODOLIST-TITLE', id:todolistID, title:newTitle}
}

export const ChangeTodolistFilterAC=(newFilter:filterValueType,todolistID:string):ChangeTodolistFilter=>{
    return {type:'CHANGE-TODOLIST-FILTER', id:todolistID, filter:newFilter}
}