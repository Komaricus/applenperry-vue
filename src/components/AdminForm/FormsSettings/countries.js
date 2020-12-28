export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название страны',
      placeholder: 'Введите название',
      required: true,
      counter: 100,
      slugSource: true
    },
    {
      id: 'url',
      type: 'slug-field',
      label: 'Ссылка',
      placeholder: 'Укажите ссылку',
      required: true,
      counter: 100,
      tooltip: 'URL для навигации внутри сайта. Допустимы английские буквы, цифры и дефисы',
      rules: [
        value => {
          const pattern = /^[a-z0-9-]+$/
          return pattern.test(value) || 'Неверная ссылка'
        }
      ]
    },
    {
      id: 'flag',
      type: 'files-field',
      label: 'Иконка флага',
      placeholder: 'Загрузите файл',
      required: true,
      tooltip: 'Загрузите иконку флага',
      multiple: false
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
  creationTitle: 'Создание страны',
  editTitle: 'Редактирование страны',
  deleteDialogText: 'Вы действительно хотите удалить данную страну?',
  checkPossibleToDelete: true
}
