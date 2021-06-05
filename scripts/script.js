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
  const rows = parseInt(urlParams.get('strategies_a'));
  const columns = parseInt(urlParams.get('strategies_b'));
  return { rows, columns }
}

function showResult() {
  const params = getUrlParams();
  iterates = document.forms["form"].iterates.value;
  let matrix = getTableValues();
  if (matrix.length !== 0) {
    result = getResult(matrix, iterates, params);
    printResultOnPage(result);
  }
  else {
    printError();
  }
}

function getResult(matrix_a, iterates, dimensions) {
  let strategies_a = new Array(dimensions.rows).fill(0);
  let strategies_b = new Array(dimensions.columns).fill(0);

  let matrix_b = create_matrix_for_player_b(matrix_a, dimensions);
  let index_a = find_first_strategy(matrix_a, dimensions);
  strategies_a[index_a]++;
  let player_a = matrix_a[index_a];
  let index_b = find_min(player_a);
  strategies_b[index_b]++;
  let player_b = matrix_b[index_b];

  for (let i = 1; i < iterates; i++) {
    index_a = find_max(player_b);
    strategies_a[index_a]++;
    player_a = player_a.map((num, idx) => num + matrix_a[index_a][idx]);

    index_b = find_min(player_a);
    strategies_b[index_b]++;
    player_b = player_b.map((num, idx) => num + matrix_b[index_b][idx]);
  }

  index_min_a = find_min(player_a);
  index_max_a = find_max(player_a);
  index_min_b = find_min(player_b);
  index_max_b = find_max(player_b);
  min_a = player_a[index_min_a] / iterates;
  max_a = player_a[index_max_a] / iterates;
  min_b = player_b[index_min_b] / iterates;
  max_b = player_b[index_max_b] / iterates;

  return { strategies_a, strategies_b, min_a, max_a, min_b, max_b };
}

function create_matrix_for_player_b(matrix, dimensions) {
  let new_matrix = [];

  for (let j = 0; j < dimensions.columns; j++) {
    let list_cells = [];
    for (let i = 0; i < dimensions.rows; i++) {
      cell = matrix[i][j];
      list_cells.push(cell);
    }
    new_matrix.push(list_cells);
  }
  return new_matrix;
}

function find_first_strategy(matrix, dimensions) {
  let strategies_sum = [];
  for (let i = 0; i < dimensions.rows; i++) {
    let sum = 0;
    for (let j = 0; j < dimensions.columns; j++) {
      sum += matrix[i][j];
    }
    strategies_sum.push(sum);
  }
  let index = strategies_sum.indexOf(Math.max(...strategies_sum));
  return index;
}

function find_min(player) {
  return player.indexOf(Math.min(...player));
}

function find_max(player) {
  return player.indexOf(Math.max(...player));
}

function printResultOnPage(result) {
  document.getElementById("error").innerHTML = "";
  let div = document.getElementById('result');
  div.innerHTML = '';
  div.innerHTML += 'Gracz A: <br />'
  result.strategies_a.forEach((element, index) =>
      div.innerHTML += ` p${index + 1}=${element / form.iterates.value} `);
  div.innerHTML += '<br />';
  div.innerHTML += `Dolna wartość gry: ${result.min_a}<br />
      Górna wartość gry: ${result.max_a}<br /><br />`;
  div.innerHTML += 'Gracz B: <br />'
  result.strategies_b.forEach((element, index) =>
     div.innerHTML += ` q${index + 1}=${element / form.iterates.value} `);
  div.innerHTML += '<br />';
  div.innerHTML += `Dolna wartość gry: ${result.min_b}<br />
      Górna wartość gry: ${result.max_b}<br />`;
}

function printError() {
  document.getElementById("error").innerHTML =
    "<p style=\"color:red\">Incorrect values in the table!</p>";
}

module.exports = getResult;
