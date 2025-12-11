import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem.jsx";

const API = "https://playground.4geeks.com/todo";
const USERNAME = "fabri03";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");


    const createUser = () => {
        return fetch(`${API}/users/${USERNAME}`, { method: "POST" });
    };


    const loadTasks = () => {
        return fetch(`${API}/users/${USERNAME}`)
            .then((resp) => resp.json())
            .then((data) => {

                const serverTodos = Array.isArray(data.todos) ? data.todos : [];


                const formatted = serverTodos.map((t) => ({
                    id: t.id,
                    text: t.label
                }));

                setTasks(formatted);
            });
    };


    useEffect(() => {
        createUser()
            .then(() => loadTasks())
            .catch((err) => console.log(err));
    }, []);


    const handleAddTask = () => {
        const text = inputValue.trim();
        if (text === "") return;

        const taskForServer = { label: text, is_done: false };

        fetch(`${API}/todos/${USERNAME}`, {
            method: "POST",
            body: JSON.stringify(taskForServer),
            headers: { "Content-Type": "application/json" }
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("POST falló: " + resp.status);
                return resp.json();
            })
            .then(() => loadTasks())
            .then(() => setInputValue(""))
            .catch((err) => console.log(err));
    };


    const handleDeleteTask = (idToDelete) => {
        fetch(`${API}/todos/${idToDelete}`, { method: "DELETE" })
            .then((resp) => {
                if (!resp.ok) throw new Error("DELETE falló: " + resp.status);
            })
            .then(() => loadTasks())
            .catch((err) => console.log(err));
    };


    const handleClearAll = () => {
        fetch(`${API}/users/${USERNAME}`, { method: "DELETE" })
            .then(() => createUser())
            .then(() => loadTasks())
            .catch((err) => console.log(err));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleAddTask();
    };

    const itemsLeft = tasks.length;

    return (
        <div className="todo-page">
            <h1 className="todo-title">To do list</h1>

            <div className="todo-card">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="¿Qué tenemos que hacer?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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
                    <span>{itemsLeft === 1 ? "1 item left" : `${itemsLeft} items left`}</span>

                    <button onClick={handleClearAll}>
                        Limpiar todo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;