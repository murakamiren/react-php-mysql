<?php
    header('Access-Control-Allow-Origin: *');

    $dsn = "mysql:host=mysql;dbname=react-php;charset=utf8";
    $user = "root";
    $ps = "pass";

    try {
        $pdo = new PDO($dsn, $user, $ps);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM users";
        $prepareFetch = $pdo->prepare($sql);
        $prepareFetch->execute();

        $data = $prepareFetch->fetchAll(PDO::FETCH_ASSOC);

        // var_dump($data);

        $json = json_encode($data);
        echo $json;

    } catch (PDOException $e) {
        exit($e->getMessage());
    } finally {
        $pdo = null;
    }
?>