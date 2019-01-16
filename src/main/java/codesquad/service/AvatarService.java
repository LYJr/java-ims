package codesquad.service;

import codesquad.ApplicationConfigurationProp;
import codesquad.UnsupportedFormatException;
import codesquad.domain.Attachment;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.rmi.UnexpectedException;
import java.util.Locale;

import static org.slf4j.LoggerFactory.getLogger;

@Service
public class AvatarService {

    @Autowired
    private ApplicationConfigurationProp applicationConfigurationProp;

    @Autowired
    private Attachment dummyAvatar;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = getLogger(AvatarService.class);

    public Attachment createAvatar(MultipartFile multipartFile) throws IOException {
        if (multipartFile != null) {
            String originFileName = multipartFile.getOriginalFilename();
            if (!Attachment.extensionCheck(originFileName, applicationConfigurationProp.getSuffix())) {
                throw new UnsupportedFormatException(
                        messageSource.getMessage("error.not.supported", null, Locale.getDefault()));
            }
            Attachment attachment = Attachment.of(originFileName, applicationConfigurationProp.getPath());
            return attachment.createAttachment(multipartFile.getInputStream());
        }
        return dummyAvatar;
    }
}
