package com.repository;

import com.model.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//TODO: should refactor name
@Repository
public interface ChatBotRepository extends JpaRepository<Movie, Long> {

}
