<?php 
if (isset($_GET['sleep'])) sleep($_GET['sleep']);
if (isset($_GET['num'])) echo 'requested: '.$_GET['num'];
if (isset($_POST['sleep'])) sleep($_POST['sleep']);
if (isset($_POST['num'])) echo 'requested: '.$_POST['num'];
else echo 'ajax request successful';