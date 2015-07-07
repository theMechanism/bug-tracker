# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

case Rails.env
when "development"

  Admin.create(
    name: 'Avi FR',
    password: 'password',
    email: 'avi.fox-rosen@themechanism.com'
  )

  Admin.create(
    name: 'Dhruv M',
    password: 'password',
    email: 'dhruv.mehrotra@themechanism.com'
  )
  clients = []
  admins = []

  clients << Client.create(email: 'avi.fox-rosen@themechanism.com',
      name_of_co: 'Avi FR Manufacturing',
      name_of_primary_contact: 'Avi Client',
      misc_info: 'who the hell owns this company anyway ?',
      password: 'password'
    )
  
  10.times do 
    clients << Client.create(email: Faker::Internet.email,
      name_of_co: Faker::Company.name,
      name_of_primary_contact: Faker::Name.name,
      misc_info: Faker::Hacker.say_something_smart,
      phone: Faker::PhoneNumber.phone_number,
      password: Faker::Internet.password
    )

    admins << Admin.create(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      password: Faker::Internet.password
    )

  end

  pm = admins.pop
  pm.update_attributes(is_project_manager: true, name: 'Joe Constantino')

  30.times do 
    clients.sample.projects.create(
      name: Faker::Commerce.product_name,
      blurb: Faker::Hacker.say_something_smart,
      admin: pm, 
      git_repo_url: Faker::Internet.url,
      dev_server_url: Faker::Internet.url
    )
  end

  projects = Project.all

  projects.each do |proj|
    5.times do 
      proj.bugs.create(
        description: Faker::Lorem.sentence, 
        admin: admins.sample,
        name: Faker::Lorem.word
      )
    end
  end

  bugs = Bug.all

  30.times do 
    bugs.sample.comments.create(
      content: Faker::Hacker.say_something_smart,
      admin: admins.sample
    )
  end

when "production"
   
end