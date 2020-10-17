export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название типа продукта для отображения в карточке продукта'
    }
  ],
  creationTitle: 'Создание нового типа продукта',
  editTitle: 'Редактирование типа продукта',
  deleteDialogText: 'Вы действительно хотите удалить данный тип продукта?'
}
