<?php

namespace app\models;
use Yii;
use yii\base\Model;

use yii\db\ActiveRecord;

class Edit extends ActiveRecord {

    public static function tableName(){
        return 'offers';
    }

    // public static function rules() {

    //     return [

    //         [['name', 'email'], 'required'], // Добавляем created_at в обязательные поля
    //         [['email'], 'email'],

    //     ];

    // }
    public static function updateOffer($id, $offerName, $email, $phone, $createdDate)
    {
        
        $sql = "UPDATE offers SET `OfferName` = '$offerName', `Email` = '$email', `PhoneNumber` = '$phone', `CreationDate` = '$createdDate' 
                WHERE `ID` = $id";
        $command = Yii::$app->db->createCommand($sql);
        
        return $command->execute();
    }

}

?>