# Инструкция

1. git clone https://github.com/botanikn/yii2_offer.git в папку веб-сервера
2. В папке проекта необходимо установить все зависимости, это делается командой "composer install"
3. Импортировать дамп offers.sql (в котором уже имеется 21 готовая запись) в СУБД MySQL
4. Пройти по url {путь до папки веб-сервера}/web/index.php?r=my/render
5. При нажатии на кнопку "Create an offer" предоставлятся возможность создать оффер
6. При выборе "Offer name" или "Email", наборе в строке поиска и нажатии кнопки "Search" происходит фильтрация либо по названию, либо по email'у
7. "Name Sort" и "ID Sort" отвечают за фортировку по названию оффера и ID соответственно
8. У каждого оффера есть кнопка "Редактировать" и "Удалить", которые позволяют выполнить соответствующие действия
9. Внизу страницы находятся кнопки перехода между страницами (пагинация 10 элементов)