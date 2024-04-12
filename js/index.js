const $divInputs = document.getElementById('div-inputs');
const $divTable = document.getElementById('div-table');
const $tableBody = document.getElementById('div-table-tbody');
const $inputName = document.getElementById('input-name');
const $inputNumber = document.getElementById('input-number');
const $inputSelect = document.getElementById('input-select');
const $inputAnotation = document.getElementById('input-anotaciones');
const $inputAdd = document.getElementById('button-add');
const $buttonDelete = document.getElementById('button-delete');

const valueName = $inputName.value;

window.addEventListener('load', () => {
  const tableData = localStorage.getItem('table');
  if (tableData) {
    $tableBody.innerHTML = tableData;
  }
  agregarBotonesEliminarTr();
  agregarTerminado();
});

$inputAdd.addEventListener('click', agregarLote);
$buttonDelete.addEventListener('click', limpiarTabla);

function agregarLote(e) {
  const id = new Date().getTime();
  e.preventDefault();
  const fila = `
            <tr class="${id}" >
              <td>${$inputName.value}</td>
              <td>${$inputNumber.value}</td>
              <td>${$inputSelect.value}</td>
              <td>${$inputAnotation.value}</td>
            <div class="div-checkbox">
              <td><button class="button-delete-th">Eliminar</button> </td>
            </div>
            </tr>
    `;
  $tableBody.innerHTML += fila;

  setLocalStorage();
  agregarBotonesEliminarTr();
  agregarTerminado();
}

function limpiarTabla(e) {
  e.preventDefault();
  $tableBody.innerHTML = '';
  setLocalStorage();
}

function agregarBotonesEliminarTr() {
  const $buttonDeleteTr = document.querySelectorAll('.button-delete-th');
  $buttonDeleteTr.forEach((elem) => {
    elem.addEventListener('click', () => {
      elem.parentNode.parentNode.remove(); // parentNode:Accede al elemento padre del botón, que en este caso es el td que contiene el botón "Eliminar , se repite la accion para acceder al tr".
      setLocalStorage();
    });
  });
}

function agregarTerminado() {
  const rows = document.querySelectorAll('.custom-table tbody tr');
  rows.forEach((row) => {
    row.addEventListener('click', () => {
      const isHighlighted = row.classList.contains('highlighted');

      if (isHighlighted) {
        row.classList.remove('highlighted');
      } else {
        row.classList.add('highlighted');
      }

      setLocalStorage();
    });
  });
}

function setLocalStorage() {
  localStorage.setItem('table', $tableBody.innerHTML);
}

//Bloque para permitir la descarga de un blog de notas
const $buttonDownloadText = document.getElementById('button-download-text');
$buttonDownloadText.addEventListener('click', descargarTablaTexto);

function descargarTablaTexto() {
  const $table = document.querySelector('.custom-table');
  const rows = $table.querySelectorAll('tr');
  let text = '';
  rows.forEach((row) => {
    const rowData = [];
    row.querySelectorAll('td').forEach((cell) => {
      rowData.push(cell.textContent.trim());
    });
    text += rowData.join('\t') + '\n';
  });
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tabla.txt';
  link.click();
}
