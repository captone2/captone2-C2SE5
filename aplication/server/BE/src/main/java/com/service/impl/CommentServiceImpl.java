package com.service.impl;

import com.model.dto.CommentDTO;
import com.model.entity.Comment;
import com.repository.CommentRepository;
import com.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;


    @Override
    public List<Comment> findAllCommentByMovieId(long id) {
        return commentRepository.findAllCommentByMovieId(id);
    }


    @Override
    public void addNewComment(CommentDTO commentDTO) {
        commentRepository.addNewComment(commentDTO.getContent(), commentDTO.getRate() , commentDTO.getAccountId() , commentDTO.getAccountId());
    }

}
