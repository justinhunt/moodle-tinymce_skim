/* Functions for the Skim Import plugin popup */

tinyMCEPopup.requireLangPack();


var tinymce_skim_Dialog = {
         getdivfornote : function(stylekey) {
            var rawstyle = "<div style='display: inline; background: @backcolor; color: @forecolor; font-weight: @bold; border: @border @border-color 1px; font-style: @italic; text-decoration: @underline @strikeout'>";
            var defstyle='';
            
            //if no style key found, just return and be done with it.
            if (stylekey==''){return false};
            //if 'line' or 'freehand' we just return an empty div to keep things consistent when parsing
            if(stylekey=='line' || stylekey=='freehand'){
                return '<div>'; 
            }
            
            //if we have a style key, split out the raw style for the defined style
            var styles = tinyMCEPopup.getParam('skim_style_' + stylekey);
            
            var boldvalue = (styles.indexOf('bold')>-1 ? 'bold' : 'normal'); 
            var italicvalue = (styles.indexOf('italic')>-1 ? 'italic' : 'normal'); 
            var underlinevalue = (styles.indexOf('underline')>-1 ? 'underline' : '');
			var strikeoutvalue = (styles.indexOf('strikeout')>-1 ? 'line-through' : '');
            
            defstyle = rawstyle.replace('@backcolor',tinyMCEPopup.getParam('skim_backcolor_' + stylekey));
            defstyle = defstyle.replace('@forecolor',tinyMCEPopup.getParam('skim_forecolor_' + stylekey));
            defstyle = defstyle.replace('@bordercolor',tinyMCEPopup.getParam('skim_bordercolor_' + stylekey));
            defstyle = defstyle.replace('@bold',boldvalue);
            defstyle = defstyle.replace('@italic',italicvalue);
            defstyle = defstyle.replace('@underline',underlinevalue);
			defstyle = defstyle.replace('@strikeout',strikeoutvalue);
            defstyle = defstyle.replace('@border',tinyMCEPopup.getParam('skim_border_' + stylekey));
            
            //defstyle="bb<div style='font-weight: bold;'>";
            return defstyle;
        },
        determinestyle : function(aline) {
             var stylekey=false;
          
          //determine the style to apply
            if(aline.indexOf('• Highlight,')==0){
                stylekey=tinymce_skim_div_highlight;
            }else if(aline.indexOf('• Circle,')==0){
                stylekey=tinymce_skim_div_circle;
            }else if(aline.indexOf('• Box,')==0){
                stylekey=tinymce_skim_div_box;
            }else if(aline.indexOf('• Anchored Note,')==0){
                stylekey=tinymce_skim_div_anchorednote;
            }else if(aline.indexOf('• Text Note,')==0){
                stylekey=tinymce_skim_div_textnote;
            }else if(aline.indexOf('• Underline,')==0){
                stylekey=tinymce_skim_div_underline;
            }else if(aline.indexOf('• Strikeout,')==0){
                stylekey=tinymce_skim_div_strikeout;
            }else if(aline.indexOf('• Line,')==0){
                stylekey=tinymce_skim_div_line;
            }else if(aline.indexOf('• Freehand,')==0){
                stylekey=tinymce_skim_div_freehand;
            }
           return stylekey;
    
        },
        convertrtf : function() {
            var content, retcontent, currentpage,nospacecurrentnote,parentpage,parentnote,parentstyle,currentnote,currentstyle,lines;
            content = tinyMCEPopup.dom.encode(document.getElementById('content').value);
            lines = content.split(/\r?\n/);
            retcontent = '';
            parentstyle = '';
            parentnote = '';
            parentpage='0';
            currentstyle ='';
            currentnote ='';
            currentpage='0';

			//loop through each line of RTF
            if (lines.length > 1) {
                for(var i=0;i<lines.length;i++){
                    var row = lines[i];
					//if this is a note header, fetch the style for the note
                    var stylekey = this.determinestyle(row);
                    if (stylekey){
                        //since this is a new note, the prev note is complete, process it
                           if(parentstyle=='' && currentstyle !=''){
                                parentstyle = currentstyle;
                                parentnote = currentnote;
                                parentpage = currentpage;
                            }else if(parentstyle!=''){
								nospacecurrentnote = currentnote.replace('<br />','');
                                if(parentnote.indexOf(nospacecurrentnote)>-1 && parentpage==currentpage){
                                    parentnote = parentnote.replace(nospacecurrentnote, '&nbsp;' + currentstyle + nospacecurrentnote + '</div>&nbsp;');
                                }else{
                                    retcontent += '' + parentstyle + parentnote + '(p. ' + parentpage  + ')<br /></div>';
                                    parentstyle = currentstyle;
                                    parentnote = currentnote;
                                    parentpage = currentpage;
                                }
                            }
                            //set up new note
                            currentnote ='';
                            currentstyle = stylekey;
                            currentpage = this.getpage(row);
                        
                    }else{
                       currentnote +=  row + '<br />';
                    }//end of styline check
                }//end of for loop
                
                //tidy up the final parent and current notes
				nospacecurrentnote = currentnote.replace('<br />','');
                 if(parentnote.indexOf(nospacecurrentnote)>-1 && parentpage==currentpage){
                    parentnote = parentnote.replace(nospacecurrentnote, '&nbsp;' + currentstyle + nospacecurrentnote + '</div>&nbsp;');
                 }else{
                    retcontent += '' + parentstyle + parentnote + '(p. ' + parentpage  + ')<br /></div>';
                    parentstyle = currentstyle;
                    parentnote = currentnote;
                    parentpage = currentpage;
                 }
                 retcontent += parentstyle + parentnote + '(p. ' + parentpage + ')</div>';
                    
            }//close the lines.length condition
            return retcontent;
            
        },
        getpage : function(aline) {
		var page = aline.split(', page ');
                return page[1];
        },
        init : function() {
		this.resize();
                tinymce_skim_div_textnote = this.getdivfornote('textnote');
                tinymce_skim_div_highlight = this.getdivfornote('highlight');
                tinymce_skim_div_anchorednote = this.getdivfornote('anchorednote');
                tinymce_skim_div_circle = this.getdivfornote('circle');
                tinymce_skim_div_box = this.getdivfornote('box');
                tinymce_skim_div_underline = this.getdivfornote('underline');
                tinymce_skim_div_strikeout = this.getdivfornote('strikeout');
                tinymce_skim_div_line = this.getdivfornote('line');
                tinymce_skim_div_freehand = this.getdivfornote('freehand');
                
	},
	insert : function() {
                
                var convtext = this.convertrtf();

		//tinyMCEPopup.editor.execCommand('mceInsertClipboardContent', false, {content : convtext});
                tinyMCEPopup.editor.execCommand('mceInsertContent', false, convtext);
		tinyMCEPopup.close();
	},

	resize : function() {
		var vp = tinyMCEPopup.dom.getViewPort(window), el;

		el = document.getElementById('content');

		el.style.width  = (vp.w - 20) + 'px';
		el.style.height = (vp.h - 120) + 'px';
	}
};

tinyMCEPopup.onInit.add(tinymce_skim_Dialog.init, tinymce_skim_Dialog);