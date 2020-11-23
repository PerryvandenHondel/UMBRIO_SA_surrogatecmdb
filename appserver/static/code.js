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
	var input_key= $('[name="_key"]');
	var input_requirement_id = $('[name="name_requirement_id"]');
	var input_category= $('[name="name_category"]');
	var input_sub_category = $('[name="name_sub_category"]');
	var input_description = $('[name="name_description"]');
	var input_rationale = $('[name="name_rationale"]');
	var input_criteria_implication = $('[name="name_criteria_implication"]');
	var input_requirement_value = $('[name="name_requirement_value"]');
	var input_accepted = $('[name="name_accepted"]');	
	var input_priority = $('[name="name_priority"]');	
	var input_status = $('[name="name_status"]');	
	var input_phase = $('[name="name_phase"]');
	var input_comment_po = $('[name="name_comment_po"]');
	var input_comment_supplier = $('[name="name_comment_supplier"]');

    tableCollection.on('click', function(e){
		e.preventDefault();

		/* --- Variables for values --- */
		var val_key;
		var val_requirement_id;
		var val_category;
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
			val_requirement_id = e.data['row.requirement_id'];
			val_category = e.data['row.category'];
			val_sub_category = e.data['row.sub_category'];
			val_description = e.data['row.description'];
			val_rationale = e.data['row.rationale'];
			val_requirement_value = e.data['row.requirement_value'];
			val_criteria_implication = e.data['row.criteria_implication'];
			val_accepted = e.data['row.accepted'];
			val_priority = e.data['row.priority'];
			val_status = e.data['row.status'];
			val_phase = e.data['row.phase'];
			val_comment_po = e.data['row.comment_po'];
			val_comment_supplier = e.data['row.comment_supplier'];

			/* --- Insert values from rows into input fields --- */
			input_key.val(val_key);
			input_requirement_id.val(val_requirement_id);
			input_category.val(val_category);
			input_sub_category.val(val_sub_category);
			input_description.val(val_description);
			input_rationale.val(val_rationale);
			input_requirement_value.val(val_requirement_value);
			input_criteria_implication.val(val_criteria_implication);
			input_accepted.val(val_accepted);
			input_priority.val(val_priority);
			input_status.val(val_status);
			input_phase.val(val_phase);
			input_comment_po.val(val_comment_po);
			input_comment_supplier.val(val_comment_supplier);
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
			console.log('Submit button clicked, update record', input_key.val());
			tokens.set('token_update_requirement_id', input_requirement_id.val());
			tokens.set('token_update_key', input_key.val());
			tokens.set('token_update_category', input_category.val());
			tokens.set('token_update_sub_category', input_sub_category.val());
			tokens.set('token_update_description', input_description.val());
			tokens.set('token_update_rationale', input_rationale.val());
			tokens.set('token_update_criteria_implication', input_criteria_implication.val());
			tokens.set('token_update_requirement_value', input_requirement_value.val());
			tokens.set('token_update_accepted', input_accepted.val());
			tokens.set('token_update_priority', input_priority.val());
			tokens.set('token_update_status', input_status.val());
			tokens.set('token_update_phase', input_phase.val());
			tokens.set('token_update_comment_po', input_comment_po.val());
			tokens.set('token_update_comment_supplier', input_comment_supplier.val());
		} else {
			/* --- New record --- */
			console.log('Submit button clicked, new record');
			/* tokens.set('create_tok', 'true'); */
			tokens.set('token_create_requirement_id', input_requirement_id.val());
			tokens.set('token_create_category', input_category.val());
			tokens.set('token_create_sub_category', input_sub_category.val());
			tokens.set('token_create_description', input_description.val());
			tokens.set('token_create_rationale', input_rationale.val());
			tokens.set('token_create_criteria_implication', input_criteria_implication.val());
			tokens.set('token_create_accepted', input_accepted.val());
			tokens.set('token_create_requirement_value', input_requirement_value.val());
			tokens.set('token_create_priority', input_priority.val());
			tokens.set('token_create_status', input_status.val());
			tokens.set('token_create_phase', input_phase.val());
			tokens.set('token_create_comment_po', input_comment_po.val());
			tokens.set('token_create_comment_supplier', input_comment_supplier.val());

			console.log('Values: token_create_requirement_id=', input_requirement_id.val())
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
