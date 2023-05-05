package com.repository;


import com.model.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long> {


    @Query(value = "select * from screen ", nativeQuery = true)
    List<Screen> findAll();


    List<Screen> findAllByName(String name);

}
