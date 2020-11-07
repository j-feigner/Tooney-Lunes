<?php
echo "Welcome to Tooney Lunes. ";
echo "If you're seeing this message our server is working. ";

echo "Here is a test query of our database...<br><br>";

$servername = "tuuney";
$username = "root";
$password = "";
$dbname = "tuuneyDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username, email, song_title 
          FROM Users, Song
         WHERE Users.user_id = Song.user_id;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo " - Username: " . $row["username"].
         " - Email: " . $row["email"]. 
         " - Song: " . $row["song_title"].
         "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>