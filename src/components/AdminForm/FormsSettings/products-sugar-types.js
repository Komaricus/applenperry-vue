export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа сахара продукта для отображения в карточке продукта'
    }
  ],
  creationTitle: 'Создание нового типа сахара продукта',
  editTitle: 'Редактирование типа сахара продукта',
  deleteDialogText: 'Вы действительно хотите удалить данный тип сахара продукта?'
}
