require 'socket'

module IframesHelper
  include Rails.application.routes.url_helpers

  
  def load_script_via_ssl_connection
    default_url_options = {
      host: Rails.env == 'production' ? Socket.gethostname : 'localhost',
      protocol: 'https'
    }
    project_iframe_load_script_url(Project.first, default_url_options)
  end

end
