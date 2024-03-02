# Install AWS CLI
https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html

# Install jq
```shell
brew install jq
```

# Install
```shell
yarn
```

# Test
```shell
yarn test
```

# Build & Push Image
```shell
# Build Image
image_name=fetch-google-trends
tag=$(date +"%Y-%m-%d_%H-%M-%S")
docker build --no-cache -t $image_name:$tag .

# Create ECR Repository
repository_name=$image_name
account_id=$(aws ecr create-repository --repository-name $repository_name | jq -r '.repository | .registryId')

# Login
region=ap-northeast-1
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $account_id.dkr.ecr.$region.amazonaws.com

# Add tag & Push
docker tag $image_name:$tag $account_id.dkr.ecr.$region.amazonaws.com/$repository_name:$tag
docker push $account_id.dkr.ecr.$region.amazonaws.com/$repository_name:$tag
```

----

# Delete Repository
```shell
repository_name=fetch-google-trends
aws ecr delete-repository --repository-name $repository_name --force
```