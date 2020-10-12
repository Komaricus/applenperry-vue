export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название раздела',
      placeholder: 'Введите название',
      required: true,
      counter: 200,
      tooltip: 'Название раздела для отображения на странице новостей'
    },
    {
      id: 'url',
      type: 'input-field',
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
      id: 'priority',
      type: 'number-field',
      label: 'Порядковый номер раздела',
      placeholder: 'Введите число',
      tooltip: 'Порядковый номер раздела для номера раздела в списке разделов',
      required: true,
      rules: [
        value => {
          return Number.isInteger(Number(value)) || 'Введите целое число'
        },
        value => {
          return Number(value) > 0 || 'Минимальное значение: 1'
        },
        value => {
          return Number(value) < 1000 || 'Максимальное значение: 1000'
        }
      ]
    }
  ],
  creationTitle: 'Создание нового раздела',
  editTitle: 'Редактирование раздела',
  deleteDialogText:
    'Вы действительно хотите удалить данный раздел? Все новости из этого раздела также будут удалены'
}
