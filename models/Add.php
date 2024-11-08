<?php

namespace app\models;
use Yii;
use yii\base\Model;

use yii\db\ActiveRecord;

class Add extends ActiveRecord {

    public static function tableName(){
        return 'offers';
    }

    // public static function rules() {

    //     return [

    //         [['name', 'email'], 'required'], // Добавляем created_at в обязательные поля
    //         [['email'], 'email'],

    //     ];

    // }
    public static function addOffer($offerName, $email, $phone, $createdDate)
    {

        $sql = "INSERT INTO offers (`OfferName`, `Email`, `PhoneNumber`, `CreationDate`) VALUES ('$offerName', '$email', '$phone', '$createdDate')";
        $command = Yii::$app->db->createCommand($sql)->execute(); // Исполнение запроса добавления в БД нового оффера

        $select = Yii::$app->db->createCommand("SELECT * FROM offers WHERE `ID` = (SELECT MAX(`ID`) FROM offers)") // Выборка созданного оффера
        ->queryAll();;
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return $select;
    }


}

?>