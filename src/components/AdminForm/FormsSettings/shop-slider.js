export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Заголовок слайда',
      placeholder: 'Введите заголовок',
      tooltip: 'Заголовок слайда для отображения на слайде в магазине',
      required: true,
      counter: 200
    },
    {
      id: 'description',
      type: 'html-field',
      label: 'Описание слайда',
      placeholder: 'Введите описание',
      tooltip: 'Описание слайда для отображения на слайде в магазине под заголовком'
    },
    {
      id: 'link',
      type: 'input-field',
      label: 'Ссылка',
      placeholder: 'Укажите ссылку',
      tooltip:
        'Ссылка на которую будет вести слайд. Будет открываться при клике на слайд. Это может быть ссылка на новость, на товар и пр.',
      required: false,
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
        'Загрузите изображение слайда для отображения на главной странице сайта. Рекомендуемое разрешение: 1920x400'
    }
  ],
  creationTitle: 'Создание слайда магазина',
  editTitle: 'Редактирование слайда магазина',
  deleteDialogText: 'Вы действительно хотите удалить данный слайд?'
}
