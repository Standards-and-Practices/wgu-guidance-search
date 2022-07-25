<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.wgu.edu
 * @since             1.0.0
 * @package           WGU_Guidance_Search
 *
 * @wordpress-plugin
 * Plugin Name:       WGU Guidance Results
 * Plugin URI:        https://github.com/Standards-and-Practices/wgu-guidance-search
 * Description:       Enable search for WGU Guidance System.
 * Version:           1.0.0
 * Author:            David Petersen
 * Author URI:        https://www.wgu.edu
 * GitHub Plugin URI: Standards-and-Practices/wgu-guidance-search
*/

function wgu_guidance_scripts($hook)
{
    $path = plugin_dir_path( __DIR__ ) .'wgu-guidance-search/dist/assets/index.*.js';
    $files = glob($path);

    foreach($files as $file) {
        $file_formatted = str_replace('/var/www/webroot/ROOT', '', $file);
        do_action( 'qm/debug', $file_formatted );
        wp_enqueue_script( 'wgu_guidance_search_script', str_replace('/var/www/webroot/ROOT', '', $file_formatted));
    };

}
add_action('wp_enqueue_scripts', 'wgu_guidance_scripts');

function wgu_guidance_styles($hook)
{
    wp_enqueue_style( 'wgu_guidance_search_style', plugin_dir_path( __DIR__ ) .'/wgu-guidance-search/dist/assets/index.css');
}
add_action('wp_enqueue_styles', 'wgu_guidance_styles');
