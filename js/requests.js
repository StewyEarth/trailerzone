document.addEventListener("DOMContentLoaded", function () {
    var requestList = document.querySelector(".request-list");
    var requestForm = document.querySelector(".request-add-form");
    requestForm.addEventListener("submit",function(event){
        var requestFormInput = document.querySelector(".request-input");
        event.preventDefault();
        if(requestFormInput.value != 0){

            requestFormInput.classList.remove("request-input--error");
            requestFormInput.setAttribute("placeholder", "Make a request here");

            var newli = document.createElement("li");
            newli.classList.add("request-item");
    
            var newh3 = document.createElement("h3");
            newh3.classList.add("request-title","text--darkgray");
            var newH3Text = document.createTextNode(requestFormInput.value);
            requestFormInput.value = "";
    
            var newdiv = document.createElement("div");
            newdiv.classList.add("voting");
    
            var newVotingCountP = document.createElement("p");
            newVotingCountP.classList.add("votingcount");
            var votingText = document.createTextNode("0")
    
            var newUpvoteBtn = document.createElement("button");
            newUpvoteBtn.classList.add("button--green","button-voting","upvote");
            var newUpvoteBtnIcon = document.createElement("i");
            newUpvoteBtnIcon.classList.add("fas","fa-arrow-up");
    
            var newDownvoteBtn = document.createElement("button");
            newDownvoteBtn.classList.add("button--red","button-voting","downvote");
            var newDownvoteBtnIcon = document.createElement("i");
            newDownvoteBtnIcon.classList.add("fas","fa-arrow-down");
    
            var newVotedBtn = document.createElement("button");
            newVotedBtn.classList.add("button--lightblue","voted","hidden");
            var VotedBtnText = document.createTextNode("Voted");
            
            newVotingCountP.appendChild(votingText);
            newh3.appendChild(newH3Text);
            newdiv.appendChild(newVotingCountP);
            newdiv.appendChild(newUpvoteBtn);
            newdiv.appendChild(newDownvoteBtn);
            newdiv.appendChild(newVotedBtn);
            newDownvoteBtn.appendChild(newDownvoteBtnIcon);
            newUpvoteBtn.appendChild(newUpvoteBtnIcon);
            newVotedBtn.appendChild(VotedBtnText);
            newli.appendChild(newh3);
            newli.appendChild(newdiv);
            requestList.appendChild(newli)
        }else{
            requestFormInput.classList.add("request-input--error");
            requestFormInput.setAttribute("placeholder", "Please enter something");
        }
    });
/**
 * Listens for a upvote or downvote click and changes ajecent value.
 */
    requestList.addEventListener("click",function(event){
        if(event.target.classList.contains("button-voting")){
            var votingDiv = event.target.parentElement;
            var votingDivP = votingDiv.firstElementChild;
            if (event.target.classList.contains("upvote")){
                var votevalue = votingDivP;
                votevalue.textContent = parseInt(votevalue.textContent) + 1;
    
            }else if (event.target.classList.contains("downvote")){
                var votevalue = votingDivP;
                votevalue.textContent = parseInt(votevalue.textContent) - 1;
            }
            var voteButtons = votingDiv.querySelectorAll(".button-voting");
            var voteButton = votingDiv.querySelector(".voted")
            console.log(voteButton)
            voteButtons.forEach(button => {
                button.classList.add("hidden");
            });
            voteButton.classList.remove("hidden");
        }
    });
});