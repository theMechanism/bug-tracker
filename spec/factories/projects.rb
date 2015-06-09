# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
  	name 'My Buggy Project'
    git_repo_url 'www.repo@github.com'
    dev_server_url 'www.evserver.com'

    association :client, factory: :client
  end
end
