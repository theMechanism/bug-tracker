# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :client do
    name_of_co 'Big Client'
    email 'client@client.com'
    name_of_primary_contact 'Foo Barber'
  end
end
