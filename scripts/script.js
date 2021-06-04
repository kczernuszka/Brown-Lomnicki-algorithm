function inputsAreSet() {
  form = document.forms["form"];
  return form.strategies_a.value != "" && form.strategies_b.value != "";
}

function createTable() {
  const params = getUrlParams();
  table = document.createElement('table');
  table.style.width = '100px';
  table.style.border = '1px solid black';

  for (let i = 0; i < params.rows; i++) {
    let tr = table.insertRow();
    for (let j = 0; j < params.columns; j++) {
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

function getTableValues() {
  params = getUrlParams();
  let matrix = [];
  for (let i = 0; i < params.rows; i++) {
    let columns_in_row = [];
    for (let j = 0; j < params.columns; j++) {
      cell = document.getElementById(`input${i}_${j}`).value;
      if (isNaN(cell) || cell === "") return [];
      columns_in_row.push(parseInt(cell));
    }
    matrix.push(columns_in_row);
  }
  return matrix;
}

function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const rows = urlParams.get('strategies_a');
  const columns = urlParams.get('strategies_b');
  return {rows, columns}
}

function showResult() {
  let matrix = getTableValues();
  if(matrix.length !== 0) {
    runAlgorithm();
  }
  else {
    printError();
  }
}

function runAlgorithm() {

}

function printError() {
  document.getElementById("error").innerHTML = 
      "<p style=\"color:red\">Incorrect values in the table!</p>";
}
