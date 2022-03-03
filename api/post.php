<?php

require_once("./config/config.php");

$name = $_POST['name'];
$age = $_POST['age'];

try {
    $pdo = new PDO(dsn, user, ps);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO users (name, age) VALUES (:name, :age)";
    $prepareFetch = $pdo->prepare($sql);
    $prepareFetch->bindParam(':name', $name, PDO::PARAM_STR);
    $prepareFetch->bindParam(':age', $age, PDO::PARAM_INT);
    $prepareFetch->execute();

} catch (PDOException $e) {
    exit($e->getMessage());
} finally {
    $pdo = null;
}
