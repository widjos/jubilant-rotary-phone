
function reflex_agent(location, state) {
    // El agente toma acción basada en la ubicación y el estado actual
    if (state === "DIRTY") return "CLEAN"; // Limpiar si está sucio
    else if (location === "A") return "RIGHT"; // Mover a la Sala B
    else if (location === "B") return "LEFT";  // Mover a la Sala A
}

function followDesiredStates(initialStates) {
    // Todas las configuraciones posibles (estados deseados)
    const desiredStates = [
        ['A', 'DIRTY', 'DIRTY'],
        ['B', 'DIRTY', 'DIRTY'],
        ['A', 'CLEAN', 'DIRTY'],
        ['B', 'CLEAN', 'DIRTY'],
        ['A', 'DIRTY', 'CLEAN'],
        ['B', 'DIRTY', 'CLEAN'],
        ['A', 'CLEAN', 'CLEAN'],
        ['B', 'CLEAN', 'CLEAN']
    ];

    // Conjunto para rastrear los estados visitados
    const visitedStates = new Set();
    
    // Estado inicial
    let currentState = [...initialStates];

    // Agregar el estado inicial al conjunto de visitados
    visitedStates.add(currentState.join(','));

    function stateTransition() {
        const location = currentState[0];
        const cleanlinessA = currentState[1];
        const cleanlinessB = currentState[2];

        // Log del estado actual
        console.log("Current State:", currentState);
        document.getElementById("log").innerHTML += "<br>Current State: " + currentState.join(', ');

        // Decidir la acción a tomar con base en el agente reactivo
        let action_result = reflex_agent(location, cleanlinessA === "DIRTY" ? cleanlinessA : cleanlinessB);

        // Ejecutar la acción
        if (action_result === "CLEAN") {
            if (location === "A") {
                currentState[1] = "CLEAN"; // Limpiar Sala A
            } else if (location === "B") {
                currentState[2] = "CLEAN"; // Limpiar Sala B
            }
        } else if (action_result === "RIGHT") {
            currentState[0] = "B"; // Mover a Sala B
        } else if (action_result === "LEFT") {
            currentState[0] = "A"; // Mover a Sala A
        }

        // Después de realizar una acción, comprobar si debemos recorrer al siguiente estado deseado
        for (let state of desiredStates) {
            // Comprobar si el estado actual coincide con este estado deseado
            if (state[0] === currentState[0] && state[1] === currentState[1] && state[2] === currentState[2]) {
                // Si coincide, verificar los estados no visitados
                break; // Ya hemos alcanzado un estado deseado
            }
        }

        // Recorramos los estados deseados para encontrar el siguiente no visitado
        for (let state of desiredStates) {
            // Crear un string para nuestro estado
            const stateKey = state.join(',');
            // Si el estado no ha sido visitado, lo visitamos
            if (!visitedStates.has(stateKey)) {
                // Actualizar al siguiente estado deseado
                currentState = [...state];
                visitedStates.add(stateKey); // Marcar como visitado
                break; // Salir del bucle una vez que encontramos un estado no visitado
            }
        }

        // Continuar el siguiente estado después de una demora
        if (visitedStates.size < desiredStates.length) {
            setTimeout(stateTransition, 2000); // Establecer un retraso de 2 segundos antes de la siguiente transición
        } else {
            console.log("Todos los estados han sido visitados.");
        }
    }

    stateTransition(); // Iniciar el proceso de transición de estados
}

// Inicializar con el estado proporcionado
var states = ["A", "DIRTY", "DIRTY"]; // Cambia esto a cualquier estado inicial que desees
followDesiredStates(states);


