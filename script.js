/**
 * Javascript - jQuery based - functions for the Editor Keyboard Shortcuts plugin
 */
(function($, undefined) {
    'use strict';
    var $Document = $(document),
        $saveButton, $previewButton;

    /**
     * Initialise on document ready. Checks the DOM to see which button we can use:
     *  - post/page/custom/media:
     *      #original_post_status[value=draft|pending|private|publish] ->
     *      #save-action[#save-post|#publish|#publish|#publish]
     */
    $(function() {
        var $Body = $(document.body),
            $Status = $('#original_post_status'),
            sStatus = $Status.val(),
	    saveSel;

        if ($Status.length) {
	    saveSel = (sStatus==='private' || sStatus==='pending' || sStatus==='publish') ? '#publish' : '#save-post';
	    setButton('s', saveSel);	    
	    setButton('p', '#post-preview', 'Ctrl+P or Cmd+P');
        }
    });

    /**
     * Set the given button variable.
     * If the selector is valid, keydown event listener is added, otherwise it is removed.
     * @param type string among 's', 'p'
     * @param selector CSS selector of the button
     * @returns {boolean} Returns true for a valid selector
     */
    function setButton(type, selector) {
	var button = $(selector), tip;

	switch(type) {
	    case 's':
		$saveButton = button;
		tip = 'Ctrl+S or Cmd+S';
		break;
	    case 'p':
		$previewButton = button;
		tip = 'Ctrl+P or Cmd+P';
		break;
	}

	var isButton = button.length !== 0;

        if (isButton) {
            $Document.on('keydown', handleKeydown);
            button.attr('title', tip);

            /*$(document).on('tinymce-editor-init', function(event, editor) {
                editor.on('KeyDown', handleKeydown);
	    });*/
        } else {
            button = undefined;
            $Document.off('keydown', handleKeydown);
        }

        return isButton;
    }

    /**
     * Handles the actual keydown.
     * @param e
     */
    function handleKeydown(e) {
	
	
	// Ctrl+S or Cmd+S
        if ((e.ctrlKey || e.metaKey) && (e.keyCode || e.which) === 83) {	    
            e.preventDefault();
	    e.stopPropagation();
            $saveButton.click();
        }
	// Ctrl+P or Cmd+P
        if ((e.ctrlKey || e.metaKey) && (e.keyCode || e.which) === 80) {
            e.preventDefault();
	    e.stopPropagation();
            $previewButton.click();
        }
    }

    /**
     * Checks if the focused element is a widget form input and tries to set the save-button.
     */
    function handleWidgetFocus() {
        var $Focus = $(document.activeElement);
        setButton($saveButton,
		  $Focus.is(':input') ? $Focus.parents('form:first').find(':submit') : undefined,
		  'Ctrl+S or Cmd+S)'
	);
    }
})(jQuery);
