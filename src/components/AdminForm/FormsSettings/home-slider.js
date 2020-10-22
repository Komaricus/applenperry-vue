export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название слайда',
      placeholder: 'Введите название',
      tooltip:
        'Название только для отображения в списке в админке. На главной отображаться не будет',
      required: true,
      counter: 200
    },
    {
      id: 'priority',
      type: 'number-field',
      label: 'Номер слайда',
      placeholder: 'Введите число',
      tooltip: 'Порядковый номер слайда в слайдере',
      required: true,
      rules: [
        value => {
          return Number.isInteger(Number(value)) || 'Введите целое число'
        },
        value => {
          return Number(value) > 0 || 'Минимальное значение: 1'
        },
        value => {
          return Number(value) <= 1000 || 'Максимальное значение: 1000'
        }
      ]
    },
    {
      id: 'fileId',
      type: 'files-field',
      label: 'Изображение слайда',
      placeholder: 'Загрузите файл',
      required: true,
      tooltip:
        'Загрузите изображение слайда для отображения на главной странице сайта. Рекомендуемое разрешение: 1920x1080'
    }
  ],
  creationTitle: 'Создание слайда',
  editTitle: 'Редактирование слайда',
  deleteDialogText: 'Вы действительно хотите удалить данный слайд?'
}
