class Client < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :projects,
    	dependent: :destroy

  validates_uniqueness_of :name_of_co, :email
  validates_presence_of :name_of_co

end
