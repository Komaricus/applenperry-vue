export default {
  fields: [
    {
      id: 'name',
      type: 'input-field',
      label: 'Название',
      placeholder: 'Введите название',
      tooltip: 'Название новости для отображения в списке новостей и на странице новости',
      required: true,
      counter: 300
    },
    {
      id: 'subheader',
      type: 'input-field',
      label: 'Подзаголовок',
      placeholder: 'Введите подзаголовок',
      tooltip:
        'Подзаголовок новости для отображения в списке новостей и на странице новости под основным названием новости',
      required: false,
      counter: 300
    },
    {
      id: 'description',
      type: 'text-field',
      label: 'Описание',
      placeholder: 'Введите описание',
      tooltip:
        'Описание новости для отображения в списке новостей и на странице новости под подзаголовком новости',
      required: false,
      counter: 1000
    },
    {
      id: 'sectionId',
      type: 'select-field',
      label: 'Раздел новостей',
      placeholder: 'Выберите раздел',
      required: true,
      itemsURL: '/news-sections/',
      tooltip: 'Раздел новостей, к которому будет принадлежать данная новость'
    },
    {
      id: 'fileId',
      type: 'files-field',
      label: 'Изображение',
      placeholder: 'Загрузите файл',
      required: true,
      tooltip: 'Загрузите изображение новости для отображения в списке новостей'
    },
    {
      id: 'content',
      type: 'html-field',
      label: 'Контент',
      placeholder: 'Введите текст новости и загрузите изображения',
      required: true,
      tooltip: 'Контент новости для отображения на странице новости'
    }
  ],
  creationTitle: 'Создание слайда',
  editTitle: 'Редактирование слайда',
  deleteDialogText: 'Вы действительно хотите удалить данный слайд?'
}
