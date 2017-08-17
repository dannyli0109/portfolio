class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :img_url
      t.text :url
      t.text :github_url

      t.timestamps
    end
  end
end
