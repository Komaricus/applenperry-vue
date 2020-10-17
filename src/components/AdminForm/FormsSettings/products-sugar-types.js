export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа сахара товара для отображения в карточке товара'
    }
  ],
  creationTitle: 'Создание нового типа сахара товара',
  editTitle: 'Редактирование типа сахара товара',
  deleteDialogText: 'Вы действительно хотите удалить данный тип сахара товара?',
  checkPossibleToDelete: true
}
