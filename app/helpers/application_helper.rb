module ApplicationHelper
    def is_admin?
       current_admin.present?
    end
    def deny_access
        redirect_to '/admin'
    end

    def namespaced_assets(params)
      # in the assets pipeline, three manifests are defined
      # for the three app contexts
      # 1. dashboard (mech facing for managing projects)
      # 2. iframe (as lightweight as possible)
      # 3. client facing app 

      # rails easily retrieves controller specific js 
      # but needs a custom method (it seems... perhaps I'm wrong)
      # to retrieve namespaced js, that is not single controller specific
      # so -- string parse method to retrieve the correct manifest 
      # this method is not called in iframe layout, bc theres only one controller, and namespace not necessary
      # but for client + dashboard namespaces, must parse within the js include tag
      p '$' *80
      p "in a helper method - whoop"
      p "#{params.inspect}"

      p "#{params.split('/')[0].inspect}"
      params.split('/')[0]
    end
end
