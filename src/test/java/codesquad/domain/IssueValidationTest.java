package codesquad.domain;

import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static codesquad.domain.UserTest.JAVAJIGI;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class IssueValidationTest {
    private static final Logger log = LoggerFactory.getLogger(UserValidationTest.class);

    private static Validator validator;

    @BeforeClass
    public static void setup() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void subjectWhenIsEmpty() throws Exception {
        Issue issue = new Issue("", "testComment1", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(1));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }

    @Test
    public void subjectWhenIsShort() throws Exception {
        Issue issue = new Issue("s", "testComment1", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(1));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }

    @Test
    public void commentWhenIsEmpty() throws Exception {
        Issue issue = new Issue("testSubject1", "", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(1));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }

    @Test
    public void commentWhenIsShort() throws Exception {
        Issue issue = new Issue("testSubject1", "c", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(1));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }

    @Test
    public void bothWhenIsEmpty() throws Exception {
        Issue issue = new Issue("", "", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(2));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }

    @Test
    public void bothWhenIsShort() throws Exception {
        Issue issue = new Issue("s", "c", JAVAJIGI, false, false);
        Set<ConstraintViolation<Issue>> constraintViolcations = validator.validate(issue);
        assertThat(constraintViolcations.size(), is(2));

        for (ConstraintViolation<Issue> constraintViolation : constraintViolcations) {
            log.debug("violation error message : {}", constraintViolation.getMessage());
        }
    }
}
