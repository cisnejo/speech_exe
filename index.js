const button = document.getElementById("click");
button.addEventListener("click", GetJSON);

const text = document.getElementById("text");

async function GetJSON() {
  /*   const response = await fetch("http://127.0.0.1:5000/commands");
   const data = await response.json();
console.log(data);
*/

  const response = await fetch("http://127.0.0.1:5000/");
  const data = await response.json();
  console.log(data);
}

async function GetList() {
  const command_table = document.getElementById("command_table");

  const response = await fetch("http://127.0.0.1:5000/records");
  const data = await response.json();
  const parsed_data = JSON.parse(data);
  const col_headers = ["command", "path"];
  table_row = TableRows(parsed_data, col_headers);
}

window.addEventListener("load", GetList);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => PostData(e));

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const TableRows = (parsed_data, col_headers) => {
  return parsed_data.map((command_data) => {
    tr = document.createElement("tr");
    for (const index in col_headers) {
      const key = col_headers[index];
      const td = document.createElement("td");
      td.textContent = command_data[key];
      tr.appendChild(td);
    }
    command_table.appendChild(tr);
  });
};

const PostData = async (e) => {
  e.preventDefault();
  path = form.querySelector("input[name='path']").value;
  command_name = form.querySelector("input[name='command_name']").value;
  const response = await postData("http://127.0.0.1:5000/handle_data", {
    command_name,
    path,
  });
  console.log(response);
};
