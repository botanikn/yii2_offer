<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <center><h1>Offers</h1></center>
    <div class="all">
        <div class="left">
            <div class="head">
                <div id="search">
                    <select name="choice" id="par">
                        <option value="OfferName">Offer name</option>
                        <option value="Email">Email</option>
                    </select>
                    <input type="text" id="search_value">
                    <button id="search_button">Search</button>
                </div>
                <div class="sort">
                    <button id="id_sort">ID Sort</button>
                    <button id="name_sort">Name Sort</button>
                </div>
            </div>
            <div class="main">
                
                <?php

                use yii\widgets\LinkPager;

                foreach ($getoffers as $of) {
                    echo '<center><div class="offer" id="' .$of->ID. '_offer">';
                        echo '<span> ID - '. $of->ID. '</span>';
                        echo '<span class="'.$of->ID.'offername"> Name - '. $of->OfferName. '</span>';
                        echo '<span class="'.$of->ID.'email"> Email - '. $of->Email. '</span>';
                        echo '<span class="'.$of->ID.'number"> Number - '. $of->PhoneNumber. '</span>';
                        echo '<span class="'.$of->ID.'date"> Date - '. $of->CreationDate. '</span>';
                        echo '<button id="' .$of->ID. '_delete" class="delete">Удалить</button>';
                        echo '<button id="' .$of->ID. '_edit" class="edit">Редактировать</button>';
                        echo '<br>';
                    echo "</div></center>";
                }

                ?>
                
            </div>
        </div>
        <div class="right">
            <button class="create">Create an offer</buttom>
        </div>
    </div>
    <center>
        <div class="bottom">
            <div class="paginator">
                <?php
                echo LinkPager::widget(['pagination' => $pag]);
                ?>
            </div>
        </div>


        <div id="overlay"></div>

        <div id="edit_popup">
            <h2>Измените данные</h2>
                <label for="edit_name">Offer Name:</label>
                <input type="text" id="edit_name" required><br><br>
                <label for="edit_email">Email:</label>
                <input type="email" id="edit_email" required><br><br>
                <label for="edit_phone">Phone:</label>
                <input type="phone" id="edit_phone" required><br><br>
                <label for="edit_date">Date:</label>
                <input type="date" id="edit_date" required><br><br>
                <button class="form_button" id="edit">Отправить</button>
                <button type="button" id="editclosePopup" class="form_button">Закрыть</button>
        </div>

        <div id="popup">
            <h2>Введите данные</h2>
                <label for="name">Offer Name:</label>
                <input type="text" id="name" required><br><br>
                <label for="email">Email:</label>
                <input type="email" id="email" required><br><br>
                <label for="email">Phone:</label>
                <input type="phone" id="phone" required><br><br>
                <button class="form_button" id="post">Отправить</button>
                <button type="button" id="closePopup" class="form_button">Закрыть</button>
        </div>
        <div id="success">
            <h1>Query is successful!</h1>
            <button>Close</button>
        </div>
        
    </center>
</body>
</html>