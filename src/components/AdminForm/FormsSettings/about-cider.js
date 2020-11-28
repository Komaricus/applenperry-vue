export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 300,
      tooltip: 'Название для отображения в текстовом облаке'
    },
    {
      id: 'description',
      type: 'html-field',
      label: 'Описание',
      placeholder: 'Введите описание',
      tooltip: 'Описание для отображения при клике на название',
      canAddImage: true
    }
  ],
  creationTitle: 'Создание записи о сидре',
  editTitle: 'Редактирование записи о сидре',
  deleteDialogText: 'Вы действительно хотите удалить данную запись о сидре?'
}
