# Prerequisits

- Setup Azure SageMaker Notebook
    - Open the **Amazon SageMaker** console.
    - Choose **Notebook** instances, then choose **Create notebook instance**.
    - On the Create notebook instance page, for **Notebook instance name**, type a name for your notebook instance.
    - For Instance type, choose **ml.t2.medium**. This is the least expensive instance type that notebook instances support, and it suffices for this exercise.
    - For IAM role, choose **Create a new role**.
    - In the Create an IAM role box, choose **Any S3 bucket**, then choose Create role.
    - Choose **Create notebook instance**.

- Attach Policies to Sagemake
    - Choose the notebook instance you created in to open the details view.
    - In the Permissions and encryption section, choose the `IAM role ARN hyperlink`.
    - On the Role Summary page, choose `Attach policies`.
    - In the Filter policies search box, type IAMFull and select the `IAMFullAccess` policy.
    - Type PersonalizeFull and select the `AmazonPersonalizeFullAccess` policy.
    - Type S3Full and select the `AmazonS3FullAccess` policy.
    - Choose Attach policy.

Your IAM role should appear with the three full access policies you just added: IAMFullAccess, AmazonPersonalizeFullAccess, and AmazonS3FullAccess.

- Create a jupyter notebook and open `Open JupyterLab`. Import the [engage-nb.ipynb](../engage-nb.ipynb) file in the main README and select kernel `conda_python3`

- Generate AWS user access key and secret key and store it in `~/.aws/credentials` in the following format :
```
[default]
aws_access_key_id = <ACCESS_KEY>
aws_secret_access_key = <SECRET_ACCESS_KEY>
```
For this step refer : [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)



- Get your AWS Personalize Campaign ARN :
    - Open the Amazon Personalize console at https://console.aws.amazon.com/personalize/home and sign into your account.
    - On left Panel select `Dataset Groups` to open your created dataset groups
    - Select the dataset group you created to open it's details
    - Goto Custome resource section and select `view solutions` and select your solution
    - At the end of the page you will find Campaign using this solution and open yours
    - You will find your campaign Arn of the format : `arn:aws:personalize:<region-name>:<id>:dataset-group/<dataset-name>`


- Export the Campaign URN as : 
```
export PERSONALIZE_CAMPAIGN_ARN=<Campaign ARN>
```

# Run the server
```bash
# If go.mod not present
$ go mod init backend

$ go mod tidy

$ go build -o bin/backend

$ ./bin/backend
```
