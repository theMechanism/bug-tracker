# This file is used by Rack-based servers to start the application.

map '/' do
  require ::File.expand_path('../config/environment',  __FILE__)
  run Rails.application
end

map '/fake_external_app' do

end