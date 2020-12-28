export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа сахара товара для отображения в карточке товара',
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
      id: 'icon',
      type: 'files-field',
      label: 'Иконка',
      placeholder: 'Загрузите файл',
      required: false,
      tooltip: 'Загрузите иконку категории для отображения в списке категорий',
      multiple: false
    }
  ],
  creationTitle: 'Создание нового типа сахара товара',
  editTitle: 'Редактирование типа сахара товара',
  deleteDialogText: 'Вы действительно хотите удалить данный тип сахара товара?',
  checkPossibleToDelete: true
}
