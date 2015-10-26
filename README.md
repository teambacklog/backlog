# Backlog

Backlog is a web app that prioritizes task list designed for people with many
tasks and have sporadic time to accomplish those tasks. The way Backlog works
is that it sorts the person’s tasks based on a combination of urgency,
estimated work time and priority of the task. The application keeps track of
the user’s progress on a certain task and suggests a task to work on for any
given duration that the user can spare. This decreases mental overhead when
choosing between tasks to do as well as keep track of their overall activity.

## Testing resources:
[Jasmine Tutorial](http://jasmine.github.io/2.1/introduction.html)

[Doctor Llama's Velocity Tutorial](https://doctorllama.wordpress.com/2014/09/22/bullet-proof-internationalised-meteor-applications-with-velocity-unit-testing-integration-testing-and-jasmine/)

### Run without Velocity(testing): 

    VELOCITY=0 meteor

## Run with Velocity(testing):

    JASMINE_SERVER_UNIT=1 meteor

## Reset the local database: 

    meteor reset

## Set heroku branch to master: 
    git fetch origin
    git reset --hard origin/master

