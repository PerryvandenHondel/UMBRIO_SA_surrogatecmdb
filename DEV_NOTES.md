col_scmdb_application
    >app_name
    >app_application_id
    >app_type
        Server
        Client
        Webbased
    >app_description
    >app_contact
        E-mail Contact DisplayName
    >app_functional_support
        E-mail Contact DisplayName
    >app_technical_support
        E-mail Contact DisplayName
    >app_url
        https://www.name.com
    >app_created_date
    >app_updated_date
    >app_created_user
    >app_updated_user




col_scmdb_system
    >sys_host_name
    >sys_application_id
        Linked to col_scmdb_application-->app_application_id
    >sys_fqdn
        hostname.domain.local
    >sys_description
    sys_role
    sys_environment (drop down list)
        Development
        Test
        Acceptance
        Production
        DMZ
    sys_network_zone
    sys_domain
    sys_ipv4
        111.222.333.444
    sys_ipv6
    sys_os
    sys_contact
        E-mail Contact DisplayName
    sys_vm_cluster
    >sys_created_date
    >sys_updated_date
    >sys_created_user
    >sys_updated_user


token_search_create">

    depends="$token_create_application_id$,
      $token_create_name$">
  -->


  <search id="token_search_update" depends="$token_update_key$, 
      $token_update_application_id$,
      $token_update_name$">


<search id="token_search_delete" depends="$token_delete_key$">


2020-11-29
BEFORE REMOVING depends from searches in system.xml
 <search id="token_search_create" depends="$token_create_application_id$,
      $token_create_host_name$,
      $token_create_fqdn$,
      $token_create_description$">
    <query>
      | inputlookup kvs_scmdb_system 
      | append [ stats count
        | eval sys_application_id="$token_create_application_id$" 
        | eval sys_host_name="$token_create_host_name$" 
        | eval sys_fqdn="$token_create_fqdn$" 
        | eval sys_description="$token_create_description$" 
        | eval sys_created_date=now()
        | eval sys_updated_date=now()
        | eval sys_created_user="$env:user$"
        | eval sys_updated_user="$env:user$"]
      | table sys_application_id, sys_host_name, sys_fqdn, sys_description, sys_created_date, sys_updated_date, sys_created_user, sys_updated_user
      | outputlookup kvs_scmdb_system
    </query>  
  </search>


  <search id="token_search_update" depends="$token_update_key$, 
      $token_update_application_id$,
      $token_update_host_name$,
      $token_update_fqdn$,
      $token_update_description$">
    <query>
      | inputlookup kvs_scmdb_system 
      | eval key=_key 
      | WHERE key="$token_update_key$" 
      | eval sys_application_id="$token_update_application_id$"
      | eval sys_host_name="$token_update_host_name$"
      | eval sys_fqdn="$token_update_fqdn$" 
      | eval sys_description="$token_update_description$" 
      | eval sys_updated_date=now()
      | eval sys_updated_user="$env:user$"
      | outputlookup kvs_scmdb_system append=t
    </query>  
  </search>
  
    
  <search id="token_search_delete" depends="$token_delete_key$">
    <query>
      | inputlookup kvs_scmdb_system
      | eval key=_key
      | WHERE NOT key="$token_delete_key$"
      | outputlookup kvs_scmdb_system
    </query>
  </search>

