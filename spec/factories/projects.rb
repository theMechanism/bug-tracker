# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
  	name 'My Buggy Project'
    client build(:client)
    git_repo_url 'repo@github.com'
    dev_server_url 'devserver.com'
  end
end
