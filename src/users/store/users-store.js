import { loadUsers } from "../usecases/load-users";

const state = {
  currentPage: 0,
  users: [],
}

const loadNextPage = async () => {
  const users = await loadUsers(state.currentPage + 1);
  if(users.length === 0) {
    return;
  }
  state.currentPage+=1;
  state.users = users;
}

const loadPrevPage = async () => {
  throw new Error('Not implemented');
}

const onUserChanged = () => {
  throw new Error('Not implemented');
}

const reloadPage = async () => {
  throw new Error('Not implemented');
}

export default {
  loadNextPage,
  loadPrevPage,
  onUserChanged,
  reloadPage, 
  getUser: () => [...state.users],
  getCurrentPage: () => state.currentPage,
}