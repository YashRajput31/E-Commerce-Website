-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2026 at 07:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopverse_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add product', 1, 'add_product'),
(2, 'Can change product', 1, 'change_product'),
(3, 'Can delete product', 1, 'delete_product'),
(4, 'Can view product', 1, 'view_product'),
(5, 'Can add auth token', 2, 'add_authtoken'),
(6, 'Can change auth token', 2, 'change_authtoken'),
(7, 'Can delete auth token', 2, 'delete_authtoken'),
(8, 'Can view auth token', 2, 'view_authtoken'),
(9, 'Can add order', 3, 'add_order'),
(10, 'Can change order', 3, 'change_order'),
(11, 'Can delete order', 3, 'delete_order'),
(12, 'Can view order', 3, 'view_order'),
(13, 'Can add profile', 4, 'add_profile'),
(14, 'Can change profile', 4, 'change_profile'),
(15, 'Can delete profile', 4, 'delete_profile'),
(16, 'Can view profile', 4, 'view_profile'),
(17, 'Can add cart item', 5, 'add_cartitem'),
(18, 'Can change cart item', 5, 'change_cartitem'),
(19, 'Can delete cart item', 5, 'delete_cartitem'),
(20, 'Can view cart item', 5, 'view_cartitem'),
(21, 'Can add order item', 6, 'add_orderitem'),
(22, 'Can change order item', 6, 'change_orderitem'),
(23, 'Can delete order item', 6, 'delete_orderitem'),
(24, 'Can view order item', 6, 'view_orderitem'),
(25, 'Can add wishlist item', 7, 'add_wishlistitem'),
(26, 'Can change wishlist item', 7, 'change_wishlistitem'),
(27, 'Can delete wishlist item', 7, 'delete_wishlistitem'),
(28, 'Can view wishlist item', 7, 'view_wishlistitem'),
(29, 'Can add log entry', 8, 'add_logentry'),
(30, 'Can change log entry', 8, 'change_logentry'),
(31, 'Can delete log entry', 8, 'delete_logentry'),
(32, 'Can view log entry', 8, 'view_logentry'),
(33, 'Can add permission', 9, 'add_permission'),
(34, 'Can change permission', 9, 'change_permission'),
(35, 'Can delete permission', 9, 'delete_permission'),
(36, 'Can view permission', 9, 'view_permission'),
(37, 'Can add group', 10, 'add_group'),
(38, 'Can change group', 10, 'change_group'),
(39, 'Can delete group', 10, 'delete_group'),
(40, 'Can view group', 10, 'view_group'),
(41, 'Can add user', 11, 'add_user'),
(42, 'Can change user', 11, 'change_user'),
(43, 'Can delete user', 11, 'delete_user'),
(44, 'Can view user', 11, 'view_user'),
(45, 'Can add content type', 12, 'add_contenttype'),
(46, 'Can change content type', 12, 'change_contenttype'),
(47, 'Can delete content type', 12, 'delete_contenttype'),
(48, 'Can view content type', 12, 'view_contenttype'),
(49, 'Can add session', 13, 'add_session'),
(50, 'Can change session', 13, 'change_session'),
(51, 'Can delete session', 13, 'delete_session'),
(52, 'Can view session', 13, 'view_session');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$aG3pkrdOtV9WQuEnImxye7$8BSyyaz63vFksEWeo6lLnpyDW3ZekDQd3r7VgbH7hmc=', '2026-07-03 16:52:36.126316', 1, 'admin@shopverse.com', 'Admin', '', 'admin@shopverse.com', 1, 1, '2026-07-03 16:51:30.103080'),
(3, 'pbkdf2_sha256$600000$80mGSWVC3BSLbhfUeiAGII$p18uC1pf+iE52e/Z6pOZsumnGBqvblqIqv9qu71bE7w=', NULL, 0, 'order_test@example.com', 'Order Test', '', 'order_test@example.com', 0, 1, '2026-07-03 17:12:02.040772');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(8, 'admin', 'logentry'),
(10, 'auth', 'group'),
(9, 'auth', 'permission'),
(11, 'auth', 'user'),
(12, 'contenttypes', 'contenttype'),
(13, 'sessions', 'session'),
(2, 'shop', 'authtoken'),
(5, 'shop', 'cartitem'),
(3, 'shop', 'order'),
(6, 'shop', 'orderitem'),
(1, 'shop', 'product'),
(4, 'shop', 'profile'),
(7, 'shop', 'wishlistitem');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-07-03 16:27:34.525663'),
(2, 'auth', '0001_initial', '2026-07-03 16:27:36.016097'),
(3, 'admin', '0001_initial', '2026-07-03 16:27:36.322998'),
(4, 'admin', '0002_logentry_remove_auto_add', '2026-07-03 16:27:36.354996'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2026-07-03 16:27:36.397730'),
(6, 'contenttypes', '0002_remove_content_type_name', '2026-07-03 16:27:36.601273'),
(7, 'auth', '0002_alter_permission_name_max_length', '2026-07-03 16:27:36.796003'),
(8, 'auth', '0003_alter_user_email_max_length', '2026-07-03 16:27:36.843462'),
(9, 'auth', '0004_alter_user_username_opts', '2026-07-03 16:27:36.871692'),
(10, 'auth', '0005_alter_user_last_login_null', '2026-07-03 16:27:37.000889'),
(11, 'auth', '0006_require_contenttypes_0002', '2026-07-03 16:27:37.009177'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2026-07-03 16:27:37.044600'),
(13, 'auth', '0008_alter_user_username_max_length', '2026-07-03 16:27:37.088930'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2026-07-03 16:27:37.129985'),
(15, 'auth', '0010_alter_group_name_max_length', '2026-07-03 16:27:37.176562'),
(16, 'auth', '0011_update_proxy_permissions', '2026-07-03 16:27:37.206934'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2026-07-03 16:27:37.248272'),
(18, 'sessions', '0001_initial', '2026-07-03 16:27:37.336445'),
(19, 'shop', '0001_initial', '2026-07-03 16:27:39.066998');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('ayv9iu71mz6uyndo879wdi2yool3a9i8', '.eJxVjEEOwiAQRe_C2pAOpUBduu8ZyAwDUjWQlHZlvLtt0oVu33v_v4XHbc1-a3HxM4urAHH5ZYThGcsh-IHlXmWoZV1mkkciT9vkVDm-bmf7d5Cx5X1NKUTdpaS6AYgNjMGOCpOxnBBBk2YTd277QRsyjhxDCj2DsU5BZ0l8vgh3OGA:1wfh80:x2sRXH-KcnvPABOcPiNZHZ_mcaXtD7WSVTlFp3oaeaY', '2026-07-17 16:52:36.134535');

-- --------------------------------------------------------

--
-- Table structure for table `shop_authtoken`
--

CREATE TABLE `shop_authtoken` (
  `id` bigint(20) NOT NULL,
  `key` varchar(64) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shop_authtoken`
--

INSERT INTO `shop_authtoken` (`id`, `key`, `created_at`, `user_id`) VALUES
(1, '2d225e180eec967248acdbc9419fbc3f58eb976c987f4c33419fe839bb6a7097', '2026-07-03 16:58:03.950828', 1),
(3, '38cdfcfd502ec8ac118c1ca103e8707270faaf44c6b382cfc10f11f47249c006', '2026-07-03 17:12:09.793023', 3);

-- --------------------------------------------------------

--
-- Table structure for table `shop_cartitem`
--

CREATE TABLE `shop_cartitem` (
  `id` bigint(20) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL CHECK (`quantity` >= 0),
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_order`
--

CREATE TABLE `shop_order` (
  `id` bigint(20) NOT NULL,
  `order_number` varchar(40) NOT NULL,
  `status` varchar(20) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` longtext NOT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `subtotal` int(10) UNSIGNED NOT NULL CHECK (`subtotal` >= 0),
  `discount` int(10) UNSIGNED NOT NULL CHECK (`discount` >= 0),
  `tax` int(10) UNSIGNED NOT NULL CHECK (`tax` >= 0),
  `shipping` int(10) UNSIGNED NOT NULL CHECK (`shipping` >= 0),
  `total` int(10) UNSIGNED NOT NULL CHECK (`total` >= 0),
  `created_at` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shop_order`
--

INSERT INTO `shop_order` (`id`, `order_number`, `status`, `name`, `email`, `phone`, `address`, `city`, `state`, `pincode`, `payment_method`, `subtotal`, `discount`, `tax`, `shipping`, `total`, `created_at`, `user_id`) VALUES
(1, 'ORD-20260703-D7A1C9', 'Processing', 'Order Test', 'order_test@example.com', '9999999999', 'Test address', 'Surat', 'Gujarat', '395001', 'cod', 5998, 0, 1080, 0, 7078, '2026-07-03 17:12:09.887845', 3);

-- --------------------------------------------------------

--
-- Table structure for table `shop_orderitem`
--

CREATE TABLE `shop_orderitem` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` longtext NOT NULL,
  `price` int(10) UNSIGNED NOT NULL CHECK (`price` >= 0),
  `quantity` int(10) UNSIGNED NOT NULL CHECK (`quantity` >= 0),
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shop_orderitem`
--

INSERT INTO `shop_orderitem` (`id`, `title`, `category`, `image`, `price`, `quantity`, `order_id`, `product_id`) VALUES
(1, 'Wireless Noise-Cancelling Headphones', 'Electronics', 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23A29BFE%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EHeadphones%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 2999, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shop_product`
--

CREATE TABLE `shop_product` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL CHECK (`price` >= 0),
  `original_price` int(10) UNSIGNED DEFAULT NULL CHECK (`original_price` >= 0),
  `rating` decimal(3,1) NOT NULL,
  `review_count` int(10) UNSIGNED NOT NULL CHECK (`review_count` >= 0),
  `image` longtext NOT NULL,
  `description` longtext NOT NULL,
  `badge` varchar(80) NOT NULL,
  `in_stock` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shop_product`
--

INSERT INTO `shop_product` (`id`, `title`, `category`, `price`, `original_price`, `rating`, `review_count`, `image`, `description`, `badge`, `in_stock`, `created_at`, `updated_at`) VALUES
(1, 'Wireless Noise-Cancelling Headphones', 'Electronics', 2999, 5999, 4.5, 1284, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23A29BFE%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EHeadphones%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Wireless Noise-Cancelling Headphones from our Electronics collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Best Seller', 1, '2026-07-03 16:28:18.105547', '2026-07-03 16:28:18.105842'),
(2, 'Smart Watch Pro Ultra', 'Electronics', 4999, 7999, 4.7, 892, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300CEC9%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2355EFC4%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ESmart%20Watch%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Smart Watch Pro Ultra from our Electronics collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'New Launch', 1, '2026-07-03 16:28:18.106145', '2026-07-03 16:28:18.106214'),
(3, 'Portable Bluetooth Speaker', 'Electronics', 1499, 2499, 4.3, 2156, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23FD79A8%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FDCB6E%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ESpeaker%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Portable Bluetooth Speaker from our Electronics collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '40% Off', 1, '2026-07-03 16:28:18.106374', '2026-07-03 16:28:18.106426'),
(4, '4K Ultra HD Webcam', 'Electronics', 3499, 4999, 4.4, 567, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%230984E3%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2374B9FF%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EWebcam%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', '4K Ultra HD Webcam from our Electronics collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.106559', '2026-07-03 16:28:18.106602'),
(5, 'Premium Leather Jacket', 'Fashion', 6999, 12999, 4.8, 423, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%232D3436%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23636E72%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ELeather%20Jacket%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Premium Leather Jacket from our Fashion collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Premium', 1, '2026-07-03 16:28:18.106836', '2026-07-03 16:28:18.106881'),
(6, 'Designer Sneakers - Limited Edition', 'Fashion', 3499, 5999, 4.6, 1847, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23E17055%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FAB1A0%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ESneakers%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Designer Sneakers - Limited Edition from our Fashion collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Limited', 1, '2026-07-03 16:28:18.107034', '2026-07-03 16:28:18.107078'),
(7, 'Classic Aviator Sunglasses', 'Fashion', 1299, 2499, 4.4, 3421, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23FDCB6E%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23F39C12%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ESunglasses%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Classic Aviator Sunglasses from our Fashion collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '48% Off', 1, '2026-07-03 16:28:18.107214', '2026-07-03 16:28:18.107256'),
(8, 'Formal Slim-Fit Shirt', 'Fashion', 1799, 2999, 4.2, 756, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23DFE6E9%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EFormal%20Shirt%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Formal Slim-Fit Shirt from our Fashion collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.107449', '2026-07-03 16:28:18.107493'),
(9, 'Smart LED Desk Lamp', 'Home & Living', 1999, 3499, 4.6, 1123, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300CEC9%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2381ECEC%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EDesk%20Lamp%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Smart LED Desk Lamp from our Home & Living collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Top Rated', 1, '2026-07-03 16:28:18.107623', '2026-07-03 16:28:18.107770'),
(10, 'Bamboo Organizer Set', 'Home & Living', 899, 1499, 4.3, 834, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300B894%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2355EFC4%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EOrganizer%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Bamboo Organizer Set from our Home & Living collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Eco Friendly', 1, '2026-07-03 16:28:18.107906', '2026-07-03 16:28:18.107950'),
(11, 'Luxury Scented Candle Collection', 'Home & Living', 1599, 2499, 4.7, 2098, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23E84393%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FD79A8%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ECandles%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Luxury Scented Candle Collection from our Home & Living collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.108111', '2026-07-03 16:28:18.108159'),
(12, 'Memory Foam Pillow Duo', 'Home & Living', 2499, 3999, 4.5, 1456, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2374B9FF%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23A29BFE%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EPillows%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Memory Foam Pillow Duo from our Home & Living collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '38% Off', 1, '2026-07-03 16:28:18.108315', '2026-07-03 16:28:18.108359'),
(13, 'Yoga Mat - Extra Thick', 'Sports', 1299, 1999, 4.4, 2467, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300CEC9%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EYoga%20Mat%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Yoga Mat - Extra Thick from our Sports collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.108490', '2026-07-03 16:28:18.108532'),
(14, 'Adjustable Dumbbell Set (2-20 kg)', 'Sports', 4499, 6999, 4.8, 678, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23636E72%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%232D3436%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EDumbbells%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Adjustable Dumbbell Set (2-20 kg) from our Sports collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Best Value', 1, '2026-07-03 16:28:18.108821', '2026-07-03 16:28:18.108872'),
(15, 'Running Shoes - UltraBoost', 'Sports', 5499, 8999, 4.6, 3210, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23E17055%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FDCB6E%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ERunning%20Shoes%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Running Shoes - UltraBoost from our Sports collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '39% Off', 1, '2026-07-03 16:28:18.109006', '2026-07-03 16:28:18.109048'),
(16, 'Insulated Water Bottle (1L)', 'Sports', 799, 1299, 4.5, 4532, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%230984E3%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2300CEC9%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EWater%20Bottle%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Insulated Water Bottle (1L) from our Sports collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.109198', '2026-07-03 16:28:18.109241'),
(17, 'Complete Skincare Kit', 'Beauty', 2999, 4999, 4.7, 1567, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23FD79A8%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23A29BFE%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ESkincare%20Kit%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Complete Skincare Kit from our Beauty collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Trending', 1, '2026-07-03 16:28:18.109369', '2026-07-03 16:28:18.109413'),
(18, 'Professional Hair Dryer', 'Beauty', 3499, 5499, 4.5, 921, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23E84393%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FDCB6E%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EHair%20Dryer%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Professional Hair Dryer from our Beauty collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.109538', '2026-07-03 16:28:18.109580'),
(19, 'Luxury Perfume - Midnight Bloom', 'Beauty', 1999, 3999, 4.6, 2341, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FD79A8%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EPerfume%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Luxury Perfume - Midnight Bloom from our Beauty collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '50% Off', 1, '2026-07-03 16:28:18.109839', '2026-07-03 16:28:18.109885'),
(20, 'Electric Facial Cleansing Brush', 'Beauty', 1499, 2499, 4.3, 1876, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300B894%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2355EFC4%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3ECleansing%20Brush%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Electric Facial Cleansing Brush from our Beauty collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 1, '2026-07-03 16:28:18.110013', '2026-07-03 16:28:18.110054'),
(21, 'The Art of Thinking Clearly', 'Books', 399, 599, 4.4, 5678, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%232D3436%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%236C5CE7%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EThinking%20Clearly%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'The Art of Thinking Clearly from our Books collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Bestseller', 1, '2026-07-03 16:28:18.110237', '2026-07-03 16:28:18.110281'),
(22, 'JavaScript: The Definitive Guide', 'Books', 699, 999, 4.7, 3456, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%230984E3%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%2300CEC9%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EJavaScript%20Guide%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'JavaScript: The Definitive Guide from our Books collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', 'Top Pick', 1, '2026-07-03 16:28:18.110411', '2026-07-03 16:28:18.110453'),
(23, 'Atomic Habits', 'Books', 349, 499, 4.9, 12456, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%2300B894%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23FDCB6E%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EAtomic%20Habits%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Atomic Habits from our Books collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '#1 Bestseller', 1, '2026-07-03 16:28:18.110861', '2026-07-03 16:28:18.110936'),
(24, 'Design Patterns: Reusable Solutions', 'Books', 549, 899, 4.5, 2134, 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%0A%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23E84393%3Bstop-opacity%3A1%22%20/%3E%0A%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23A29BFE%3Bstop-opacity%3A1%22%20/%3E%0A%3C/linearGradient%3E%3C/defs%3E%0A%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url%28%23g%29%22%20rx%3D%2212%22/%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22190%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22white%22%20opacity%3D%220.9%22%3EDesign%20Patterns%3C/text%3E%0A%3Ctext%20x%3D%22200%22%20y%3D%22220%22%20text-anchor%3D%22middle%22%20font-family%3D%22Inter%2Csans-serif%22%20font-size%3D%2213%22%20fill%3D%22white%22%20opacity%3D%220.6%22%3EShopVerse%3C/text%3E%0A%3C/svg%3E', 'Design Patterns: Reusable Solutions from our Books collection. A curated ShopVerse product with reliable quality, fair pricing, and fast delivery.', '', 0, '2026-07-03 16:28:18.111080', '2026-07-03 16:28:18.111124');

-- --------------------------------------------------------

--
-- Table structure for table `shop_profile`
--

CREATE TABLE `shop_profile` (
  `id` bigint(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shop_profile`
--

INSERT INTO `shop_profile` (`id`, `phone`, `role`, `user_id`) VALUES
(1, '9999999999', 'admin', 1),
(3, '', 'user', 3);

-- --------------------------------------------------------

--
-- Table structure for table `shop_wishlistitem`
--

CREATE TABLE `shop_wishlistitem` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `shop_authtoken`
--
ALTER TABLE `shop_authtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`),
  ADD KEY `shop_authtoken_user_id_0469732f_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `shop_cartitem`
--
ALTER TABLE `shop_cartitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shop_cartitem_user_id_product_id_379c1c97_uniq` (`user_id`,`product_id`),
  ADD KEY `shop_cartitem_product_id_09e4b7dd_fk_shop_product_id` (`product_id`);

--
-- Indexes for table `shop_order`
--
ALTER TABLE `shop_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `shop_order_user_id_00aba627_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `shop_orderitem`
--
ALTER TABLE `shop_orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_orderitem_order_id_2f1b00cf_fk_shop_order_id` (`order_id`),
  ADD KEY `shop_orderitem_product_id_48153f22_fk_shop_product_id` (`product_id`);

--
-- Indexes for table `shop_product`
--
ALTER TABLE `shop_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_profile`
--
ALTER TABLE `shop_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `shop_wishlistitem`
--
ALTER TABLE `shop_wishlistitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shop_wishlistitem_user_id_product_id_b4f8022a_uniq` (`user_id`,`product_id`),
  ADD KEY `shop_wishlistitem_product_id_fec7c3f7_fk_shop_product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `shop_authtoken`
--
ALTER TABLE `shop_authtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shop_cartitem`
--
ALTER TABLE `shop_cartitem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shop_order`
--
ALTER TABLE `shop_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shop_orderitem`
--
ALTER TABLE `shop_orderitem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shop_product`
--
ALTER TABLE `shop_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `shop_profile`
--
ALTER TABLE `shop_profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shop_wishlistitem`
--
ALTER TABLE `shop_wishlistitem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `shop_authtoken`
--
ALTER TABLE `shop_authtoken`
  ADD CONSTRAINT `shop_authtoken_user_id_0469732f_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `shop_cartitem`
--
ALTER TABLE `shop_cartitem`
  ADD CONSTRAINT `shop_cartitem_product_id_09e4b7dd_fk_shop_product_id` FOREIGN KEY (`product_id`) REFERENCES `shop_product` (`id`),
  ADD CONSTRAINT `shop_cartitem_user_id_5a7eba01_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `shop_order`
--
ALTER TABLE `shop_order`
  ADD CONSTRAINT `shop_order_user_id_00aba627_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `shop_orderitem`
--
ALTER TABLE `shop_orderitem`
  ADD CONSTRAINT `shop_orderitem_order_id_2f1b00cf_fk_shop_order_id` FOREIGN KEY (`order_id`) REFERENCES `shop_order` (`id`),
  ADD CONSTRAINT `shop_orderitem_product_id_48153f22_fk_shop_product_id` FOREIGN KEY (`product_id`) REFERENCES `shop_product` (`id`);

--
-- Constraints for table `shop_profile`
--
ALTER TABLE `shop_profile`
  ADD CONSTRAINT `shop_profile_user_id_251f5ef7_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `shop_wishlistitem`
--
ALTER TABLE `shop_wishlistitem`
  ADD CONSTRAINT `shop_wishlistitem_product_id_fec7c3f7_fk_shop_product_id` FOREIGN KEY (`product_id`) REFERENCES `shop_product` (`id`),
  ADD CONSTRAINT `shop_wishlistitem_user_id_190f012d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
