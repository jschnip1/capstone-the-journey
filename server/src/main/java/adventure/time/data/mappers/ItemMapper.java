package adventure.time.data.mappers;

import adventure.time.models.Item;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemMapper implements RowMapper<Item> {


    @Override
    public Item mapRow(ResultSet resultSet, int i) throws SQLException {
        Item item = new Item();
        item.setItemId(resultSet.getInt("item_id"));
        item.setItemName(resultSet.getString("name"));
        item.setItemDescription(resultSet.getString("description"));
        item.setItemQuantity(resultSet.getInt("quantity"));
        item.setProfileId(resultSet.getInt("profile_id"));
        item.setPacked(resultSet.getBoolean("is_packed"));
        item.setTripId(resultSet.getInt("trip_id"));
        return item;
    }
}