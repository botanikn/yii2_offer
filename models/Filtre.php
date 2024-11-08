<?php

namespace app\models;
use Yii;
use yii\base\Model;

use yii\db\ActiveRecord;

class Filtre extends ActiveRecord {

    public static function tableName(){
        return 'offers';
    }

    // public static function rules() {

    //     return [

    //         [['name', 'email'], 'required'], // Добавляем created_at в обязательные поля
    //         [['email'], 'email'],

    //     ];

    // }
    public static function filtreOffer($par, $value, $limit, $offset)
    {

        $offers = Yii::$app->db->createCommand("SELECT * FROM offers WHERE `$par` LIKE :value LIMIT :limit OFFSET :offset")
            ->bindValue(':value', "%$value%")
            ->bindValue(':limit', $limit)
            ->bindValue(':offset', $offset)
            ->queryAll();

        return $offers;

    }

    public static function countOffer($par, $value)
    {

        // Получаем общее количество предложений для расчета количества страниц
        $totalCount = Yii::$app->db->createCommand("SELECT COUNT(*) FROM offers WHERE `$par` LIKE :value")
            ->bindValue(':value', "%$value%")
            ->queryScalar();
    }


}

?>