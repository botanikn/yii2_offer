-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 07 2024 г., 22:22
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `offers`
--

-- --------------------------------------------------------

--
-- Структура таблицы `offers`
--

CREATE TABLE `offers` (
  `ID` int(11) NOT NULL,
  `OfferName` text NOT NULL,
  `Email` text NOT NULL,
  `PhoneNumber` bigint(14) NOT NULL,
  `CreationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `offers`
--

INSERT INTO `offers` (`ID`, `OfferName`, `Email`, `PhoneNumber`, `CreationDate`) VALUES
(3, 'Super Tech Discount', 'techdeals@innovate.com', 36481012020, '2024-11-04'),
(6, 'Smart Home', 'smarthome@futuretech.com', 63848265408, '2024-11-01'),
(7, 'Exclusive Fashion Trends', 'fashion.trends@stylish.com', 52836498264, '2024-11-06'),
(8, 'Fitness for Everyone', 'fitnessforall@active.com', 12492937538, '2024-11-05'),
(9, 'Educational Courses', 'learnmore@eduspark.com', 53842839475, '2024-11-03'),
(10, 'Adventure Awaits', 'adventure.awaits@explore.com', 15551112222, '2023-10-01'),
(11, 'Luxury Spa Retreat', 'luxury.spa@relax.com', 15552223333, '2023-10-02'),
(12, 'Tech Gadget Extravaganza', 'tech.gadgets@innovate.com', 15553334444, '2023-10-03'),
(14, 'Creative Writing Workshops', 'creative.writing@inspire.com', 15555556666, '2023-10-05'),
(15, 'Organic Gardening Essentials', 'organic.gardening@nature.com', 15556667777, '2023-10-06'),
(16, 'Personal Finance Mastery', 'finance.mastery@wealth.com', 15557778888, '2023-10-07'),
(17, 'DIY Home Improvement', 'diy.home@fixit.com', 15558889999, '2023-10-08'),
(18, 'Mindfulness and Meditation', 'mindfulness@wellbeing.com', 15559990101, '2023-10-09'),
(19, 'Travel Photography Tips', 'travel.photography@capture.com', 15550101213, '2023-10-10'),
(20, 'Fashionable Accessories', 'stylish.accessories@trendy.com', 15551212324, '2023-10-11'),
(21, 'Pet Care Essentials', 'pet.care@furryfriends.com', 15552323435, '2023-10-12'),
(22, 'Digital Marketing Strategies', 'digital.marketing@promote.com', 15553434546, '2023-10-13'),
(23, 'Home Cooking Made Easy', 'easy.cooking@kitchen.com', 15554545657, '2023-10-14'),
(34, 'Юсеф Алассар', 'horizon_dawn@mail.ru', 89533482289, '2024-11-07'),
(40, 'Юсеф Алассар', 'german_string@mail.ru', 89533482289, '2024-11-07'),
(41, 'Юсеф Алассар', 'viktala@mail.ru', 89533482289, '2024-11-07');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Email` (`Email`(1024)) USING HASH;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `offers`
--
ALTER TABLE `offers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
