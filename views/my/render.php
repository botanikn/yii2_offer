<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <center><h1 id="title">OFFERS</h1></center>
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
            <h2>Enter the changes</h2>
                <div class="need_grid">
                    <span class="first_span">Offer Name:</span>
                    <span class="second_span">Email:</span>
                    <span class="third_span">Phone:</span>
                    <span class="fourth_span">Date:</span>
                    <input type="text" id="edit_name" class="first_input" required><br><br>
                    <input type="email" id="edit_email" class="second_input" required><br><br>
                    <input type="phone" id="edit_phone" class="third_input" required><br><br>
                    <input type="date" id="edit_date" class="fourth_input" required><br><br>
                </div>
                <button class="form_button send_buttons" id="edit">Отправить</button>
                <button type="button" id="editclosePopup" class="form_button send_buttons">Закрыть</button>
        </div>

        <div id="popup">
            <h2>Offer creation</h2>
                <div class="need_grid">
                    <span class="first_span">Offer Name:</span>
                    <input type="text" id="name" class="first_input" required><br><br>
                    <span class="second_span">Email:</span>
                    <input type="email" id="email" class="second_input" required><br><br>
                    <span class="third_span">Phone:</span>
                    <input type="phone" id="phone" class="third_input" required><br><br>
                </div>
                <button class="form_button send_buttons" id="post">Отправить</button>
                <button type="button" id="closePopup" class="form_button send_buttons">Закрыть</button>
        </div>
        <div id="success">
            <h1>Query is successful!</h1>
        </div>
        
    </center>
</body>
</html>