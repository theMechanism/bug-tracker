FactoryGirl.define do
  factory :admin do
    
    is_project_manager false
    name "Project Dev"
    email Faker::Internet.email

    factory :project_manager do
      is_project_manager true
      name "Project Manager"
      email Faker::Internet.email
    end
  
  end

  

end
