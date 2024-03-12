import React, { useState, useEffect } from "react";


const Home = () => {

	const [nuevaTarea, setNuevaTarea] = useState();
	const [todos, setTodos] = useState([]);

	const deleteTodo = (index) => {
		const listaNueva = todos.filter((todo, i) => i !== index)
		setTodos(listaNueva);
	}

	const handleChange = (event) => {
		setNuevaTarea(event.target.value);
	}

	//Funciones con Fetch:
	const newUserTodolist = () => {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/EmmanuelLM87', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			if (resp.ok) {
				return resp.json()
			}
			else {console.error("error al crear el usuario", resp.status)}
		  })
		  .then(resp => {
			getTasks()
		  })
		  .catch(error => {
			console.log(error)
		  })
	}

	const getTasks = () => {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/EmmanuelLM87')

		  .then(resp => {
			if (resp.ok) {
				return resp.json()
			}
			else {
				if (resp.status ===404) {
					newUserTodolist()
				}
			}
		  })
		  .then(resp => {
			console.log(resp)
			setTodos(resp)
		  })
		  .catch(error => {
			console.log(error)
		  })
	};

	const addTask = (value) => {
		const newTask = {
			done: false,
			label: value,
		}
		const newTodoList = [...todos, newTask] 
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/EmmanuelLM87', {
			method: "PUT",
			body: JSON.stringify(newTodoList),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			if (resp.ok) {
				return resp.json()
			}
			else {console.error("error al crear el usuario", resp.status)}
		  })
		  .then(resp => {
			getTasks()
		  })
		  .catch(error => {
			console.log(error)
		  })
	};

	const deleteTask = (id) => {

		const updateList = todos.filter((task) => task.id !== id)

		setTodos(updateList)

		if(updateList.length === 0) {
			const defaultTask = {
				id: 1,
				label: "default task",
				done: false
			}
			updateList.push(defaultTask)
		}

		fetch ('https://playground.4geeks.com/apis/fake/todos/user/EmmanuelLM87', {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify(updateList)
		  })
		  .then(resp => {
			if (resp.ok) {
				return resp.json()
			}
			else {console.error("error al eliminar la tarea")}
		  })

		  .catch(error => {
			console.log(error)
		  })
	};

	const handleClick = (tarea) => {
		addTask(tarea)
	}

	//useEffect

	useEffect(() => {
		getTasks()
	}, [])

	//FETCH

	// fetch('https://playground.4geeks.com/apis/fake/todos/user/EmmanuelLM87', {
    //   method: "PUT",
    //   body: JSON.stringify(todos),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then(resp => {
    //     console.log(resp.ok); // Será true si la respuesta es exitosa
    //     console.log(resp.status); // El código de estado 200, 300, 400, etc.
    //     console.log(resp.text()); // Intentará devolver el resultado exacto como string
    //     return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    // })
    // .then(data => {
    //     // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
    //     console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    // })
    // .catch(error => {
    //     // Manejo de errores
    //     console.log(error);
    // });

	return (
		<div className="container-todolist">
			<h1>Lista de tareas</h1>
			<div>
				<input
					type="text"
					placeholder="Escribe tu nueva tarea"
					value={nuevaTarea}
					onChange={handleChange}
				/>
				<button onClick={() => {
					handleClick(nuevaTarea)
				}}>
					Agregar tarea
				</button>
			</div>
			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={index}>
							{todo.label}
							<button onClick={() => deleteTask(todo.id)}>
								Eliminar
							</button>
						</li>
					)
				})}
				<li></li>
			</ul>

		</div>
	);
};

export default Home;
