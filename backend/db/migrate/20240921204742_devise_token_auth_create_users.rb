class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.0]
  def change
    ## Required
    add_column :users, :provider, :string, null: false, default: "email"
    add_column :users, :uid, :string, null: false, default: ""

    ## Database authenticatable
    add_column :users, :encrypted_password, :string, null: false, default: ""

    ## Recoverable
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :allow_password_change, :boolean, default: false

    ## Rememberable
    add_column :users, :remember_created_at, :datetime

    ## Confirmable
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email, :string # Only if using reconfirmable

    ## User Info
    add_column :users, :name, :string
    add_column :users, :nickname, :string
    add_column :users, :image, :string
    # emailカラムは既に存在しているため、追加しない
    # add_column :users, :email, :string

    ## Tokens
    add_column :users, :tokens, :json

    ## Indexes
    add_index :users, :email, unique: true
    add_index :users, [:uid, :provider], unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token, unique: true
  end
end
