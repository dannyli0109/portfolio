class AddDescriptionAndSubHeadingToProject < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :descriptions, :text
    add_column :projects, :sub_heading, :string
  end
end
