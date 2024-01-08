// Находим нужную кнопку
const btn = document.querySelector('.header__symbol');

// Прослушиваем нажатие на кнопку
btn.addEventListener('click', function() {
    // Переключаем (добавляем/удаляем) класс .dark-theme
    document.body.classList.toggle('dark-theme'); 
})







