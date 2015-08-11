<?php
require_once 'core/init.php';
if (user::authorized(false)) {
  #TODO put user feed here
} else {
  include 'includes/landing.php';
}
