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
	var input_name = $('[name="name_name"]');
	var input_application_id = $('[name="name_application_id"]');
	var input_type = $('[name="name_type"]');
	var input_description = $('[name="name_description"]');
	var input_contact = $('[name="name_contact"]');
	var input_functional_support = $('[name="name_functional_support"]');
	var input_technical_support = $('[name="name_technical_support"]');
	var input_url = $('[name="name_url"]');
	
    tableCollection.on('click', function(e){
		e.preventDefault();

		/* --- Variables for values --- */
		var val_key;
		var val_application_id;
		var val_name;
		var val_type;
		var val_description;
		var val_contact;
		var val_functional_support;
		var val_technical_support;
		var val_url;
		
		if(e['field'] === 'Update'){ 
			/* --- Pull values from the current table row --- */
			val_key = e.data['row._key'];
			val_application_id = e.data['row.app_application_id'];
			val_name = e.data['row.app_name'];
			val_type = e.data['row.app_type'];
			val_description = e.data['row.app_description'];
			val_contact = e.data['row.app_contact'];
			val_functional_support = e.data['row.app_functional_support'];
			val_technical_support = e.data['row.app_technical_support'];
			val_url = e.data['row.app_url'];
			
			/* --- Insert values from rows into input fields --- */
			input_key.val(val_key);
			input_application_id.val(val_application_id);
			input_name.val(val_name);
			input_type.val(val_type);
			input_description.val(val_description);
			input_contact.val(val_contact);
			input_functional_support.val(val_functional_support);
			input_technical_support.val(val_technical_support);
			input_url.val(val_url);

		} else if(e['field'] === 'Delete'){
			tokens.set('token_delete_key', e.data['row._key']);
		}

		$('form *').filter(':input').each(function(){
   			var value = $(this).val();
   			console.log(value);
		});

    });


	$(document).on('click', '#id_button_submit', function(e){
		e.preventDefault();
		if(input_key.val() != '') {
			/* --- Update Record --- */
			console.log('SUBMIT UPDATE', input_key.val());
			tokens.set('token_update_application_id', input_application_id.val());
			tokens.set('token_update_key', input_key.val());
			tokens.set('token_update_name', input_name.val());
			tokens.set('token_update_type', input_type.val());
			tokens.set('token_update_description', input_description.val());

			tokens.set('token_update_contact', input_contact.val());
			tokens.set('token_update_functional_support', input_functional_support.val());
			tokens.set('token_update_technical_support', input_technical_support.val());
			tokens.set('token_update_url', input_url.val());
		} else {
			/* --- New record --- */
			console.log('SUBMIT NEW');
			/* tokens.set('create_tok', 'true'); */
			tokens.set('token_create_application_id', input_application_id.val());
			tokens.set('token_create_name', input_name.val());
			tokens.set('token_create_type', input_type.val());
			tokens.set('token_create_description', input_description.val());

			tokens.set('token_create_contact', input_contact.val());
			tokens.set('token_create_functional_support', input_functional_support.val());
			tokens.set('token_create_technical_support', input_technical_support.val());
			tokens.set('token_create_url', input_url.val());

		}
		console.log('Submit button clicked done');
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
