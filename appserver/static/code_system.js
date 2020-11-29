require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc) {

	/* --- MVC is used for tokens --- */
	var tokens = mvc.Components.get('submitted');

	/* --- Search Reference --- */
	var searchUpdate = mvc.Components.get('token_search_update');
	var searchCreate = mvc.Components.get('token_search_create');
	var searchDelete = mvc.Components.get('token_search_delete');

	var searchCollection = mvc.Components.get('token_search_collection');

	/* --- Table Reference --- */
    var tableCollection = mvc.Components.get('token_table_collection');

	/* --- Variables for inputs --- */
	var input_key = $('[name="_key"]');
	var input_host_name = $('[name="name_sys_host_name"]');
	var input_application_id = $('[name="name_sys_application_id"]');
	
    tableCollection.on('click', function(e){
		e.preventDefault();

		/* --- Variables for values --- */
		var val_key;
		var val_application_id;
		var val_host_name;
		var val_sub_category;
		var val_description;
		var val_rationale;
		var val_criteria_implication;
		var val_accepted;
		var val_requirement_value
		var val_priority;
		var val_status;
		var val_phase;
		var val_comment_po;
		var val_comment_supplier;

		if(e['field'] === 'Update'){ 
			/* --- Pull values from the current table row --- */
			val_key = e.data['row._key'];
			val_application_id = e.data['row.sys_application_id'];
			val_host_name = e.data['row.sys_host_name'];
			
			console.log('UPDATE>val_application_id=', val_application_id);
			console.log('UPDATE>val_host_name=', val_host_name);

			/* --- Insert values from rows into input fields --- */
			input_key.val(val_key);
			input_application_id.val(val_application_id);
			input_host_name.val(val_host_name);
		} else if(e['field'] === 'Delete'){
			tokens.set('token_delete_key', e.data['row._key']);
			
			console.log('DELETE _key=', e.data['row._key']);
		}

		$('form *').filter(':input').each(function(){
   			var value = $(this).val();
   			console.log(value);
		});

    });


	$(document).on('click', '#id_button_submit', function(e){
		e.preventDefault();

		console.log('SUBMIT BUTTON CLICKED')
		
		if(input_key.val() != '') {
			/* --- Update Record --- */
			console.log('UPDATE RECORD');

			console.log('Submit button clicked, update record', input_key.val());
			console.log('UPDATE>input_key', input_key.val());
			console.log('UPDATE>input_host_name', input_host_name.val());
			console.log('UPDATE>input_application_id', input_application_id.val());
			
			tokens.set('token_update_application_id', input_application_id.val());
			tokens.set('token_update_key', input_key.val());
			tokens.set('token_update_host_name', input_host_name.val());


		} else {
			/* --- New record --- */
			console.log('NEW RECORD');
			/* tokens.set('create_tok', 'true'); */
			tokens.set('token_create_application_id', input_application_id.val());
			tokens.set('token_create_host_name', input_host_name.val());
			
			console.log('NEW: token_create_host_name=', input_host_name.val())
			console.log('Values: token_create_application_id=', input_application_id.val())
		}
	});


	searchUpdate.on('search:done', function(){
		console.log('searchUpdate');
		searchCollection.startSearch();
		$('form *').filter(':input').each(function(){
			$(this).val('');
			console.log($(this).val(''));
		});
	});


	searchCreate.on('search:done', function(){
		console.log('searchCreate');
		searchCollection.startSearch();
		$('form *').filter(':input').each(function(){
			$(this).val('');
			console.log($(this).val(''));
		});
	});


	searchDelete.on('search:done', function(){
		console.log('searchDelete');
		searchCollection.startSearch();
		tokens.unset('token_delete_key');
	});
});
