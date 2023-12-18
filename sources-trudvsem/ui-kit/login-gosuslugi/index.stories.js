import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / login-gosuslugi', module)
  .add('Default', () => `
    <div class="container">
        <h1 class="content__title">Вход для соискателей </h1>
        <div class="mb-2">
            <div class="card card_grey">
                <p class="content__paragraph content_center">
                    <strong>Выполнив вход, Вы сможете:</strong>
                </p>
                <div class="row row_middle">
                    <div class="offset-lg-1"></div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col-lg-4 my-1">
                                <div class="row row_middle">
                                    <div class="col-auto">
                                        <img class="content__image"
                                            src="https://adm.test-portal.trudvsem.ru/information/resources/upload/legacy/login_search.png"
                                            alt="">
                                    </div>
                                    <div class="col">
                                        <p class="content__paragraph">Искать работу</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4  my-1">
                                <div class="row row_middle">
                                    <div class="col-auto">
                                        <img class="content__image"
                                            src="https://adm.test-portal.trudvsem.ru/information/resources/upload/legacy/login_add_cv.png"
                                            alt="">
                                    </div>
                                    <div class="col">
                                        <p class="content__paragraph">Размещать резюме</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 my-1">
                                <div class="row row_middle">
                                    <div class="col-auto">
                                        <img class="content__image"
                                            src="https://adm.test-portal.trudvsem.ru/information/resources/upload/legacy/login_contact.png"
                                            alt="">
                                    </div>
                                    <div class="col">
                                        <p class="content__paragraph">Связаться с работодателем
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="content__paragraph content_right"><a href="#" class="link">Ищете сотрудников?</a></p>
        </div>

        <div class="content_center mb-2">
            <p class="content__paragraph ">Вход осуществляется через портал Государственных Услуг <img width="77"
                    height="13"
                    src="https://adm.test-portal.trudvsem.ru/information/resources/upload/legacy/login_gosuslugi_2x.png"
                    alt=""> (ЕСИА)
            </p>
            <p class="content__paragraph"><a href="#" class="button">Войти</a></p>
            <p><a class="spoiler__control" href="#registration">Не зарегистрированы на Госуслугах</a>
            </p>
        </div>
        <div class="card card_grey mb-2">
            <h4 class="content__section-title content_center">Согласие на обработку персональных данных
            </h4>
            <p>
                Гражданин, ищущий работу (далее – Пользователь), регистрируясь на портале www.trudvsem.ru, обязуется принять
                настоящее <a target="_blank" class="link" href="/assets/doc/agreement_personal_data.pdf"
                    download="Согласие на обработку персональных данных">Согласие на обработку персональных данных (далее –
                    Согласие).</a>
                Принятием (акцептом) оферты Согласия является факт регистрации пользователя (субъекта персональных данных)
                на портале, тем самым пользователь осуществляет конклюдентные действия,
                выражающие его волю и согласие на обработку его персональных данных, <a target="_blank"
                    href="/assets/doc/politic_personal_data.pdf" class="link"
                    download="Политика обработки персональных данных">согласно политике обработки персональных данных</a>.
            </p>
        </div>
        <div id="registration" class="spoiler">
            <div class="card card_grey">
                <div class="login-gosuslugi mb-2">
                    <div class="login-gosuslugi__text mb-2">
                        <strong>По кнопке <a class="button">Зарегистрироваться</a> Вы попадаете на Портал государственных
                            услуг</strong>
                    </div>
                    <div class="login-gosuslugi__text mb-2">
                        <strong>Следуйте инструкциям по регистрации - это займет
                            несколько минут.</strong>
                    </div>
                    <div class="login-gosuslugi__text mb-2"><strong>
                            Вам потребуется только адрес электронной почты или номер
                            мобильного телефона.
                        </strong></div>
                    <div class="login-gosuslugi__text mb-2"><strong>После завершения регистрации вернитесь на
                            портал «Работа
                            в России».</strong></div>
                    <div class="login-gosuslugi__text mb-2"><strong>Осуществите вход, используя полученные Вами
                            логин и
                            пароль.</strong></div>
                </div>
                <div class="row mb-2">
                    <div class="offset-lg-2"></div>
                    <div class="col-lg-8">
                        <div class="card">
                            Если Вы уже зарегистрированы на Портале государственных услуг, то для входа на портал «Работа в
                            России» Вы можете воспользоваться Вашим логином и паролем
                        </div>
                    </div>
                </div>
                <hr class="separator mb-2" />
                <div class="row mb-2">
                    <div class="offset-lg-2"></div>
                    <div class="col-lg-8">
                        <div class="card">
                            Регистрируясь на портале, Вы подтверждаете, что ознакомились <a class="link" target="_blank"
                                href="/assets/doc/politic_personal_data.pdf"
                                download="Политика обработки персональных данных">
                                с политикой в отношении обработки персональных данных
                            </a>, а также согласны на обработку персональных данных в соответствии с Федеральным законом №
                            152-ФЗ.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `)
  
