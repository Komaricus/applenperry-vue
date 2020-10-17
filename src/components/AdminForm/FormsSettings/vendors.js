export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название производителя для отображения',
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
    },
    {
      id: 'fileId',
      type: 'files-field',
      label: 'Логотип производителя',
      placeholder: 'Загрузите файл',
      required: true,
      tooltip: 'Загрузите логотип производителя'
    },
    {
      id: 'description',
      type: 'text-field',
      label: 'Краткое описание',
      placeholder: 'Краткое описание производителя',
      required: false,
      counter: 1000,
      tooltip: 'Описание категории для отображения'
    },
    {
      id: 'countryId',
      type: 'select-field',
      label: 'Страна',
      placeholder: 'Выберите страну производителя',
      required: true,
      itemsURL: '/countries/',
      tooltip: 'Страна к которой относится производитель'
    }
  ],
  creationTitle: 'Создание нового производителя',
  editTitle: 'Редактирование производителя',
  deleteDialogText: 'Вы действительно хотите удалить данного производителя?',
  checkPossibleToDelete: true
}
