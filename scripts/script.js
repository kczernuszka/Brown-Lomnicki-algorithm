function inputsAreSet() {
  form = document.forms["form"];
  return form.strategies_a.value != "" && form.strategies_b.value != "";
}
