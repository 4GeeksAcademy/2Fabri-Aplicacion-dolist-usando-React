import React from "react";

const TodoItem = ({ id, text, onDelete }) => {
    return (
        <li className="todo-item">
            <span className="todo-text">{text}</span>


            <button
                className="todo-delete"
                onClick={() => onDelete(id)}
                aria-label="Eliminar tarea"
            >
                ✕
            </button>
        </li>
    );
};

export default TodoItem;