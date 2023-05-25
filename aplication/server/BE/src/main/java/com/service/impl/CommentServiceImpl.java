package com.service.impl;

import com.model.dto.CommentDTO1;
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
    public void addNewComment(CommentDTO1 commentDTO1) {
        System.out.println(commentDTO1.getContent());
        System.out.println(commentDTO1.getRate());
        System.out.println(commentDTO1.getAccountId());
        System.out.println(commentDTO1.getMovieId());
        commentRepository.addNewComment(commentDTO1.getContent(), commentDTO1.getRate() , commentDTO1.getAccountId() , commentDTO1.getMovieId());
    }

}
