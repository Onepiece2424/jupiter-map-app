FactoryBot.define do
  factory :user do
    firstname { "井上" }
    lastname { "尚弥" }
    email { "naoyaboxing@gmail.com" }
    password { "naoyaboxing" }
    password_confirmation { "naoyaboxing" }
  end
end
