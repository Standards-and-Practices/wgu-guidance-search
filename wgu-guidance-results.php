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

    $files = glob(plugin_dir_path( __DIR__ ) .'wgu-guidance-results/dist/assets/index.*.js');
    do_action( 'qm/debug', $files );
        foreach($files as $file) {
            wp_enqueue_script( 'wgu_guidance_results_script', $file);
        };

    // wp_enqueue_script( 'wgu_guidance_results_script', plugin_dir_path( __DIR__ ) .'/wgu-guidance-results/dist/assets/index.js');
}
add_action('wp_enqueue_scripts', 'wgu_guidance_scripts');

function wgu_guidance_styles($hook)
{
    wp_enqueue_style( 'wgu_guidance_results_style', plugin_dir_path( __DIR__ ) .'/wgu-guidance-results/dist/assets/index.css');
}
add_action('wp_enqueue_styles', 'wgu_guidance_styles');
