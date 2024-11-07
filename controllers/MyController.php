<?php

namespace app\controllers;

use yii\web\Controller;
use app\models\Edit;
use app\models\Offers;
use Yii;
use yii\data\Pagination;
use app\controllers\ArrayHelpers;

class MyController extends Controller{

    // Функция для дебага
    public function debug($arr) {
        echo '<pre>' .print_r($arr, true). '</pre>';
    }

    // Метод для первичной отрисовки страницы со всеми офферами
    public function actionRender() {

        // Создание объекта на основе модели Offers и вызов его метода
        $offers = new Offers();
        $getoffers = $offers->getOffers();

        $pag = new Pagination([
            'defaultPageSize' => 10,
            'totalCount' => $getoffers->count()
        ]);

        $getoffers = $getoffers->offset($pag->offset)->limit($pag->limit)->all();

        // Отрисовка view "render" с параметрами из модели
        return $this->render('render', compact('getoffers', 'pag'));
    }

    public function actionDelete() {
        
        $id = $_GET['id'];

        $offer = Offers::findOne($id);

        if ($offer !== null) {
            $offer->delete();
        }
        
    }

    public function actionEdit() {

        $id = $_GET['id'];
        $offerName = $_GET['name'];
        $email = $_GET['email'];
        $phone = $_GET['phone'];
        $createdDate = $_GET['date'];

        $offer = Offers::findOne($id);

        $sql = "UPDATE offers SET `OfferName` = '$offerName', `Email` = '$email', `PhoneNumber` = '$phone', `CreationDate` = '$createdDate' 
                WHERE `ID` = $id";
        $command = Yii::$app->db->createCommand($sql)->execute();
        
    }

    public function actionAdd() {
        
        if (Yii::$app->request->isPost) {

            $offerName = $_POST['name'];
            $email = $_POST['email'];
            $phone= $_POST['phone'];

            $createdDate = date('Y-m-d');
            $sql = "INSERT INTO offers (`OfferName`, `Email`, `PhoneNumber`, `CreationDate`) VALUES ('$offerName', '$email', '$phone', '$createdDate')";
            $command = Yii::$app->db->createCommand($sql)->execute();

            $select = Yii::$app->db->createCommand("SELECT * FROM offers WHERE `ID` = (SELECT MAX(`ID`) FROM offers)")
            ->queryAll();;
            Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return $select;
        }
    }

    public function actionFiltre() {
        
        $par = $_GET['par'];
        $value = $_GET['value'];
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1; // Текущая страница
        $limit = 10; // Количество элементов на странице
        $offset = ($page - 1) * $limit; // Смещение для запроса
        $offers = Yii::$app->db->createCommand("SELECT * FROM offers WHERE `$par` LIKE :value LIMIT :limit OFFSET :offset")
            ->bindValue(':value', "%$value%")
            ->bindValue(':limit', $limit)
            ->bindValue(':offset', $offset)
            ->queryAll();
        // Получаем общее количество предложений для расчета количества страниц
        $totalCount = Yii::$app->db->createCommand("SELECT COUNT(*) FROM offers WHERE `$par` LIKE :value")
            ->bindValue(':value', "%$value%")
            ->queryScalar();
        // Устанавливаем заголовок ответа как JSON и возвращаем массив с предложениями и общей информацией
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'offers' => $offers,
            'totalCount' => $totalCount,
            'totalPages' => ceil($totalCount / $limit),
            'currentPage' => $page,
        ];

        // $par = $_GET['par'];
        // $value = $_GET['value'];

        // $offers = Yii::$app->db->createCommand("SELECT * FROM offers WHERE `$par` LIKE '%$value%'")->queryAll();
        // Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        // return $offers;
    }

    public function actionIndex() {

        $hello = 'Hello';
        $names = ['Ivanov', 'Letov', 'Lenin'];
        // return $this->render('index', ['hello' => $hello, 'names' => $names]);
        return $this->render('index', compact('hello', 'names'));

    }

}

?>