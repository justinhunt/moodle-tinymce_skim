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

   $coloroptions = array('' => get_string('transp', 'tinymce_skim'),
   			'#0' => get_string('black', 'tinymce_skim'),
                        '#F2F2F2' => get_string('ltgrey', 'tinymce_skim'),
			'#BDBDBD' => get_string('grey', 'tinymce_skim'),
			'#424242' => get_string('dkgrey', 'tinymce_skim'),
   			'#A9E2F3' => get_string('ltblue', 'tinymce_skim'),
			'#2E2EFE' => get_string('blue', 'tinymce_skim'),
			'#0B0B61' => get_string('dkblue', 'tinymce_skim'),
			'#F3F781' => get_string('ltyellow', 'tinymce_skim'),
			'#FFFF00' => get_string('yellow', 'tinymce_skim'),
			'#868A08' => get_string('dkyellow', 'tinymce_skim'),
			'#F5A9A9' => get_string('ltred', 'tinymce_skim'),
			'#FF0000' => get_string('red', 'tinymce_skim'),
			'#B40404' => get_string('dkred', 'tinymce_skim'),
			'#A9F5A9' => get_string('ltgreen', 'tinymce_skim'),
			'#00FF00' => get_string('green', 'tinymce_skim'),
			'#0B610B' => get_string('dkgreen', 'tinymce_skim'));
 
			
 $styleoptions = array('bold' => get_string('bold', 'tinymce_skim'),
   			'italic' => get_string('italic', 'tinymce_skim'),
   			'underline' => get_string('underline', 'tinymce_skim'),
   			'strikeout' => get_string('strikeout', 'tinymce_skim'));
 
$borderoptions = array('none' => get_string('none', 'tinymce_skim'),
   			'dotted' => get_string('dotted', 'tinymce_skim'),
   			'dashed' => get_string('dashed', 'tinymce_skim'),
                        'solid' => get_string('solid', 'tinymce_skim'),
			'double' => get_string('double', 'tinymce_skim'));

 
        // Declare the notetypes
        $notetypes=array('textnote','anchorednote','highlight','circle','box','underline','strikeout');
        
        //set defaults
        $forecolordefault= array();
        $forecolordefault['textnote'] = "#0";
        $forecolordefault['anchorednote'] = "#0";
        $forecolordefault['highlight'] = "#0";
        $forecolordefault['circle'] = "";
        $forecolordefault['box'] = "";
        $forecolordefault['underline'] = "";
        $forecolordefault['strikeout'] = "";
       
        $backcolordefault= array();
        $backcolordefault['textnote'] = "";
        $backcolordefault['anchorednote'] = "";
        $backcolordefault['highlight'] = "#F3F781";
        $backcolordefault['circle'] = "#F3F781";
        $backcolordefault['box'] =  "#F3F781";
        $backcolordefault['underline'] =  "";
        $backcolordefault['strikeout'] =  "";
        
        $styledefault = array();
        $styledefault['textnote']=array();
        $styledefault['anchorednote']=array('bold');
        $styledefault['highlight']=array();
        $styledefault['circle']=array();
        $styledefault['box'] =array();
        $styledefault['underline'] =array('underline');
        $styledefault['strikeout'] =array('strikeout');
        
        $borderdefault = array();
        $borderdefault['textnote']='none';
        $borderdefault['anchorednote']='none';
        $borderdefault['highlight']='none';
        $borderdefault['circle']='solid';
        $borderdefault['box'] ='solid';
        $borderdefault['underline'] ='none';
        $borderdefault['strikeout'] ='none';

        $bordercolordefault= array();
        $bordercolordefault['textnote'] = "";
        $bordercolordefault['anchorednote'] = "";
        $bordercolordefault['highlight'] = "";
        $bordercolordefault['circle'] = "#FF0000";
        $bordercolordefault['box'] =  "#2E2EFE";
        $bordercolordefault['underline'] =  "";
        $bordercolordefault['strikeout'] =  "";
        
        foreach ($notetypes as $notetype){
            $settings->add(new admin_setting_heading('heading_' . $notetype, get_string('heading_' . $notetype, 'tinymce_skim'), ''));		
            /*
            //notetype forecolor		
            $settings->add(new admin_setting_configcolourpicker('tinymce_skim/forecolor_' . $notetype,
                                               get_string('forecolor', 'tinymce_skim'),
                                               get_string('forecolor_details', 'tinymce_skim'), $forecolordefault[$notetype]));	
            
          
            $settings->add(new admin_setting_configcolourpicker('tinymce_skim/backcolor_' . $notetype,
                                               get_string('backcolor', 'tinymce_skim'),
                                               get_string('backcolor_details', 'tinymce_skim'), $backcolordefault[$notetype]));		
             */

            $settings->add(new admin_setting_configselect('tinymce_skim/forecolor_' . $notetype,
					   get_string('forecolor', 'tinymce_skim'),
					   get_string('forecolor_details', 'tinymce_skim'), $forecolordefault[$notetype],$coloroptions));	

            $settings->add(new admin_setting_configselect('tinymce_skim/backcolor_' . $notetype,
					   get_string('backcolor', 'tinymce_skim'),
					   get_string('backcolor_details', 'tinymce_skim'), $backcolordefault[$notetype],$coloroptions));	

            
            //notetype style
            $settings->add(new admin_setting_configmulticheckbox('tinymce_skim/style_' . $notetype,
                                                       get_string('style', 'tinymce_skim'),
                                                       get_string('style_details','tinymce_skim'), $styledefault[$notetype],$styleoptions));

        
            //notetype border		
            $settings->add(new admin_setting_configselect('tinymce_skim/border_' . $notetype,
					   get_string('border', 'tinymce_skim'),
					   get_string('border_details', 'tinymce_skim'), $borderdefault[$notetype],$borderoptions));	
	
            //notetype border color
            /*
            $settings->add(new admin_setting_configcolourpicker('tinymce_skim/bordercolor_' . $notetype,
                                               get_string('bordercolor', 'tinymce_skim'),
                                               get_string('bordercolor_details', 'tinymce_skim'), $bordercolordefault[$notetype]));		
            */
            $settings->add(new admin_setting_configselect('tinymce_skim/bordercolor_' . $notetype,
					   get_string('bordercolor', 'tinymce_skim'),
					   get_string('bordercolor_details', 'tinymce_skim'), $bordercolordefault[$notetype],$coloroptions));	

            
            
        }//end of for loop
        /*
   			
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
		
	  */
}//end of if admin full tree
