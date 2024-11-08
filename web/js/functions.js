$(document).ready(function() {

    let loc_id;
    let point = 0;

    $('.create').on('click', function() {
        $('#overlay').fadeIn(); // Плавно показываем оверлей
        $('#popup').fadeIn(); // Плавно показываем модальное окно
    });

    $('#closePopup, #overlay').on('click', function() {
        $('#overlay').fadeOut(); // Плавно скрываем оверлей
        $('#popup').fadeOut(); // Плавно скрываем модальное окно
    });

    // Всплывающее уведомление об успешной операции
    function showNotification() {
        $('#success').fadeIn().delay(2000).fadeOut();
    }

    // Класс содержащий шаблон для создания оффера
    class Offer {
        constructor(offer) {
            this.offer = offer;
        }
        generateHtml() {
            return `<center>
                        <div class="offer" id="${this.offer.ID}_offer">
                            <span> ID - ${this.offer.ID}</span>
                            <span class="${this.offer.ID}offername"> Name - ${this.offer.OfferName}</span>
                            <span class="${this.offer.ID}email"> Email - ${this.offer.Email}</span>
                            <span class="${this.offer.ID}number"> Number - ${this.offer.PhoneNumber}</span>
                            <span class="${this.offer.ID}date"> Date - ${this.offer.CreationDate}</span>
                            <button id="${this.offer.ID}_delete" class="delete">Удалить</button>
                            <button id="${this.offer.ID}_edit" class="edit">Редактировать</button>
                            <br>
                        </div>
                    </center>`;
        }
    }

    // Используем делегирование событий
    $('.main').on('click', '.delete', function() {
        const id = $(this).attr("id").split("_")[0];
        $.ajax({
            url: 'index.php?r=my/delete',
            data: { id: id },
            type: 'GET',
            success: function(res) {
                console.log('Оффер успешно удалён:', res);
                $("#" + id + "_offer").hide(); // Скрываем элемент после удаления
            },
            error: function() {
                console.error('Ошибка при удалении оффера:');
            }
        });
    });
    $('.main').on('click', '.edit', function() {
        $('#overlay').fadeIn();
        $('#edit_popup').fadeIn();
        loc_id = $(this).attr("id").split("_")[0];
    });
    $('#editclosePopup, #overlay').on('click', function() {
        $('#overlay').fadeOut();
        $('#edit_popup').fadeOut();
    });
    // Удаляем выбранный нами оффер
    $('.delete').on('click', function() {
        id = $(this).attr("id").split("_")[0];
        $.ajax({
            url: 'index.php?r=my/delete',
            data:{
                id: id,
            },
            type: 'GET',
            success: function(res) {
                console.log('Оффер успешно удалён:', res);
                showNotification();
            },
            error: function() {
                console.error('Ошибка при удалении оффера:');
            }
        })
        $("#" + id + "_offer").hide();
    });

    // Сокрытие popup
    $('#editclosePopup, #overlay').on('click', function() {
        $('#overlay').fadeOut(); // Плавно скрываем оверлей
        $('#edit_popup').fadeOut(); // Плавно скрываем модальное окно
    });

    $('.edit').on('click', function() {

        $('#overlay').fadeIn(); // Плавно показываем оверлей
        $('#edit_popup').fadeIn(); // Плавно показываем модальное окно
        loc_id = $(this).attr("id").split("_")[0];
    });



    let currentPage = 1; // Начальная страница

    // Функция фильтрации
    function loadOffers(page) {
        let par = $('#par').val();
        let value = $('#search_value').val();
        $.ajax({
            url: 'index.php?r=my/filtre', // Укажите правильный URL для вашего контроллера
            method: 'GET',
            data: {
                par: par, // Замените на ваш параметр
                value: value, // Замените на ваше значение
                page: page
            },
            success: function(res) {
                console.log(typeof res)
                $('.main').empty(); // Очищаем контейнер перед добавлением новых предложений
                for(let i = 0; i < res.offers.length; i++) {
                    let offer = new Offer(res.offers[i]); // Создаем экземпляр Offer
                    $('.main').append(offer.generateHtml());
                }
                // Создаем кнопки для навигации по страницам
                createPagination(res.totalPages);
            },
            error: function() {
                console.error('Ошибка при загрузке предложений');
            }
        });
    }
    function createPagination(totalPages) {
        $('.paginator').empty(); // Очищаем контейнер для пагинации
        for(let i = 1; i <= totalPages; i++) {
            let pageButton = $('<button>').text(i).addClass('page-button');
            if (i === currentPage) {
                pageButton.prop('disabled', true); // Деактивируем кнопку текущей страницы
            }
            pageButton.on('click', function() {
                currentPage = i; // Устанавливаем текущую страницу
                loadOffers(currentPage); // Загружаем предложения для текущей страницы
            });
            $('.paginator').append(pageButton); // Добавляем кнопку на страницу
        }
    }
    // Загружаем предложения при инициализации
    $('#search_button').on('click', function() {
        loadOffers(currentPage);
    })

    // Функция сортировки по названию
    function loadOffersSortName(page) {
        let par = $('#par').val();
        let value = $('#search_value').val();
        $.ajax({
            url: 'index.php?r=my/filtre', // Укажите правильный URL для вашего контроллера
            method: 'GET',
            data: {
                par: par, // Замените на ваш параметр
                value: value, // Замените на ваше значение
                page: page
            },
            success: function(res) {
                $('.main').empty(); // Очищаем контейнер перед добавлением новых предложений
                
                // Предполагаем, что res.offers - это массив предложений
                let offersArray = res.offers; // Получаем массив предложений
                offersArray.sort((a, b) => a.OfferName.localeCompare(b.OfferName)); // Сортируем массив по имени предложения
                
                for (let i = 0; i < offersArray.length; i++) {
                    let offer = new Offer(offersArray[i]); // Создаем экземпляр Offer
                    $('.main').append(offer.generateHtml());
                }
                // Создаем кнопки для навигации по страницам
                createPagination(res.totalPages);
            },
            error: function() {
                console.error('Ошибка при загрузке предложений');
            }
        });
    }

    // Функция сортировки по ID
    function loadOffersSortID(page) {
        let par = $('#par').val();
        let value = $('#search_value').val();
        $.ajax({
            url: 'index.php?r=my/filtre', // Укажите правильный URL для вашего контроллера
            method: 'GET',
            data: {
                par: par, // Замените на ваш параметр
                value: value, // Замените на ваше значение
                page: page
            },
            success: function(res) {
                $('.main').empty(); // Очищаем контейнер перед добавлением новых предложений
                
                // Предполагаем, что res.offers - это массив предложений
                let offersArray = res.offers; // Получаем массив предложений
                offersArray.sort((a, b) => a.ID - b.ID);

                for (let i = 0; i < offersArray.length; i++) {
                    let offer = new Offer(offersArray[i]); // Создаем экземпляр Offer
                    $('.main').append(offer.generateHtml());
                }
                // Создаем кнопки для навигации по страницам
                createPagination(res.totalPages);
            },
            error: function() {
                console.error('Ошибка при загрузке предложений');
            }
        });
    }

    // Фильтрация
    $('#search_button').on('click', function() {
        loadOffers(currentPage);
    })

    // Сортировка по названию
    $('#name_sort').on('click', function() {
        loadOffersSortName(currentPage);
    })

    // Сортировка по ID
    $('#id_sort').on('click', function() {
        loadOffersSortID(currentPage);
    })

    function validateField(fieldId, placeholder) {
        if ($(fieldId).val() != '') {
            point++;
            $(fieldId).addClass('black').removeClass('red');
        } else {
            $(fieldId).addClass('red').removeClass('black').attr('placeholder', placeholder);
        }
    }

    // Изменяем данные в БД и на странице
    $('#edit').on('click', function() {
        point = 0;
        validateField('#edit_name', 'Enter the name');
        validateField('#edit_email', 'Enter the email');
        validateField('#edit_phone', 'Enter the phone');
        validateField('#edit_date', 'Enter the date');
        console.log(point);
        if (point == 4) {
            $.ajax({
            url: 'index.php?r=my/edit',
            data:{
                id: loc_id,
                name: $('#edit_name').val(),
                email: $('#edit_email').val(),
                phone: $('#edit_phone').val(),
                date: $('#edit_date').val()
            },
            type: 'GET',
            success: function(res) {
                console.log('Оффер был успешно изменён:', res);
                showNotification();
            },
            error: function() {
                console.error('Ошибка при изменении оффера:');
            }
        });

        $('.' + loc_id + "offername").text($('#edit_name').val());
        $('.' + loc_id + "email").text($('#edit_email').val());
        $('.' + loc_id + "phone").text($('#edit_phone').val());
        $('.' + loc_id + "date").text($('#edit_date').val());

        $('#overlay').fadeOut(); // Закрываем оверлей
        $('#edit_popup').fadeOut(); // Закрываем окно после отправки
        }

    })
    

    // Создание нового оффера
    $('#post').on('click', function(event) {
        point = 0;
        validateField('#name', 'Enter the name');
        validateField('#email', 'Enter the email');
        validateField('#phone', 'Enter the phone');
        if (point == 3) {
            $.ajax({
                url: 'index.php?r=my/add', // Укажите правильный URL
                // contentType: 'application/json',
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val()
                },
                type: 'POST',
                success: function(res) {
                    console.log('Оффер успешно создан:', res);
                    let offer = new Offer(res[0]); // Создаем экземпляр Offer
                    $('.main').append(offer.generateHtml());
                    showNotification();
                },
                error: function() {
                    console.error('Ошибка при создании Оффер:');
                }
            });
            $('#overlay').fadeOut(); // Закрываем оверлей
            $('#popup').fadeOut(); // Закрываем окно после отправки
        }
    });
});