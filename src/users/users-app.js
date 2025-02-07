import { renderAddButton } from "./presentation/render-add-button/render-add-button ";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { RenderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {
  await usersStore.loadNextPage();
  RenderTable(element);
  renderButtons(element);
  renderAddButton(element);
}
