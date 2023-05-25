package com.repository;

import com.model.entity.Food;
import com.model.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query(value = "SELECT * FROM food where is_enabled = 1 ORDER BY id DESC", nativeQuery = true)
    List<Food> findAllFood();

    @Transactional
    @Modifying
    @Query(value = "UPDATE food\n" +
            "    SET is_enabled = 0\n" +
            "    WHERE id = :id", nativeQuery = true)
    void deleteFood(@Param("id") Long id);
}
