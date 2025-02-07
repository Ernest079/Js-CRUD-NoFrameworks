import usersStore from "../../store/users-store";
import { RenderTable } from "../render-table/render-table";
import './render-buttons.css';


export const renderButtons = (element) => {
  const nextButton = document.createElement('button');
  nextButton.innerText = ' Next ->';

  const prevButton = document.createElement('button');
  prevButton.innerText = '<- Prev ';

  const currentPage = document.createElement('span');
  currentPage.id = 'currentPage';
  currentPage.innerText = usersStore.getCurrentPage();

  element.append(prevButton, currentPage, nextButton);

  nextButton.addEventListener('click', async () => {
    await usersStore.loadNextPage();
    currentPage.innerText = usersStore.getCurrentPage();
    RenderTable(element);  
  });

  prevButton.addEventListener('click', async () => {
    await usersStore.loadPrevPage();
    currentPage.innerText = usersStore.getCurrentPage();
    RenderTable(element);
  });
}