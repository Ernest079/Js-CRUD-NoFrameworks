import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import {deleteUserById} from '../../usecases/delete-user-by-id';
import './render-table.css';

let table;

const createTable = () => {
  const table = document.createElement('table');
  const tableHeaders = document.createElement('thead');
  tableHeaders.innerHTML = `
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>  
  `;
  const tableBody = document.createElement('tbody');
  table.appendChild(tableHeaders);
  table.appendChild(tableBody);
  return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
  const element = event.target.closest('.select-user');
  if(!element){
    return;
  }
  const id = element.getAttribute('data-id');
  showModal(id);
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {
  const element = event.target.closest('.delete-user');

  if(!element){
    return;
  }

  const id = element.getAttribute('data-id');
  try {

    await deleteUserById(id);
    await usersStore.reloadPage();
    document.querySelector('#currentPage').innerText = usersStore.getCurrentPage();
    RenderTable();

  } catch (error) {

    console.log(error);
    alert('No se pudo eliminar');

  }

}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderTable = (element) => {
  const users = usersStore.getUser();
  if(!table){
    table = createTable();
    element.append(table);

    table.addEventListener('click',tableSelectListener);
    table.addEventListener('click',tableDeleteListener);
  }
  let tableHTML = '';
  users.forEach( user =>{
    tableHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.balance}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.isActive}</td>
        <td>
          <a href = "#/" class = "select-user" data-id = "${user.id}">Select</a>
          |
          <a href = "#/" class = "delete-user" data-id = "${user.id}">Delete</a>
        </td>
      </tr>  
    `;
  });
  const tbody = table.querySelector('tbody');
  if (tbody) {
    tbody.innerHTML = tableHTML;
  } 
}