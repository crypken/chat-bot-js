<?php

function omega_check_and_create_table() {
	global $wpdb;

	$table_name = $wpdb->prefix . '_omega_chat';
	
	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		orgId tinytext NOT NULL,
		PRIMARY KEY  (id)
	) $charset_collate;";

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( $sql );

	// add_option( 'jal_db_version', $jal_db_version );
  omega_crud_operation();
}

function omega_crud_operation() {
	global $wpdb;
	
	$table_name = $wpdb->prefix . '_omega_chat';

  //CHECK ALREADY EXISTS
  $result = $wpdb->get_results("SELECT * FROM $table_name" );
  $current_time = current_time( 'mysql' );
  if ($wpdb->num_rows > 0){
    $rowId=1;
    // UPDATE ORG ID
    $wpdb->query( $wpdb->prepare("UPDATE $table_name SET orgId = '".$_POST['orgId']."', time = '".$current_time."'  WHERE id ='".$rowId."' "));
  }else{
    //  CREATE ORG ID
    $wpdb->insert( $table_name, 
      array( 
        'time' => $current_time, 
        'orgId' => $_POST['orgId']
      ) 
    );
  }
}

if(isset($_POST['submit'])){
  if($_POST['orgId']!=""){
    omega_check_and_create_table();
  }else{
    echo "<p style='color:red'>Please enter valid org ID </p>";
  } 
}

  global $wpdb;
  $table_name = $wpdb->prefix . '_omega_chat';
  //CHECK ALREADY EXISTS
  $result = $wpdb->get_results("SELECT * FROM $table_name" );
  $orgId=$result[0]->orgId;
?>
<style>

body {
  background-color: #e0e4e7;
}

h1 {
  color: #101010;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 14px;
}

.omagea-center {
  text-align: center;
  /* margin-top: 200px; */
  margin: 150px;
  margin-top: 50px;
}
input.omega-button {
    background: #0c578f;
    color: #fff;
    padding: 8px 27px;
    font-size: 15px;
    border: 1px solid #0a0a0a;
    border-radius: 5px;
}
input.omega-button:hover {
    background: #116702;
    color: #fff;
    padding: 8px 27px;
    font-size: 15px;
    border: 1px solid #0a0a0a;
    border-radius: 5px;
}
input.form-control {
    padding: 5px;
    min-width: 211px;
    border: 1px solid #004eff;
}
.omagea-chat {
    border: 2px solid green;
    padding: 50px;
    background: white;
    border-radius: 20px;
}
label.label {
    font-size: 20px;
    color: #0819fd;
}
</style>
<div class="omagea-center">
  <h1>Welcome to your Chatbot Integration</h1>
  <p>Your website can become even more valuable and more powerful when there is a chatbot. An advanced bot empowers businesses with artificial intelligence (AI) and machine learning (ML) capabilities. With a website chatbot, you can serve visitors with quick answers and personalized responses. You stay available all the time and generate leads with quality and constant support.</p>
  
  <div class="omagea-chat">
  <label class="label">Please paste copied organisation ID</label>  
  <br />
  <br />
  <form action="<?php the_permalink(); ?>" method="post">    
      <input class='form-control' type="text" value="<?php echo $orgId; ?>" name="orgId">
      <input type="submit" class='omega-button' name="submit">
  </form>
  </div>
</div>
