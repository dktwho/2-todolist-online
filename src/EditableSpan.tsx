import React, {useState} from 'react';

type PropsType = {
    oldTitle: string
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(true)
    }
    const editHandler2 = () => {
        setEdit(false)
    }


    return (
        edit ? <input value={props.oldTitle} onBlur={editHandler2} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

