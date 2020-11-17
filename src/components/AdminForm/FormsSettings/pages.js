export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название для отображения в админке',
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
      id: 'html',
      type: 'html-field',
      label: 'Текст',
      placeholder: 'Введите текст',
      tooltip: 'Текст страницы для отображения на сайте'
    }
  ],
  creationTitle: 'Создание страницы',
  editTitle: 'Редактирование страницы',
  deleteDialogText: 'Вы действительно хотите удалить данную страницу?'
}
