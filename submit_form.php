<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "STUDENT_DETAILS";

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed!"]);
    exit;
}

function clean($data) {
    return htmlspecialchars(trim($data));
}

// Collect POST data
$name = clean($_POST["name"]);
$mobile = clean($_POST["mobile"]);
$email = clean($_POST["email"]);
$dob = clean($_POST["dob"]);
$gender = clean($_POST["gender"]);
$address = clean($_POST["address"]);
$parent_name = clean($_POST["parent_name"]);
$parent_mobile = clean($_POST["parent_mobile"]);
$college_name = clean($_POST["college_name"]);
$degree = clean($_POST["degree"]);
$stream_degree = clean($_POST["stream_degree"]);
$passing_year = clean($_POST["passing_year"]);
$cgpa = clean($_POST["cgpa"]);
$course_name = clean($_POST["course_name"]);
$course_mode = clean($_POST["course_mode"]);
$experience_status = clean($_POST["experience_status"]);
$experience_year = isset($_POST["experience_year"]) ? clean($_POST["experience_year"]) : "";
$company_name = isset($_POST["company_name"]) ? clean($_POST["company_name"]) : "";
$designation = isset($_POST["designation"]) ? clean($_POST["designation"]) : "";

// Resume upload
$resumePath = "";
if (isset($_FILES["resume"]) && $_FILES["resume"]["error"] === 0) {
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $fileName = time() . "_" . basename($_FILES["resume"]["name"]);
    $resumePath = $uploadDir . $fileName;
    move_uploaded_file($_FILES["resume"]["tmp_name"], $resumePath);
}

// Check for duplicate mobile or email
$checkQuery = "SELECT id FROM admissions WHERE mobile = '$mobile' OR email = '$email'";
$result = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["status" => "duplicate", "message" => "You have already submitted the form with this Mobile or Email."]);
    exit;
}

// Insert Data
$sql = "INSERT INTO admissions (
    sname, mobile, email, dob, gender, address, parent_name, parent_mobile,
    college_name, degree, stream_degree, passing_year, cgpa,
    course_name, course_mode, experience_status, experience_year,
    company_name, designation, resume
) VALUES (
    '$name', '$mobile', '$email', '$dob', '$gender', '$address', '$parent_name', '$parent_mobile',
    '$college_name', '$degree', '$stream_degree', '$passing_year', '$cgpa',
    '$course_name', '$course_mode', '$experience_status', '$experience_year',
    '$company_name', '$designation', '$resumePath'
)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success", "message" => "Form submitted successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error saving data."]);
}

mysqli_close($conn);
?>
