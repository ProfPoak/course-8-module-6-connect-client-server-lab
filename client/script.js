fetch("http://localhost:5555/events")
    .then(response => {
        if (!response.ok) throw new Error("Failed to load events");
        return response.json();
    })
    .then(events => events.forEach(renderEvent))
    .catch(error => console.error(error));

    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        const title = document.querySelector("#title").value
        document.querySelector("#error-message").textContent = ""

        fetch("http://localhost:5555/events", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title})
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to add event");
            return response.json();
        })
        .then(renderEvent)
        .catch(error => {
            document.querySelector("#error-message").textContent = error.message;
        })
    });

    function renderEvent(event) {
        const li = document.createElement("li");
        li.textContent = event.title;
        document.querySelector("#event-list").appendChild(li);
    }