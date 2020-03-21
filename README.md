# aws-sendy-contact-form

Just 2 files

index.html is the html/javascript that displays the form, and submits it to AWS

index.js is the code for the Lambda endpoint on AWS.  This will send the contact email and add user as subscriber to a sendy list if user has consented (via checkbox)

1 sign up for AWS https://aws.amazon.com/console/
1 setup AWS lambda express (node js) and use the code here.  Update the variables to be your values
1 setup AWS API gateway to point to your lambda.   Enable CORS
1 setup AWS SES
1 setup sendy https://sendy.co/
