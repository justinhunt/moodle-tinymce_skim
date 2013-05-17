/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	tinymce.create('tinymce.plugins.skimPlugin', {
		init : function(ed, url) {
			this.editor = ed;

			// Register commands
			ed.addCommand('mceskim', function() {

				ed.windowManager.open({
					file : url + '/skim.htm',
					width : 480 + parseInt(ed.getLang('advlink.delta_width', 0)),
					height : 400 + parseInt(ed.getLang('advlink.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('skim', {
				title : 'skim.desc',
				cmd : 'mceskim',
				image: url + '/img/icon.png'
			});
			//you could add a shortcut here
			//ed.addShortcut('ctrl+k', 'skim.skim_desc', 'mceskim');

		
		},

		getInfo : function() {
			return {
				longname : 'TITLE_READABALE_NAME',
				author : 'Justin Hunt',
				version : '1.0.0'
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('skim', tinymce.plugins.skimPlugin);
})();