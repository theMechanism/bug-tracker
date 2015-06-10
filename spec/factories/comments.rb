FactoryGirl.define do
  factory :comment do
    
    content Faker::Hacker.say_something_smart

    association :bug, factory: :bug
    association :admin, factory: :admin
  end
end
