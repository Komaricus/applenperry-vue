export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      required: true,
      counter: 300,
      tooltip: 'Название товара для отображения в списке и карточке товара',
      slugSource: true
    },
    {
      id: 'subheader',
      type: 'input-field',
      label: 'Подзаголовок',
      placeholder: 'Введите подзаголовок',
      required: false,
      counter: 300,
      tooltip: 'Для отображения под названием в карточке товара'
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
      id: 'description',
      type: 'html-field',
      label: 'Краткое описание',
      placeholder: 'Введите описание',
      tooltip: 'Описание для отображения на странице товара'
    },
    {
      id: 'typeId',
      type: 'select-field',
      label: 'Тип товара',
      placeholder: 'Выберите тип',
      required: true,
      itemsURL: '/products-types/',
      tooltip: 'Тип товара для отображения в карточке товара'
    },
    {
      id: 'amount',
      type: 'number-field',
      label: 'Количество',
      placeholder: 'Введите число',
      tooltip: 'Оставшееся количество товара',
      default: 0,
      required: false,
      rules: [
        value => {
          return Number.isInteger(Number(value)) || 'Введите целое число'
        },
        value => {
          return Number(value) >= 0 || 'Минимальное значение: 0'
        },
        value => {
          return Number(value) <= 1000 || 'Максимальное значение: 1000'
        }
      ]
    },
    {
      id: 'size',
      type: 'number-field',
      label: 'Объем (в литрах)',
      placeholder: 'Введите объем',
      tooltip: 'Объем товара в литрах, дробная часть отделяется запятой или точкой',
      required: false,
      default: 0,
      rules: [
        value => {
          return parseFloat(value) === Number(value) || 'Введите число'
        },
        value => {
          return Number(value) >= 0 || 'Минимальное значение: 0'
        },
        value => {
          return Number(value) <= 1000 || 'Максимальное значение: 1000'
        }
      ]
    },
    {
      id: 'strength',
      type: 'number-field',
      label: 'Крепость (%)',
      placeholder: 'Введите крепость',
      tooltip: 'Процент алкоголя, дробная часть отделяется запятой или точкой',
      required: false,
      default: 0,
      rules: [
        value => {
          return parseFloat(value) === Number(value) || 'Введите число'
        },
        value => {
          return Number(value) >= 0 || 'Минимальное значение: 0'
        },
        value => {
          return Number(value) <= 1000 || 'Максимальное значение: 1000'
        }
      ]
    },
    {
      id: 'sugarTypeId',
      type: 'select-field',
      label: 'Сахар',
      placeholder: 'Выберите тип сахара',
      required: true,
      itemsURL: '/products-sugar-types/',
      tooltip: 'Тип сахара товара для отображения в карточке товара'
    },
    {
      id: 'price',
      type: 'number-field',
      label: 'Цена (₽.)',
      placeholder: 'Введите цену',
      tooltip: 'Цена в рублях, дробная часть отделяется запятой или точкой',
      required: false,
      default: 0,
      rules: [
        value => {
          return parseFloat(value) === Number(value) || 'Введите число'
        },
        value => {
          return Number(value) >= 0 || 'Минимальное значение: 0'
        },
        value => {
          return Number(value) <= 100000 || 'Максимальное значение: 100000'
        }
      ]
    },
    {
      id: 'vendorCode',
      type: 'input-field',
      label: 'Артикул',
      placeholder: 'Введите артикул',
      required: false,
      counter: 30,
      tooltip: 'Артикул товара'
    },
    {
      id: 'vendorId',
      type: 'select-field',
      label: 'Производитель',
      placeholder: 'Выберите производителя',
      required: true,
      itemsURL: '/vendors/',
      tooltip: 'Производитель товара'
    },
    {
      id: 'categories',
      type: 'categories-field',
      itemsURL: '/categories/',
      label: 'Категории',
      placeholder: 'Выберите категории',
      required: true,
      tooltip:
        'Выберите категории товара из списка. Для изменения порядка отображения категорий в карточке продукта - перетаскивайте их'
    },
    {
      id: 'images',
      type: 'files-field',
      label: 'Изображения',
      required: true,
      multiple: true,
      tooltip:
        'Загрузите или выберите изображения для отображения в карточке товара. Перетаскивайте изображения для изменения их порядка. В списке товаров отображается первое изображение'
    }
  ],
  creationTitle: 'Создание нового товара',
  editTitle: 'Редактирование товара',
  deleteDialogText: 'Вы действительно хотите удалить данный товар?',
  checkPossibleToDelete: true
}
