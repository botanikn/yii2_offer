<?php

namespace app\models;

use yii\db\ActiveRecord;

class Offers extends ActiveRecord {

    public static function tableName(){
        return 'offers';
    }

    // public static function rules() {

    //     return [

    //         [['name', 'email'], 'required'], // Добавляем created_at в обязательные поля
    //         [['email'], 'email'],

    //     ];

    // }
    public static function createOffer($offerName, $email, $phone)
    {
        $createdDate = date('Y-m-d');
        
        $sql = "INSERT INTO offers (`OfferName`, `Email`, `PhoneNumber`, `CreationDate`) VALUES ('$offerName', '$email', '$phone', '$createdDate')";
        $command = Yii::$app->db->createCommand($sql);
        
        return $command->execute();
    }

}

?>