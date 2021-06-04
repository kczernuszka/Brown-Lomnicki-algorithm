function inputsAreSet() {
  form = document.forms["form"];
  return form.strategies_a.value != "" && form.strategies_b.value != "";
}

function createTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const rows = urlParams.get('strategies_a');
  const columns = urlParams.get('strategies_b');
  table = document.createElement('table');
  table.style.width = '100px';
  table.style.border = '1px solid black';

  for (let i = 0; i < rows; i++) {
    let tr = table.insertRow();
    for (let j = 0; j < columns; j++) {
      let td = tr.insertCell();
      let input = document.createElement('input');
      input.setAttribute("id", `input${i}_${j}`);
      input.setAttribute("size", "3");
      td.appendChild(input);
      td.style.border = '1px solid black';
    }
  }
  document.getElementById("table").appendChild(table);
}
