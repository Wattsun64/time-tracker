(function() {
    onload = get_data()

    var btn = document.getElementById("post"),
        table = document.querySelector("table");

    btn.addEventListener("click", () => {
        var date = document.getElementById("date"),
            hours = document.getElementById("hours"),
            task = document.getElementById("task"),
            obj = {
                date: date.value,
                hours: hours.value,
                task: task.value
            }

        post_data(obj)

        date.value = ""
        hours.value = ""
        task.value = ""

    })

    table.addEventListener("click", (e) => {
        if (e.target.className === "delete") {
            console.log(e.target.parentNode.parentNode.id)
            delete_data(e.target.parentNode.parentNode.id)
        }
    })


    function post_data(data) {
        var http = new XMLHttpRequest(),
            url = "http://localhost:3000/data",
            data = JSON.stringify(data);

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 201) {
                var item = JSON.parse(http.responseText)
                console.log(item)
                append_data(item)
            }
        }

        http.open("POST", url)
        http.setRequestHeader("Content-Type", "application/json", true)
        http.send(data)

    }

    function get_data() {
        var http = new XMLHttpRequest(),
            url = "http://localhost:3000/data"

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                var data = JSON.parse(http.responseText)

                console.log(data)

                data.forEach(append_data)
            }
        }

        http.open("GET", url)
        http.send()
    }

    function append_data(data) {
        var html = `
            <td>${data.date}</td>
            <td>${data.hours}</td>
            <td>${data.task} <button class="delete">Delete</button></td>
        `,
            tr = document.createElement("tr"),
            tbody = document.querySelector("tbody");

        tr.innerHTML = html;
        tr.id = `${data.id}`
        tr.className = "task-data"

        tbody.appendChild(tr)


    }

    function delete_data(data) {
        var http = new XMLHttpRequest(),
            url = `http://localhost:3000/data/${data}`,
            el = document.getElementById(`${data}`);

        console.log(url)

        http.open("DELETE", url , true)
        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                console.log(http.responseText)
            }
        }
        http.send(null)

        el.parentNode.removeChild(el)
    }


}())
