# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
  	name 'My Buggy Project'
    git_repo_url Faker::Internet.url
    dev_server_url Faker::Internet.url

    association :client, factory: :client
  end
end
