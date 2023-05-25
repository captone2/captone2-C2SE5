package com.repository;


import com.model.dto.dto.CommentDTO;
import com.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT * FROM comment " +
            "where movie_id = :id", nativeQuery = true)
    List<Comment> findAllCommentByMovieId(@Param("id") long id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO comment(`content`, `rate`, `account_id`, `movie_id`) " +
            "VALUES (:content, :rate, :accountId, :movieId)", nativeQuery = true)
    void addNewComment(@Param("content") String content, @Param("rate") int rate, @Param("accountId") int account,
                       @Param("movieId") int movie);


}
