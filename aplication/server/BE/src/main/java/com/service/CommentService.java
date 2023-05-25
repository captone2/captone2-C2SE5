package com.service;

import com.model.dto.CommentDTO1;
import com.model.entity.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> findAllCommentByMovieId(long id);
    void addNewComment(CommentDTO1 commentDTO);
}
