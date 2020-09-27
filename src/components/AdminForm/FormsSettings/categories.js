export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название категории',
      required: true,
      counter: 200,
      tooltip: 'Название категории для отображения'
    },
    {
      id: 'url',
      type: 'input-field',
      label: 'Ссылка',
      placeholder: 'Укажите ссылку',
      required: true,
      counter: 200,
      tooltip: 'URL для навигации внутри сайта. Допустимы английские буквы, цифры и дефисы',
      rules: [
        value => {
          const pattern = /^[a-z0-9-]+$/
          return pattern.test(value) || 'Неверная ссылка'
        }
      ]
    },
    {
      id: 'description',
      type: 'text-field',
      label: 'Описание',
      placeholder: 'Описание категории',
      required: false,
      counter: 3000,
      tooltip: 'Описание категории для отображения'
    },
    {
      id: 'parentId',
      type: 'select-field',
      label: 'Родительская категория',
      placeholder: 'Выберите категорию',
      required: false,
      itemsURL: '/categories/',
      tooltip: 'Категории в которую будет входить данная категория'
    }
  ],
  creationTitle: 'Создание новой категории',
  editTitle: 'Редактирование категории',
  deleteDialogText: 'Вы действительно хотите удалить данную категорию?'
}
