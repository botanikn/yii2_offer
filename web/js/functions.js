$(document).ready(function() {

    let loc_id;

    $('.create').on('click', function() {
        $('#overlay').fadeIn(); // Плавно показываем оверлей
        $('#popup').fadeIn(); // Плавно показываем модальное окно
    });

    $('#closePopup, #overlay').on('click', function() {
        $('#overlay').fadeOut(); // Плавно скрываем оверлей
        $('#popup').fadeOut(); // Плавно скрываем модальное окно
    });

    function showNotification() {
        $('#success').fadeIn().delay(2000).fadeOut();
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
                    let offerHtml = '<center><div class="offer" id="' + res.offers[i].ID + '_offer">' +
                        '<span> ID - ' + res.offers[i].ID + '</span>' +
                        '<span class="' + res.offers[i].ID + 'offername"> Name - ' + res.offers[i].OfferName + '</span>' +
                        '<span class="' + res.offers[i].ID + 'email"> Email - ' + res.offers[i].Email + '</span>' +
                        '<span class="' + res.offers[i].ID + 'number"> Number - ' + res.offers[i].PhoneNumber + '</span>' +
                        '<span class="' + res.offers[i].ID + 'date"> Date - ' + res.offers[i].CreationDate + '</span>' +
                        '<button id="' + res.offers[i].ID + '_delete" class="delete">Удалить</button>' +
                        '<button id="' + res.offers[i].ID + '_edit" class="edit">Редактировать</button>' +
                        '<br>' +
                        '</div></center>';
                    
                    // Добавляем HTML в контейнер
                    $('.main').append(offerHtml);
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
                    let offerHtml = '<center><div class="offer" id="' + offersArray[i].ID + '_offer">' +
                        '<span> ID - ' + offersArray[i].ID + '</span>' +
                        '<span class="' + offersArray[i].ID + 'offername"> Name - ' + offersArray[i].OfferName + '</span>' +
                        '<span class="' + offersArray[i].ID + 'email"> Email - ' + offersArray[i].Email + '</span>' +
                        '<span class="' + offersArray[i].ID + 'number"> Number - ' + offersArray[i].PhoneNumber + '</span>' +
                        '<span class="' + offersArray[i].ID + 'date"> Date - ' + offersArray[i].CreationDate + '</span>' +
                        '<button id="' + offersArray[i].ID + '_delete" class="delete">Удалить</button>' +
                        '<button id="' + offersArray[i].ID + '_edit" class="edit">Редактировать</button>' +
                        '<br>' +
                        '</div></center>';
                    
                    // Добавляем HTML в контейнер
                    $('.main').append(offerHtml);
                }
                // Создаем кнопки для навигации по страницам
                createPaginationSort(res.totalPages);
            },
            error: function() {
                console.error('Ошибка при загрузке предложений');
            }
        });
    }
    function createPaginationSort(totalPages) {
        $('.paginator').empty(); // Очищаем контейнер для пагинации
        for (let i = 1; i <= totalPages; i++) {
            let pageButton = $('<button>').text(i).addClass('page-button');
            if (i === currentPage) {
                pageButton.prop('disabled', true); // Деактивируем кнопку текущей страницы
            }
            pageButton.on('click', function() {
                currentPage = i; // Устанавливаем текущую страницу
                loadOffersSortName(currentPage); // Загружаем предложения для текущей страницы
            });
            $('.paginator').append(pageButton); // Добавляем кнопку на страницу
        }
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
                    let offerHtml = '<center><div class="offer" id="' + offersArray[i].ID + '_offer">' +
                        '<span> ID - ' + offersArray[i].ID + '</span>' +
                        '<span class="' + offersArray[i].ID + 'offername"> Name - ' + offersArray[i].OfferName + '</span>' +
                        '<span class="' + offersArray[i].ID + 'email"> Email - ' + offersArray[i].Email + '</span>' +
                        '<span class="' + offersArray[i].ID + 'number"> Number - ' + offersArray[i].PhoneNumber + '</span>' +
                        '<span class="' + offersArray[i].ID + 'date"> Date - ' + offersArray[i].CreationDate + '</span>' +
                        '<button id="' + offersArray[i].ID + '_delete" class="delete">Удалить</button>' +
                        '<button id="' + offersArray[i].ID + '_edit" class="edit">Редактировать</button>' +
                        '<br>' +
                        '</div></center>';
                    
                    // Добавляем HTML в контейнер
                    $('.main').append(offerHtml);
                }
                // Создаем кнопки для навигации по страницам
                createPaginationSortID(res.totalPages);
            },
            error: function() {
                console.error('Ошибка при загрузке предложений');
            }
        });
    }
    function createPaginationSortID(totalPages) {
        $('.paginator').empty(); // Очищаем контейнер для пагинации
        for (let i = 1; i <= totalPages; i++) {
            let pageButton = $('<button>').text(i).addClass('page-button');
            if (i === currentPage) {
                pageButton.prop('disabled', true); // Деактивируем кнопку текущей страницы
            }
            pageButton.on('click', function() {
                currentPage = i; // Устанавливаем текущую страницу
                loadOffersSortID(currentPage); // Загружаем предложения для текущей страницы
            });
            $('.paginator').append(pageButton); // Добавляем кнопку на страницу
        }
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

    // Изменяем данные в БД и на странице
    $('#edit').on('click', function() {
        let point = 0;
        if ($('#edit_name').val() != '') {
            point = point + 1;
            $('#edit_name').addClass('black');
            $('#name').removeClass('red');
        }
        else {
            $('#edit_name').addClass('red');
            $('#edit_name').removeClass('black');
            $('#edit_name').attr('placeholder', 'Enter the name');
        }
        if ($('#edit_email').val() != '') {
            point = point + 1;
            $('#edit_email').addClass('black');
            $('#edit_email').removeClass('red');
        }
        else {
            $('#edit_email').addClass('red');
            $('#edit_email').removeClass('black');
            $('#edit_email').attr('placeholder', 'Enter the email');
        }
        if ($('#edit_phone').val() != '') {
            point = point + 1;
            $('#edit_phone').addClass('black');
            $('#phone').removeClass('red');
        }
        else {
            $('#edit_phone').addClass('red');
            $('#edit_phone').removeClass('black');
            $('#edit_phone').attr('placeholder', 'Enter the phone');
        }
        if ($('#edit_date').val() != '') {
            point = point + 1;
            $('#edit_date').addClass('black');
            $('#edit_date').removeClass('red');
        }
        else {
            $('#edit_date').addClass('red');
            $('#edit_date').removeClass('black');
            $('#edit_date').attr('placeholder', 'Enter the date');
        }
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
        let point = 0;
        if ($('#name').val() != '') {
            point = point + 1;
            $('#name').addClass('black');
            $('#name').removeClass('red');
        }
        else {
            $('#name').addClass('red');
            $('#name').removeClass('black');
            $('#name').attr('placeholder', 'Enter the name');
        }
        if ($('#email').val() != '') {
            point = point + 1;
            $('#email').addClass('black');
            $('#email').removeClass('red');
        }
        else {
            $('#email').addClass('red');
            $('#email').removeClass('black');
            $('#email').attr('placeholder', 'Enter the email');
        }
        if ($('#phone').val() != '') {
            point = point + 1;
            $('#phone').addClass('black');
            $('#phone').removeClass('red');
        }
        else {
            $('#phone').addClass('red');
            $('#phone').removeClass('black');
            $('#phone').attr('placeholder', 'Enter the phone');
        }
        console.log(point);
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
                    let offerHtml = '<center><div class="offer" id="' + res[0].ID + '_offer">' +
                            '<span> ID - ' + res[0].ID + '</span>' +
                            '<span class="' + res[0].ID + 'offername"> Name - ' + res[0].OfferName + '</span>' +
                            '<span class="' + res[0].ID + 'email"> Email - ' + res[0].Email + '</span>' +
                            '<span class="' + res[0].ID + 'number"> Number - ' + res[0].PhoneNumber + '</span>' +
                            '<span class="' + res[0].ID + 'date"> Date - ' + res[0].CreationDate + '</span>' +
                            '<button id="' + res[0].ID + '_delete" class="delete">Удалить</button>' +
                            '<button id="' + res[0].ID + '_edit" class="edit">Редактировать</button>' +
                            '<br>' +
                            '</div></center>';
                        
                        // Добавляем HTML в контейнер
                        $('.main').append(offerHtml);
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