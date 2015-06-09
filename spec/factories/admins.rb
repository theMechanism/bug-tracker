FactoryGirl.define do
  factory :admin do
    is_project_manager false
    name "Project Dev"
    email "myString@gmail.com"

    factory :project_manager do
      is_project_manager true
      name "Project Manager"
      email "pm@pm.com"
    end
  end

  

end
