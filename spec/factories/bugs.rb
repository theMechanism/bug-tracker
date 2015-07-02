# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bug do
  	description 'Everything is broken'
    name 'not blank'

    association :project, factory: :project

    trait :w_admin do
      association :admin, factory: :admin
    end
  end
end
