# User Stories

# Users

### Sign Up
- As an unregisterd and unauthorized user, i want to be able to sign up for the website via a sign-up form. 
    - When I'm on the `/signup` page:
        - I would like to be able to enter my email, usernam, and password on a form. 
        - Once signed up, i should be able to navigate the website freely, 
    - When i enter invalid data or already taken userName or email:
        - i would like the website to inform  me of the validations I failed to pass, and repopulate the form with valid entries. 
    
### Log In 
- As a registered and unauthorized user, i want to be able to log in to a website via a log-in form. 
    - When I'm on the `/login` page:
        - I would like to be able to enter my email and password on a form.
        - Upon successful completion of the form website should be able to log me in and i should be able to navigate the website. 
    - When i enter invalid data:
        - I would like the website to inform me of the failed invalidations, and repopulate the form with my valid entries. So that i can try again. 

### Demo User

- As an unregisterd and un authorized user, I would like a button on the `/signup` and `/login` pages to allow me to visit the site as a user without signing up. 
    - When I'm on either the `/signup` or `/login` pages:
        - I can click the Demo User button to log me in and allow me to navigate the site as a normal user. 
        - I should be able to test all the site's features and functionality without any credentials. 

## Interviews 

### Create Interviews

- As a logged in user, I want to be able to create a new interview.
    - on the left sidebar, i should be able to clicke the add interview button, a modal pops up and says create interview. There should be a form which can be filled out. 
    - Once i click the green button that says create interview, it should create the interview the the database.

### Viewing Interviews

- As a logged in user, I should be able to view all interviews by clicking the all interviews button which is located in the sidebar.
    - On the dashboard users should be able to see the total amount of pending, scheduled, and declined interviews. 
    - on the dashboard there should be a graph that displays the ratio of interviews per month. 
- As a logged in user, By clicking the community page I should be able to see the upcoming and declined interviews of other users. 
    

### Updting Interviews

- As a logged in user, i can click on the edit page on each interview which opens up a modal opens. 
    - Modal should have a form with populated data and user should be able to edit the form data. 
    - User should be able to edit any info of the interview and the status of the interview. 
    - Upon clicking the save changes button. Modal should close and changes you should be seen. 

### Deleting Interviews
- As a logged in user, I can delete the inteview
    - When user clicks the delete button on the interview and modal pops up.
    - modal should confirm if user wants to delete the interview. 
    - upon clicking the red delete button user should be able to delete the interview.

## Comment 

### Create Comment 

- As a logged in users, I should be able to comment under other users upcoming and decline interviews. 
    - under the interivew there should be a text area with post button. 
    - upon entring text and clicking post. the comment should appear under the interview. 

### View Comment

- As a logged in user, I should be able to see all the comments related to the inteviews. 

### Delete Comment

- As a logged in user, I should be able to delete any comment that belongs to me. 
    - upon clicking the red delete button on the comment, a delete modal should pop up. 
    - The modal should have a confirm message with a red delete button. 
    - upon delete the comment should disappear from the interview. 

### Update Comment

- As a logged in user, I should be able to update any comment that belongs to me. 
    - Upon clicking the blue edit button should open a modal with the confirm message and form with populated data. 
    - Upon clicking the green save changes button should close the modal and present the changed comment. 

## Favorite List

### Create List 

- As a logged in user, I should be able to create a favorite list by clicking the green create list btutton. 
    - A modal should pop up with the form, allowing me to input the info. 
    - Upon submiting i should see the new list on the side bar.  

### View List 

- On the side bar i should be able to see all the favorite list
    - Clicking the list should open a page that has all the job realted to that list 

### Update List 

- As a logged in user, I shoule be able to update the list name by clicking the elipsies icon.
 - Upon clicking the elipsies icon a delete button should show up and clicking it should open a modal pop should open with a from. 
 - The form should be populated with a green save changes button at the bottom. 
 - Upon submittig the form, the modal should close and i shoule be redirected to the dashboard. 
 - I should see the new changes. 

### Delete List 
- As a logged in user, I should be able to delete a list by clicking the elipsies icon. 
    - Upon clicking the elipses icon a edit button should show up and clicking it should open a modal. 
    - There should be a confirm message, and a red delete button 
    - Upon clicking the delete button, the modal shoule close and i should be redirected to the dashborad. 
    - I should not see the list in the side bar. 











