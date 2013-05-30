/* Functions for the Skim Import plugin popup */

tinyMCEPopup.requireLangPack();


var tinymce_skim_Dialog = {
         getdivfornote : function(stylekey) {
		 //create a format div with inline styles for each type of note
		 
            var rawstyle = "<div style='display: inline; background: @backcolor; color: @forecolor; font-weight: @bold; border: @border @bordercolor 1px; font-style: @italic; text-decoration: @underline @strikeout'>";
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
		 //from a given line of text extract the note type if it is a note header (ret. false if not)
		 
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
		//the main function which parses all the notes and returns the formatted html
		//it is complex because of nested notes. we need to determine e.g. if an underline note
		//should be shown standalone or within the immediate previous highlight note.
		
            var content, retcontent, currentpage,pj,cj,parentpage,parentstyle,currentnote,currentstyle,lines;
            var parentnote = new Array();
            var currentnote = new Array();
            
            content = tinyMCEPopup.dom.encode(document.getElementById('content').value);
            lines = content.split(/\r?\n/);
            retcontent = '';
            parentstyle = '';
            parentpage='0';
            currentstyle ='';
            currentpage='0';
            pj='';
            cj='';

			//loop through each line of RTF
            if (lines.length > 1) {
                for(var i=0;i<lines.length;i++){
                    var row = lines[i];
					//if this is a note header, fetch the style for the note
                    var stylekey = this.determinestyle(row);
                    if (stylekey){
                        //since this is a new note, the prev note is complete, process it
							//If this is the second discovered note, we don't have a parent yet, create one
                           if(parentstyle=='' && currentstyle !=''){
                                parentstyle = currentstyle;
                                parentnote = currentnote;
                                parentpage = currentpage;
							//else if we have a parent note, merge this with current or create new parent
                            }else if(parentstyle!=''){
								//check if we should merge current with parent
                            	pj = parentnote.join('');
                            	cj= currentnote.join('');
                                if(pj.indexOf(cj)>-1 && parentpage==currentpage){
									parentnote = this.mergenotes(parentnote,currentnote,currentstyle);
									
								//if no merge required, set old parent to retcontent and set currentnote as new parent
                                }else{
									//add page number to end of parent note, removing trailing new lines in process
									parentnote = this.arraytrim(parentnote);
									parentnote[parentnote.length -1] += ' (p. ' + parentpage  + ')';
                                    retcontent += '<br/>' + parentstyle + parentnote.join('<br />') + '</div>';
                                    parentstyle = currentstyle;
                                    parentnote = currentnote;
                                    parentpage = currentpage;
                                }
                            }
                            //set up new note
                            currentnote = new Array();
                            currentstyle = stylekey;
                            currentpage = this.getpage(row);
                        
                    }else{
                       currentnote.push(row) ;
                    }//end of styline check
                }//end of for loop
                
                //tidy up the final parent and current notes
                 pj = parentnote.join(' ');
				cj= currentnote.join(' ');
				if(pj.indexOf(cj)>-1 && parentpage==currentpage){
					parentnote = this.mergenotes(parentnote,currentnote,currentstyle);
                    
                 }else{
                    //add page number to end of parent note, removing trailing new lines in process
					parentnote = this.arraytrim(parentnote);
					parentnote[parentnote.length -1] += ' (p. ' + parentpage  + ')';
					retcontent += '<br/>' + parentstyle + parentnote.join('<br />') + '</div>';
                    parentstyle = currentstyle;
                    parentnote = currentnote;
                    parentpage = currentpage;
                 }
				 parentnote = this.arraytrim(parentnote);
                 parentnote[parentnote.length -1] += ' (p. ' + parentpage  + ')';
				 retcontent += '<br/>' + parentstyle + parentnote.join('<br />') + '</div>';
                    
            }//close the lines.length condition
            return retcontent;
            
        },
		arraytrim : function(thearray){
		//trim the trailing array members which may contain empty lines
		
			while(thearray.length > 1 && thearray[thearray.length -1].tinymce_skim_trim() == ''){
						thearray.pop();
			}
			return thearray;
		},
		mergenotes : function(parentnote,currentnote,currentstyle){
		//merge a note(eg an underline) inside a parent note(eg highlight)
		
			for (var pi=0;pi<parentnote.length;pi++){
				for (var ci=0;ci<currentnote.length;ci++){
					if(currentnote[ci].tinymce_skim_trim() !=''){
						var replacednote = parentnote[pi].replace(currentnote[ci],currentstyle + '&nbsp;' + currentnote[ci] + '&nbsp;</div>');
						if(replacednote != parentnote[pi]){
							parentnote[pi] = replacednote;
							break;
						}
					}
				}
			}
			return parentnote;
		
		},
        getpage : function(aline) {
		//from a note header line, extract the page number
		
			var page = aline.split(', page ');
                return page[1];
        },
        init : function() {
				this.resize();
				
				String.prototype.tinymce_skim_trim = function() {
					return this.replace(/^\s+|\s+$/g,"");
				}
				
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
        tinyMCEPopup.editor.execCommand('mceInsertContent', false, convtext);
		//tinyMCEPopup.editor.setContent(convtext, {source_view : true});
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