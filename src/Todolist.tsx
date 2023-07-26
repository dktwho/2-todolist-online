import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AdditemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void
    updateTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todoListId, newTitle)
    }

    const updateTaskHandler = (newTitle: string, tId: string) => {
        props.updateTask(props.todoListId, tId, newTitle)
    }

    return <div>

        <h3>
            <EditableSpan oldTitle={props.title} callback={updateTodolistHandler}/>
            <Button variant="outlined"  startIcon={<DeleteIcon />}  onClick={() => props.removeTodoList(props.todoListId)}></Button>
             {/*<button onClick={() => props.removeTodoList(props.todoListId)}>x</button>*/}
        </h3>
        <AddItemForm callback={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked);
                    }

                    // const updateTaskHandler = (newTitle:string)=>{
                    //     props.updateTask(props.todoListId,t.id,newTitle)
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} callback={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
                        <button onClick={onClickHandler}>x</button>

                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
