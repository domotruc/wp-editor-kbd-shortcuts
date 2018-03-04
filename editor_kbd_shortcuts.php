<?php
/*
   Plugin Name: Editor keyboard shortcuts
   Plugin URI: https://github.com/domotruc/wp-editor-kbd-shortcuts
   Description: Provide shortcuts to save (Ctrl+S) and preview (Ctrl+P) posts and pages.
   Author: domotruc
   Version: 1.0
   License: GNU General Public Licence v3 - GPLv3
   License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

if (is_admin() && ! function_exists('editor_kbd_shortcuts_enqueue')) {
    function editor_kbd_shortcuts_enqueue() {
	wp_enqueue_script('dmtrc_edt_kbd_shct_js', plugin_dir_url(__FILE__) . 'script' . (WP_DEBUG ? '' : '') . '.js', array('jquery'), '1.0');
    }

    add_action('admin_enqueue_scripts', 'editor_kbd_shortcuts_enqueue');
}
