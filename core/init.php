<?php
require_once 'vendor/autoload.php';
require_once 'core/config.php';
require_once 'classes/customksamsok.php';
require_once 'classes/db.php';
require_once 'classes/user.php';

$KSamsok = new customKSamsok($kSamsokApiKey);

$db = new db;
