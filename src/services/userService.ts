export interface User {
  id?: number;
  username: string;
}

const users: User[] = [
  {
    id: 1,
    username: "enigma101",
  },
  {
    id: 2,
    username: "newton101",
  },
];

/**
 * Returns all the users
 */
export const getUsers = (): User[] => users;

/**
 * The function accepts a number
 * and returns the matching user or undefined
 * @param id id 
 */
export const getUser = (id: number): (User | undefined) => {
  const user = users.find((u) => u.id === id);
  return user;
};

/**
 * This function accepts an user 
 * and returns an updated the users
 * @param user instance of User
 */
export const addUser = (user: User): User[] => {
  const userList = getUsers();
  const id = users.length + 1;
  const newUser = {
    ...user,
    id,
  };
  userList.push(newUser);
  return users;
};

/**
 * This function accepts an user
 * if matching id is found in users, it will update users and returns the updated users
 * else return 0
 * @param user instance of User
 */
export const updateUser = (user: User): (User[] | number) => {
  const { id: userIdToUpdate } = user;
  const existing = users.find((user) => user.id === userIdToUpdate);
  if (!existing) return 0;
  Object.assign(existing, user);
  return users;
};

/**
 * This functions accepts an id 
 * if matching id is found in users, it will remove the user and returns the updated users
 * else return 0
 * @param id id  
 */
export const deleteUser = (id: number): (User[] | number) => {
  const index = users.findIndex((user) => user.id === id);
  if (index <= -1) return 0;
  users.splice(index, 1);
  return users;
};
