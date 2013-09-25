var
	keywords = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with']

$(init)

function init(){
	var $editor = $('#editor')
	$editor.on('dragover', onDragOver)
	$editor.on('drop', onDrop)
	
	lofiSyntaxColor()
}

function onDrop(e){
	e.stopPropagation()
	e.preventDefault()

	var files = e.originalEvent.dataTransfer.files
	for(var i = 0; i < files.length; i++){
		var reader = new FileReader
		
		$(reader).on('load', placeDroppedImage)

		reader.readAsDataURL(files[i])
	}
}

function placeDroppedImage(e){
	$('#editor').append($('<img />', { 
		src: e.originalEvent.target.result
	}))
}

function onDragOver(e){
	e.stopPropagation()
	e.preventDefault()
	e.originalEvent.dataTransfer.dropEffect = 'copy'
}

function lofiSyntaxColor(){
	var
		start = '<span class="token">',
		end = '</span>',
		code = $('#editor').text(),
		symbols = code.replace(/\s+/g, function(m){ return end + m + start })
		newCode = start + symbols + end
		
	$('#editor').html(newCode)
	$('.token').each(function(i, token){
		var $token = $(token)
		console.log(token)
		if(keywords.indexOf($token.text()) != -1) $token.addClass('key')
	})
}