class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.integer :age
      t.integer :gender
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
