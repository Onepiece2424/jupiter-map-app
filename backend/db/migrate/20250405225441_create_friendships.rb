class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :user, null: false, foreign_key: { to_table: :users }  # ユーザー
      t.references :friend, null: false, foreign_key: { to_table: :users }  # 友達

      t.timestamps
    end

    add_index :friendships, [:user_id, :friend_id], unique: true  # 重複する友達関係を防ぐ
    add_index :friendships, [:friend_id, :user_id]  # 双方向検索を効率化
  end
end
