export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа товара для отображения в карточке товара',
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
    }
  ],
  creationTitle: 'Создание нового типа товара',
  editTitle: 'Редактирование типа товара',
  deleteDialogText: 'Вы действительно хотите удалить данный тип товара?',
  checkPossibleToDelete: true
}
