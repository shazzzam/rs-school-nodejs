const userData = [
  {
    id: 'd038e09a-e01f-4697-860b-c9d3cf100db8',
    name: 'John Doe',
    login: 'admin',
    password: 'admin'
  },
  {
    id: 'faec7968-8d46-411a-9573-7ae087a118cc',
    name: 'Test User',
    login: 'test',
    password: 'swordpass'
  }
];

const boardData = [
  {
    id: '54f5b1f8-7c51-45da-813e-29f0b9768ac5',
    title: 'First Board',
    columns: [
      {
        id: 'e2a9c24a-c8af-457b-b6e1-563f1138b829',
        title: 'ToDo',
        order: 1
      },
      {
        id: 'a12d7f61-ccbd-463c-b94f-669c63349c2f',
        title: 'In Progress',
        order: 2
      },
      {
        id: '31bbf1f9-9e8e-4d16-b360-b90d20a551e4',
        title: 'Done',
        order: 3
      }
    ]
  },
  {
    id: '82d270ff-e4e9-4af8-b645-2262151ba784',
    title: 'Second Board',
    columns: [
      {
        id: '0e682078-fbe2-4d17-814d-6b2e548c975d',
        title: 'DoTo',
        order: 1
      },
      {
        id: 'c8fa7829-3bbb-475f-8776-91bb6fcd911c',
        title: 'Progress In',
        order: 2
      },
      {
        id: '23fcca21-3544-4022-adf7-8243700081df',
        title: 'Undone',
        order: 3
      }
    ]
  }
];

const taskData = [
  {
    id: 'd72970ab-b7b0-48bd-9034-b7f081cd0ca3',
    title: 'learn nodejs',
    description: 'learn nodejs by doing rest api server',
    userId: 'd038e09a-e01f-4697-860b-c9d3cf100db8',
    boardId: '54f5b1f8-7c51-45da-813e-29f0b9768ac5',
    columnId: 'a12d7f61-ccbd-463c-b94f-669c63349c2f'
  },
  {
    id: 'd72970ab-b7b0-48bd-9034-b7f081cd0ca3',
    title: 'make ceasar chiper',
    description: 'make cli tool for encoding and decoding ceasar chiper',
    userId: 'd038e09a-e01f-4697-860b-c9d3cf100db8',
    boardId: '54f5b1f8-7c51-45da-813e-29f0b9768ac5',
    columnId: '31bbf1f9-9e8e-4d16-b360-b90d20a551e4'
  },
  {
    id: '',
    title: 'Common task',
    description: 'common description',
    userId: 'faec7968-8d46-411a-9573-7ae087a118cc',
    boardId: '82d270ff-e4e9-4af8-b645-2262151ba784',
    columnId: 'c8fa7829-3bbb-475f-8776-91bb6fcd911c'
  }
];

module.exports = {
  userData,
  boardData,
  taskData
};
