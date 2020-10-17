export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название страны',
      placeholder: 'Введите название',
      required: true,
      counter: 100
    },
    {
      id: 'flag',
      type: 'files-field',
      label: 'Иконка флага',
      placeholder: 'Загрузите файл',
      required: true,
      tooltip: 'Загрузите иконку флага'
    }
  ],
  creationTitle: 'Создание страны',
  editTitle: 'Редактирование страны',
  deleteDialogText: 'Вы действительно хотите удалить данную страну?',
  checkPossibleToDelete: true
}
