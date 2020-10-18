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
      tooltip: 'Описание для отображения при клике на название'
    },
    {
      id: 'size',
      type: 'number-field',
      label: 'Размер',
      placeholder: 'Введите число',
      required: true,
      tooltip: 'Размер шрифта для названия в текстовом облаке. Рекомендуется от 16 до 30',
      rules: [
        value => {
          return Number.isInteger(Number(value)) || 'Введите целое число'
        },
        value => {
          return Number(value) >= 10 || 'Минимальное значение: 10'
        },
        value => {
          return Number(value) < 36 || 'Максимальное значение: 36'
        }
      ]
    }
  ],
  creationTitle: 'Создание записи о сидре',
  editTitle: 'Редактирование записи о сидре',
  deleteDialogText: 'Вы действительно хотите удалить данную запись о сидре?'
}
