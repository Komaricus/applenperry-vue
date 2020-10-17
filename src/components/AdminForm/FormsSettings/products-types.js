export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа товара для отображения в карточке товара'
    }
  ],
  creationTitle: 'Создание нового типа товара',
  editTitle: 'Редактирование типа товара',
  deleteDialogText: 'Вы действительно хотите удалить данный тип товара?',
  checkPossibleToDelete: true
}
