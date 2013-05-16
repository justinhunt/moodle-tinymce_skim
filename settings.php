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

   $options = array('0' => new lang_string('no', 'tinymce_skim'),
			'1' => new lang_string('yes', 'tinymce_skim'));

				
	$settings->add(new admin_setting_configselect('tinymce_skim/yesorno',
					   get_string('selectyesno', 'tinymce_skim'),
					   get_string('selectyesnodetails', 'tinymce_skim'), 0,$options));
	  
}
