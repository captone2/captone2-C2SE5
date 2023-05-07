package com.repository;


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

    @Query(value = "SELECT * FROM movietheater.comment " +
            "where movie_id = :id", nativeQuery = true)
    List<Comment> findAllCommentByMovieId(@Param("id") long id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `movietheater`.`comment` (`content`, `account_id`, `movie_id`, `seen`) " +
            "VALUES (:content, :account, :movie, :seen)", nativeQuery = true)
    void addNewComment(@Param("content") String content, @Param("account") int account,
                       @Param("movie") int movie, @Param("seen") int seen);

}
