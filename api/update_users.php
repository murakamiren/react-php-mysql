<?php
    require_once("./config/config.php");

    $id = $_POST['id'];
    $name = $_POST['name'];
    $age = $_POST['age'];

    try {
        $pdo = new PDO(dsn, user, ps);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE users SET name = :name, age = :age WHERE id = :id";
        $prepareUpdate = $pdo->prepare($sql);
        $prepareUpdate->bindParam(":name", $name, PDO::PARAM_STR);
        $prepareUpdate->bindParam(":age", $age, PDO::PARAM_INT);
        $prepareUpdate->bindParam(":id", $id, PDO::PARAM_INT);
        $prepareUpdate->execute();
    } catch (PDOException $e) {
        exit($e->getMessage());
    } finally {
        $pdo = null;
    }
?>