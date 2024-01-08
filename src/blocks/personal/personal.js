// Находим нужную кнопку
const btns = document.querySelector('.personal__msymbol');

// Прослушиваем нажатие на кнопку
btns.addEventListener('click', function() {
    // Переключаем (добавляем/удаляем) класс .dark-theme
    document.body.classList.toggle('dark-theme'); 
})