import React, { useState } from "react";
import TodoItem from "./TodoItem.jsx";



const TodoApp = () => {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("")

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    const handleAddTask = () => {
        const text = inputValue.trim();

        if (text === "") return;

        const newTask = {
            id: Date.now(),
            text: text,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);

        setInputValue("")
    };

    const handleDeleteTask = (idToDelete) => {
        setTasks((prevTasks) => prevTasks.filter(tasks => tasks.id !== idToDelete))
    };

    const itemsLeft = tasks.length

    return (
        <div className="todo-page">
            <h1 className="todo-title">To do list</h1>

            <div className="todo-card">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="¿Qué tenemos que hacer?"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ul className="todo-list">
                    {tasks.length === 0 ? (
                        <li className="todo-empty">No hay tareas, añadir tareas porfi😭🫠</li>
                    ) : (
                        tasks.map((task) => (
                            <TodoItem
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    )}
                </ul>

                <div className="todo-footer">
                    {itemsLeft === 1
                        ? "1 item left"
                        : `${itemsLeft} items left`}
                </div>

            </div>
        </div>
    );
};

export default TodoApp;
