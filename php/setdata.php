<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Sensor_Data";

//fetch table rows from mysql db
$datetime = $_GET["datetime"];
$air_temperature = $_GET["air_temperature"];
$air_moisture = $_GET["air_moisture"];
$soil_moisture = $_GET["soil_moisture"];
$plant_height = $_GET["plant_height"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Data (datetime, air_temperature, air_moisture, soil_moisture, plant_height) 
VALUES ('$datetime', '$air_temperature', '$air_moisture', '$soil_moisture', '$plant_height')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>