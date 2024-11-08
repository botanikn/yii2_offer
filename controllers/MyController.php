<?php

namespace app\controllers;

use yii\web\Controller;
use app\models\Edit;
use app\models\Offers;
use app\models\Add;
use app\models\Filtre;
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

    // Метод для удаления оффера
    public function actionDelete() {
        
        $id = $_GET['id'];

        $offer = Offers::findOne($id);

        if ($offer !== null) {
            $offer->delete();
        }
        
    }

    // Метод для изменения оффера
    public function actionEdit() {

        $id = $_GET['id'];
        $offerName = $_GET['name'];
        $email = $_GET['email'];
        $phone = $_GET['phone'];
        $createdDate = $_GET['date'];

        $offer = new Edit();

        $getoffers = $offer->updateOffer($id, $offerName, $email, $phone, $createdDate);

        // $offer = Offers::findOne($id); // Выборка нужного оффера

        // $sql = "UPDATE offers SET `OfferName` = '$offerName', `Email` = '$email', `PhoneNumber` = '$phone', `CreationDate` = '$createdDate' 
        //         WHERE `ID` = $id";
        // $command = Yii::$app->db->createCommand($sql)->execute(); // Изменение оффера
        
    }

    // Метод для создания оффера
    public function actionAdd() {
        
        if (Yii::$app->request->isPost) {

            $offerName = $_POST['name'];
            $email = $_POST['email'];
            $phone= $_POST['phone'];

            $createdDate = date('Y-m-d'); // Переменная с текущей датой
            
            $offer = new Add();
            $getoffers = $offer->addOffer($offerName, $email, $phone, $createdDate);

            return $getoffers;
        }
    }

    // Метод для фильтрации офферов
    public function actionFiltre() {
        
        $par = $_GET['par'];
        $value = $_GET['value'];
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1; // Текущая страница
        $limit = 10; // Количество элементов на странице
        $offset = ($page - 1) * $limit; // Смещение для запроса
        
        $offer_std = new Filtre();

        $offers = $offer_std->filtreOffer($par, $value, $limit, $offset);
        $totalCount = $offer_std->countOffer($par, $value);

        // Формируем ответ в json формате
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        return [
            'offers' => $offers,
            'totalCount' => $totalCount,
            'totalPages' => ceil($totalCount / $limit),
            'currentPage' => $page,
        ];

    }

}

?>