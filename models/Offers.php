<?php

namespace app\models;

use yii\db\ActiveRecord;

class Offers extends ActiveRecord {

    public static function getOffers() {

        $offers = self::find();

        return $offers;

    }

}

?>