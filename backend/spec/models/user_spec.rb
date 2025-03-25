require 'rails_helper'

RSpec.describe User, type: :model do
  it 'ユーザーデータが適切であること' do
    expect(build(:user)).to be_valid
  end

  it 'ユーザー名（性）がなければ無効であること' do
    user = build(:user, firstname: nil)
    expect(user).to be_invalid
  end

  it '年齢がなければ無効であること' do
    user = build(:user, age: nil)
    expect(user).to be_invalid
  end

  it '性別がなければ無効であること' do
    user = build(:user, gender: nil)
    expect(user).to be_invalid
  end

  it 'メールアドレスがなければ無効であること' do
    user = build(:user, email: nil)
    expect(user).to be_invalid
  end

  it 'メールアドレスは一意であること' do
    create(:user)
    duplicate_user = build(:user, email: 'naoyaboxing@gmail.com')
    expect(duplicate_user).to be_invalid
  end

  it 'パスワードがなければ無効であること' do
    user = build(:user, password: nil)
    expect(user).to be_invalid
  end
end
