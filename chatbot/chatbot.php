<?php
/*
 * Plugin Name:       Omega Chatbot
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       A chatbot is an automated conversational AI that pretends to be human and carries out programmed tasks based on specific triggers, responding through a web or mobile app.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            VELLIESWARAN R
 * Author URI:        https://author.example.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       omega-chatbot
 * Domain Path:       /languages
 */

function wpb_follow_us($content) {
 
    // Only do this when a single post is displayed
    if ( is_single() ) { 
     
    // Message you want to display after the post
    // Add URLs to your own Twitter and Facebook profiles
     
    $content .= '<p class="follow-us">If you liked this article, then please follow us on <a href="http://twitter.com/wpbeginner" title="WPBeginner on Twitter" target="_blank" rel="nofollow">Twitter</a> and <a href="https://www.facebook.com/wpbeginner" title="WPBeginner on Facebook" target="_blank" rel="nofollow">Facebook</a>.</p>';
     
    } 
    // Return the content
    return $content;     
}

// Hook our function to WordPress the_content filter
add_filter('the_content', 'wpb_follow_us'); 

function wpcom_javascript() { 
  global $wpdb;
  $table_name = $wpdb->prefix . '_omega_chat';

  //CHECK ALREADY EXISTS
  $result = $wpdb->get_results("SELECT * FROM $table_name" );
  $orgId=$result[0]->orgId;
  
  ?>
    <script type="text/javascript">
      const orgId="<?php echo $orgId; ?>";
      (function(d, m){
          var chatbotConfig ={"appId":orgId,env:"production","popupWidget":true,"automaticChatOpenOnNavigation":true};
          var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
          s.src = "https://djk7sae3przs1.cloudfront.net/cdn-js/chat.js";
          var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
          window.crypken = m; m._globals = chatbotConfig;
      })(document, window.crypken || {});
    </script>  
<?php
}
   
function omega_create_menu() {
        add_menu_page(
          __("Omega Chat", "chatbot"),
          __("Omega Chat", "chatbot"),
          "administrator", __FILE__,
          "omega_plugin_settings_page"
        );
      }
   
function omega_plugin_settings_page() {
  include_once(plugin_dir_path( __FILE__ ) . "views/settings_installed.php");
}

add_action('wp_head', 'wpcom_javascript');
add_action("admin_menu", "omega_create_menu");