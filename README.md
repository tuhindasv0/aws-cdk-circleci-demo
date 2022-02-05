Initialize a project using cdk init command. Developer will create project for each microservices. With Ckd init command it will create a basic project structure with foleder like (lib,bin,test etc.). I would suggest Developers to create a separate folder (e.g. resource) where they can write the required code.  

Setp 2:
Go to Lib folder where we get one .js file. Where we need to configure aws resources and manage dependencies between resources.



Step 3:
Define all the required AWS resources inside JS file.
 Here I am creating one AWS lambda,A resource policy and attaching the policy to AWS lambda.

Step 3:
Cdk synth  will create a cloudformation template based on the above  mentioned JS file. So, we are going to use the CDK synth command in circleci configuration file to create the template.

Step 4:
Create .circleci folder and create config.yml inside the folder
Here I am using latest Node docker image to build. 
After installing aws-cdk and other required node modules. We need to bootstrap the AWS environment where we are going to deploy our app.
cdk bootstrap aws://${AWS_ACCOUNt}/us-east-1
The above command will help us to bootstrap the environment.
cdk synth
Above command will help us automatically create the cloudformation template for us, After creation of cloudformation template we need to deploy the same in our AWS account.
cdk deploy --require-approval never
Above command will deploy our Stack/app in our AWS account.



Add api gateway and its methods