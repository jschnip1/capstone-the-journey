package adventure.time.data;

import adventure.time.data.mappers.ItemMapper;
import adventure.time.models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ItemJdbcTemplateRepository implements ItemRepository{

    private final JdbcTemplate jdbcTemplate;

    public ItemJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Item findById(int itemId) {
        final String sql = "select item_id, `name`, `description`, quantity, profile_id, is_packed, trip_id " +
                "from item where item_id = ?;";

        return jdbcTemplate.query(sql, new ItemMapper(), itemId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<Item> findByTripId(int tripId) {
        final String sql = "select item_id, `name`, `description`, quantity, profile_id, is_packed, trip_id " +
                "from item where trip_id = ?;";

        return jdbcTemplate.query(sql, new ItemMapper(), tripId);
    }

    @Override
    public List<Item> findByProfileId(int profileId) {
        final String sql = "select item_id, `name`, `description`, quantity, profile_id, is_packed, trip_id " +
                "from item where profile_id = ?;";

        return jdbcTemplate.query(sql, new ItemMapper(), profileId);
    }

    @Override
    public Item add(Item item) {
        if(item == null){
            return  null;
        }

        final String sql = "insert into item (`name`, trip_id, profile_id, description, quantity, is_packed) " +
                "values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getItemName());
            ps.setInt(2, item.getTripId());
            ps.setInt(3, item.getProfileId());
            ps.setString(4, item.getItemDescription());
            ps.setInt(5, item.getItemQuantity());
            ps.setInt(6, 0);
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());

        return item;
    }

    @Override
    public boolean update(Item item) {
        if(item == null){
            return false;
        }

        final String sql = "update item set " +
                "`name` = ?, trip_id = ?, profile_id = ?, description = ?, quantity = ?, is_packed = ? " +
                "where item_id = ?;";

        return jdbcTemplate.update(sql,
                item.getItemName(),
                item.getTripId(),
                item.getProfileId(),
                item.getItemDescription(),
                item.getItemQuantity(),
                item.isPacked(),
                item.getItemId()) > 0;
    }

    @Override
    public boolean deleteById(int itemId) {
        return jdbcTemplate.update("delete from item where item_id = ?;", itemId) > 0;
    }
}
