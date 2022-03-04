<?php
    require_once("./config/config.php");

    $id = $_POST['id'];
    $is_active = $_POST['is_active'];

    try {
        $pdo = new PDO(dsn, user, ps);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE users SET is_active = :is_active WHERE id = :id";
        $prepareUpdate = $pdo->prepare($sql);
        $prepareUpdate->bindParam(":is_active", $is_active, PDO::PARAM_BOOL);
        $prepareUpdate->bindParam(":id", $id, PDO::PARAM_INT);
        $prepareUpdate->execute();
    } catch (PDOException $e) {
        exit($e->getMessage());
    } finally {
        $pdo = null;
    }
?>