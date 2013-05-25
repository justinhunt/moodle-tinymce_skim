<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Skim Import settings.
 *
 * @package   tinymce_skim
 * @copyright 2013 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {

   $coloroptions = array('transp' => get_string('transp', 'tinymce_skim'),
   			'black' => get_string('black', 'tinymce_skim'),
   			'ltblue' => get_string('ltblue', 'tinymce_skim'),
			'blue' => get_string('blue', 'tinymce_skim'),
			'dkblue' => get_string('dkblue', 'tinymce_skim'),
			'ltyellow' => get_string('ltyellow', 'tinymce_skim'),
			'yellow' => get_string('yellow', 'tinymce_skim'),
			'dkyellow' => get_string('dkyellow', 'tinymce_skim'),
			'ltred' => get_string('ltred', 'tinymce_skim'),
			'red' => get_string('red', 'tinymce_skim'),
			'dkred' => get_string('dkred', 'tinymce_skim'),
			'ltgreen' => get_string('ltgreen', 'tinymce_skim'),
			'green' => get_string('green', 'tinymce_skim'),
			'dkgreen' => get_string('dkgreen', 'tinymce_skim'));
			
 $styleoptions = array('bold' => get_string('bold', 'tinymce_skim'),
   			'italic' => get_string('italic', 'tinymce_skim'),
   			'underline' => get_string('underline', 'tinymce_skim'),
   			'strikeout' => get_string('strikeout', 'tinymce_skim'));
   			
   //TEXTNOTE
   	$settings->add(	new admin_setting_heading('heading_textnote', get_string('heading_textnote', 'tinymce_skim'), ''));		
   			
   	//plain text forecolor		
   	$settings->add(new admin_setting_configselect('tinymce_skim/forecolor_textnote',
					   get_string('forecolor_textnote', 'tinymce_skim'),
					   get_string('forecolor_textnote_details', 'tinymce_skim'), 'black',$coloroptions));	
					   
	//plain text backcolor		
   	$settings->add(new admin_setting_configselect('tinymce_skim/backcolor_textnote',
					   get_string('backcolor_textnote', 'tinymce_skim'),
					   get_string('backcolor_textnote_details', 'tinymce_skim'), 'transp',$coloroptions));		
   			
	//plain text style
	$styletextnotedefaults = array();
	$settings->add(new admin_setting_configmulticheckbox('tinymce_skim/style_textnote',
						   get_string('style_textnote', 'tinymce_skim'),
						   get_string('style_textnote_details', 'tinymce_skim'), $styletextnotedefaults,$styleoptions));
						   
						   
	 //HIGHLIGHT
   	$settings->add(	new admin_setting_heading('heading_highlight', get_string('heading_highlight', 'tinymce_skim'), ''));	
	
	//highlight forecolor		
   	$settings->add(new admin_setting_configselect('tinymce_skim/forecolor_highlight',
					   get_string('forecolor_highlight', 'tinymce_skim'),
					   get_string('forecolor_highlight_details', 'tinymce_skim'), 'black',$coloroptions));	
					   
	//highlight backcolor		
   	$settings->add(new admin_setting_configselect('tinymce_skim/backcolor_highlight',
					   get_string('backcolor_highlight', 'tinymce_skim'),
					   get_string('backcolor_highlight_details', 'tinymce_skim'), 'ltyellow',$coloroptions));	
		
	//highlight style		   
	$stylehighlightdefaults =  array('bold' => 1,'italic' => 1);
	$settings->add(new admin_setting_configmulticheckbox('tinymce_skim/style_highlight',
						   get_string('style_highlight', 'tinymce_skim'),
						   get_string('style_highlight_details', 'tinymce_skim'), $stylehighlightdefaults,$styleoptions));
		
	  
}
