FactoryBot.define do
  factory :user do
    firstname { "井上" }
    lastname { "尚弥" }
    age { 31 }
    gender { 1 }
    email { "naoyaboxing@gmail.com" }
    password { "naoyaboxing" }
    password_confirmation { "naoyaboxing" }
  end
end
