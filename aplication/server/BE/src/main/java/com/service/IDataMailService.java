package com.service;



import com.model.entity.DataMail;

import javax.mail.MessagingException;

public interface IDataMailService {
    void sendMail(DataMail dataMail, String templateName) throws MessagingException;
}
