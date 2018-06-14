package codesquad.web;

import codesquad.domain.Issue;
import codesquad.domain.User;
import codesquad.dto.IssueDto;
import codesquad.security.LoginUser;
import codesquad.service.IssueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("/issues")
public class IssueController {

    private static final Logger log = LoggerFactory.getLogger(IssueController.class);
    @Resource(name = "issueService")
    private IssueService issueService;

    @GetMapping("/form")
    public String form(@LoginUser User loginUser) {
        return "/issue/form";
    }

    @PostMapping("")
    public String create(@LoginUser User writer, IssueDto issue) {
        issueService.addIssue(writer, issue.toIssue());
        return "redirect:/";
    }

    @GetMapping("/{id}")
    public String show(@PathVariable long id, Model model) {
        model.addAttribute("issue", issueService.findById(id));
        return "/issue/show";
    }

    @GetMapping("/{id}/form")
    public String updateForm(@LoginUser User loginUser, @PathVariable long id, Model model) {
        model.addAttribute("issue", issueService.checkOwner(id, loginUser));
        log.debug("Success");
        return "/issue/updateForm";
    }

    @PutMapping("/{id}")
    public String update(@LoginUser User loginUser, @PathVariable long id, IssueDto target){
        log.debug("IssueDto : {}", target);
        issueService.update(id, loginUser, target);
        return "redirect:/";
    }

    @DeleteMapping("/{id}")
    public String delete(@LoginUser User loginUser, @PathVariable long id){
        issueService.delete(id, loginUser);
        return "redirect:/";
    }
}
