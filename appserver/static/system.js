/*
	
	system.js

	Code file for system.xml

	kvs_scmdb_system

*/

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
	var input_fqdn = $('[name="name_sys_fqdn"]');
	var input_description = $('[name="name_sys_description"]');
	
	var input_role = $('[name="name_sys_role"]');
	var input_environment = $('[name="name_sys_environment"]');
	var input_network_zone = $('[name="name_sys_network_zone"]');
	var input_ad_domain = $('[name="name_sys_ad_domain"]');
	var input_ipv4 = $('[name="name_sys_ipv4"]');
	var input_ipv6 = $('[name="name_sys_ipv6"]');
	var input_os = $('[name="name_sys_os"]');
	var input_contact = $('[name="name_sys_contact"]');
	var input_vm_cluster = $('[name="name_sys_vm_cluster"]');
	
	
	
    tableCollection.on('click', function(e){
		e.preventDefault();

		/* --- Variables for values --- */
		var val_key;
		var val_application_id;
		var val_host_name;
		var val_fqdn;
		var val_description;
		var val_role;
		var val_environment;
		var val_network_zone;
		var val_ad_domain;
		var val_ipv4;
		var val_ipv6;
		var val_os;
		var val_contact;
		var val_vm_cluster;
		

		if(e['field'] === 'Update'){ 
			/* --- Pull values from the current table row --- */
			val_key = e.data['row._key'];
			val_application_id = e.data['row.sys_application_id'];
			val_host_name = e.data['row.sys_host_name'];
			val_fqdn = e.data['row.sys_fqdn'];
			val_description = e.data['row.sys_description'];
			val_role = e.data['row.sys_role'];
			val_environment = e.data['row.sys_environment'];
			val_network_zone = e.data['row.sys_network_zone'];
			val_ad_domain = e.data['row.sys_ad_domain'];
			val_ipv4 = e.data['row.sys_ipv4'];
			val_ipv6 = e.data['row.sys_ipv6'];
			val_os = e.data['row.sys_os'];
			val_contact = e.data['row.sys_contact'];
			val_vm_cluster = e.data['row.sys_vm_cluster'];

			
			console.log('UPDATE>val_application_id=', val_application_id);
			console.log('UPDATE>val_host_name=', val_host_name);

			/* --- Insert values from rows into input fields --- */
			input_key.val(val_key);
			input_application_id.val(val_application_id);
			input_host_name.val(val_host_name);
			input_fqdn.val(val_fqdn);
			input_description.val(val_description);
			input_role.val(val_role);
			input_environment.val(val_environment);
			input_network_zone.val(val_network_zone);
			input_ad_domain.val(val_ad_domain);
			input_ipv4.val(val_ipv4);
			input_ipv6.val(val_ipv6);
			input_os.val(val_os);
			input_contact.val(val_contact);
			input_vm_cluster.val(val_vm_cluster);

			
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

			tokens.set('token_update_application_id', input_application_id.val());
			tokens.set('token_update_key', input_key.val());
			tokens.set('token_update_host_name', input_host_name.val());
			tokens.set('token_update_fqdn', input_fqdn.val());
			tokens.set('token_update_description', input_description.val());
			tokens.set('token_update_role', input_role.val());
			tokens.set('token_update_environment', input_environment.val());
			tokens.set('token_update_network_zone', input_network_zone.val());
			tokens.set('token_update_ad_domain', input_ad_domain.val());

			tokens.set('token_update_ipv4', input_ipv4.val());
			tokens.set('token_update_ipv6', input_ipv6.val());
			tokens.set('token_update_os', input_os.val());
			tokens.set('token_update_contact', input_contact.val());
			tokens.set('token_update_vm_cluster', input_vm_cluster.val());

			console.log('UPDATE>input_ipv4', input_ipv4.val());
			console.log('UPDATE>input_ipv6', input_ipv6.val());
			console.log('UPDATE>update_os', update_os.val());
			console.log('UPDATE>input_contact', input_contact.val());
			console.log('UPDATE>input_vm_cluster', input_vm_cluster.val());

		} else {
			/* --- New record --- */
			console.log('NEW RECORD');
			/* tokens.set('create_tok', 'true'); */
			console.log('NEW: token_create_host_name=', input_host_name.val())
			console.log('Values: token_create_application_id=', input_application_id.val())

			tokens.set('token_create_application_id', input_application_id.val());
			tokens.set('token_create_host_name', input_host_name.val());
			tokens.set('token_create_fqdn', input_fqdn.val());
			tokens.set('token_create_description', input_description.val());
			tokens.set('token_create_role', input_role.val());
			tokens.set('token_create_environment', input_environment.val());
			tokens.set('token_create_network_zone', input_network_zone.val());
			tokens.set('token_create_ad_domain', input_ad_domain.val());
			tokens.set('token_create_ipv4', input_ipv4.val());
			tokens.set('token_create_ipv6', input_ipv6.val());
			tokens.set('token_create_os', input_os.val());
			tokens.set('token_create_contact', input_contact.val());
			tokens.set('token_create_vm_cluster', input_vm_cluster.val());

			console.log('NEW>input_ipv4', input_ipv4.val());
			console.log('NEW>input_ipv6', input_ipv6.val());
			console.log('NEW>update_os', update_os.val());
			console.log('NEW>input_contact', input_contact.val());
			console.log('NEW>input_vm_cluster', input_vm_cluster.val());
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
