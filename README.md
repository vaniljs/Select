# Стилизация Select (Javascript)

Так как <b>select</b> не стилизуется, используется его "клон".  <br>
И с помощью JavaScript синхронизируется выбор <b>option</b>

Рядом с обычным select указываем его будущую обертку:

```html
<select class="custom-select">
    <option selected>Выберите тип</option>
    <option>Landing Page</option>
    <option>Корпоративный сайт</option>
    <option >Онлайн магазин</option>
</select>

<div class="select-wrapper"></div>
```

Код JavaScript: 

```JavaScript

// Функции-конструкторы 
function q(selector) {
    return document.querySelector(selector);
}
function qq(selectors) {
    return document.querySelectorAll(selectors);
}


var option = qq('.custom-select option'),    
                selectWrapper = q('.select-wrapper');

var selectResult = document.createElement('div');
selectResult.classList.add('select-result');
selectWrapper.appendChild(selectResult);

var firstDiv = document.createElement('div');
firstDiv.style.display = 'none';
selectResult.appendChild(firstDiv);

option.forEach((item) => {
    let div = document.createElement('div');
    div.innerHTML = item.innerHTML;
    selectResult.appendChild(div);
});

qq('.select-result div').forEach((item) => {
    item.addEventListener('click', (e) => {
        if (selectResult.classList.contains('select-active')) {
            q('.select-result div').innerHTML = e.target.innerHTML;
            firstDiv.style.display = 'block';
            selectResult.classList.remove('select-active');
            option.forEach((item) => {
                item.innerHTML === e.target.innerHTML ? item.selected = true : false;
            });
        } else {
            selectResult.classList.add('select-active');
        }
    });
});

window.addEventListener('click', (e) => {
    if ( !e.target.parentNode.classList.contains('select-result') && q('.select-active')) {
        selectResult.classList.remove('select-active');
    }
});
```

