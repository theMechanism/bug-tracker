# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :client do
    name_of_co Faker::Company.name
    email Faker::Internet.email
    name_of_primary_contact 'Foo Barber'
    password 'reallygoodpassword'
  end
end
