import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Content - Контент', module)
  .addParameters({
    readme: {
      sidebar: `
    <h1 class="content__title">{{title}}</h1>
        `,
    },
  })
  .add('Заголовок', () => '<h1 class="content__title">Заголовок страницы</h1>')

  .addParameters({
    readme: {
      sidebar: `
    <h2 class="content__section-title">{{title}}</h2>
        `,
    },
  })
  .add('Подзаголовок', () => '<h2 class="content__section-title">Заголовок секции</h2>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content__paragraph">{{content}}</p>
        `,
    },
  })
  .add('Параграф', () => '<p class="content__paragraph">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_positive">{{content}}</p>
        `,
    },
  })
  .add('Зеленый', () => '<p class="content_positive">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_important">{{content}}</p>
        `,
    },
  })
  .add('Красный', () => '<p class="content_important">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_accent">{{content}}</p>
        `,
    },
  })
  .add('Синий', () => '<p class="content_accent">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_muted">{{content}}</p>
        `,
    },
  })
  .add('Приглушенный', () => '<p class="content_muted">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_upper">{{content}}</p>
        `,
    },
  })
  .add('Верхний регистр', () => '<p class="content_upper">Параграф текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content_justify">{{content}}</p>
        `,
    },
  })
  .add('Выравнивание', () => `<p class="content_justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolorum quae minima sunt, harum ratione veniam? Eius unde est dolorem consequatur totam? Amet voluptatem accusamus dolores corrupti, tempora modi itaque.
  Maxime veniam magnam alias voluptatibus vero sint nostrum exercitationem saepe nemo tempora! Cupiditate iure, asperiores harum omnis odio perferendis odit. Ex temporibus, alias dolores vel corrupti veniam tenetur et enim.
  Nam laborum quam distinctio reiciendis dignissimos ducimus expedita obcaecati iste asperiores, nulla officiis facilis quidem molestiae quibusdam porro aut. Officia explicabo corporis quasi obcaecati accusamus omnis suscipit facilis accusantium vitae.
  Soluta eos quos eum natus tenetur sunt quidem quia, delectus voluptatibus fugiat voluptatem numquam, mollitia aut eveniet ducimus assumenda veritatis explicabo beatae commodi. Velit perferendis provident neque doloribus consequatur fuga!
</p>`)  

  .addParameters({
    readme: {
      sidebar: `
    <p class="content__paragraph content_center">{{content}}</p>
        `,
    },
  })
  .add('Центрированный', () => '<p class="content__paragraph content_center">Центрированный текст</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content__paragraph content_right">{{content}}</p>
        `,
    },
  })
  .add('Текст в конце', () => '<p class="content__paragraph content_right">Текст в конце</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content__paragraph content_nowrap">{{content}}</p>
      `,
       },
    })
  .add('Текст с запретом переноса', () => '<p class="content__paragraph content_nowrap">Текст с запретом переноса</p>')

  .addParameters({
    readme: {
      sidebar: `
    <p class="content__paragraph content_big">{{content}}</p>
        `,
    },
  })
  .add('Увеличенный ', () => '<p class="content__paragraph content_big">Увеличенный размер текста</p>')

  .addParameters({
    readme: {
      sidebar: `
    <img class="content__image" src="{{src}}" alt="{{title}}">
        `,
    },
  })
  .add('Картинка ', () => `<img class="content__image" src="https://test-portal.trudvsem.ru/information/resources/upload/job/img-1.jpg" alt="Работа">`)  

  .addParameters({
    readme: {
      sidebar: `
    <div class="content__embed_4-3">
      <video controls="controls">
        <source src="{{src}}" type="video/ogg; codecs="theora, vorbis"">
        <source src="{{src}}" type="video/mp4; codecs="avc1.42E01E, mp4a.40.2"">
        <source src="{{src}}" type="video/webm; codecs=vp8, vorbis"">
        Тег video не поддерживается вашим браузером
        <a class="link" href="{{src}}">Скачайте видео</a>.
      </video>
    </div>
        `,
    },
  })
  .add('Объект ', () => `
  <div class="content__embed_16-9" style="max-width: 600px;">
    <video controls="controls">
      <source src="https://test-portal.trudvsem.ru/information/resources/upload/opendata/events/konkurs-2016/video/video-2.ogv" type="video/ogg; codecs=" theora="" vorbis="">
      <source src="https://test-portal.trudvsem.ru/information/resources/upload/opendata/events/konkurs-2016/video/video-2.mp4" type="video/mp4; codecs=" avc1="" 42e01e="" mp4a="" 40="" 2="">
      <source src="https://test-portal.trudvsem.ru/information/resources/upload/opendata/events/konkurs-2016/video/video-2.webm" type="video/webm; codecs=vp8, vorbis">
      Тег video не поддерживается вашим браузером
      <a class="link" href="https://test-portal.trudvsem.ru/information/resources/upload/opendata/events/konkurs-2016/video/video-2.mp4">Скачайте видео</a>.
    </video>
  </div>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <div class="content__fix-ratio" style="background-image: url('{{src}}'); height: {{height}}">
      <img src="{{src}}" />
    </div>
        `,
    },
  })
  .add('Картинка на подложке', () => `
    <div class="content__fix-ratio" style="background-image: url('https://test-portal.trudvsem.ru/information/resources/upload/job/img-1.jpg'); height: 200px">
      <img class="content__image" src="https://test-portal.trudvsem.ru/information/resources/upload/job/img-1.jpg" alt="Работа" />
    </div>
`);