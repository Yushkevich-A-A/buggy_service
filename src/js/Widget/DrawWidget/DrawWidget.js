import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawWidget {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.drawWidget();
  }

  drawWidget() {
    this.widget = document.createElement('div');
    this.widget.classList.add('widget-wrapper');
    this.widget.innerHTML = `<div class="widget">
        <div class="widget-title">
          <h1 class="widget-title_h1">Новости мира кино</h1>
          <div class="widget-title-reload">
            Обновить
          </div>
        </div>
        <div class="widget-content">
          <div class="wrapper-content">
            <ul>
              <li class="wrapper-content-item">
                <div class="item-date wrapper-item"></div>
                <div class="item-info">
                  <div class="item-info-img wrapper-item"></div>
                  <div class="item-info-description">
                    <p class="description-text wrapper-item"></p>
                    <p class="description-text wrapper-item"></p>
                  </div>
                </div>
              </li>
              <li class="wrapper-content-item">
                <div class="item-date wrapper-item"></div>
                <div class="item-info">
                  <div class="item-info-img wrapper-item"></div>
                  <div class="item-info-description">
                    <p class="description-text wrapper-item"></p>
                    <p class="description-text wrapper-item"></p>
                  </div>
                </div>
              </li>
              <li class="wrapper-content-item">
                <div class="item-date wrapper-item"></div>
                <div class="item-info">
                  <div class="item-info-img wrapper-item"></div>
                  <div class="item-info-description">
                    <p class="description-text wrapper-item"></p>
                    <p class="description-text wrapper-item"></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content disable">
            <ul class="content-list">
            </ul>
          </div>
        </div>
        <div class="widget-error-wrapper disable">
          <div class="widget-error">
            <div class="widget-error-text">Не удалось загрузить данные. Проверьте подключение и обновите страницу </div>
          </div>
        </div>
      </div>`;
    this.element.appendChild(this.widget);

    this.reload = this.widget.querySelector('.widget-title-reload');
    this.wrapperContent = this.widget.querySelector('.wrapper-content');
    this.content = this.widget.querySelector('.content');
    this.contentList = this.widget.querySelector('.content-list');
    this.widgetErrorWrapper = this.widget.querySelector('.widget-error-wrapper');
  }

  // closeWrapper() {
  //     this.wrapperContent.classList.add('disable');
  // }

  // openWrapper() {
  //     this.wrapperContent.classList.remove('disable');
  // }

  openContent() {
    this.content.classList.remove('disable');
    this.wrapperContent.classList.add('disable');
  }

  closeContent() {
    this.content.classList.add('disable');
    this.wrapperContent.classList.remove('disable');
  }

  openErrorConnect() {
    this.widgetErrorWrapper.classList.remove('disable');
  }

  closeErrorConnect() {
    this.widgetErrorWrapper.classList.add('disable');
  }

  drawContent(data) {
    for (const i of data) {
      this.drawItem(i);
    }
  }

  drawItem(item) {
    const li = document.createElement('li');
    li.classList.add('wrapper-content-item');
    li.innerHTML = `<div class="item-date">${moment(item.date).format('HH:mm DD:MM:YYYY')}</div>
        <div class="item-info">
          <div class="item-info-img">
            <img class="item-img" src="./image/a88ca4cdc69aa0d9bc8064f7d36871a4.jpg" alt="">
          </div>
          <div class="item-info-description">
            <p class="description-text">тестовое описание фильма</p>
          </div>
        </div>`;

    this.contentList.appendChild(li);

    const img = li.querySelector('.item-img');
    img.src = item.src;
    const decript = li.querySelector('.description-text');
    decript.textContent = item.description;
  }
}
