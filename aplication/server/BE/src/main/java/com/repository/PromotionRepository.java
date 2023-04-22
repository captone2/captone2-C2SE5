package com.repository;

import com.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface PromotionRepository extends JpaRepository<Food, Long> {
}
