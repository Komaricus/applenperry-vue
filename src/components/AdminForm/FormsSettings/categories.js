export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название категории',
      required: true,
      counter: 200,
      tooltip: 'Название категории для отображения',
      slugSource: true
    },
    {
      id: 'url',
      type: 'slug-field',
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
      type: 'html-field',
      label: 'Описание',
      placeholder: 'Описание категории',
      required: false,
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
    },
    {
      id: 'icon',
      type: 'files-field',
      label: 'Иконка',
      placeholder: 'Загрузите файл',
      required: false,
      tooltip: 'Загрузите иконку категории для отображения в списке категорий',
      multiple: false
    }
  ],
  creationTitle: 'Создание новой категории',
  editTitle: 'Редактирование категории',
  deleteDialogText:
    'Вы действительно хотите удалить данную категорию? Все дочерние категории тоже будут удалены.',
  checkPossibleToDelete: true
}
