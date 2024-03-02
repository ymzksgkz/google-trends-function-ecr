FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /app

COPY . .

RUN npm install -g yarn

RUN yarn

RUN yarn compile

RUN mkdir ../tempDir

RUN mv ./dist/* ../tempDir

RUN mv ./node_modules ../tempDir

RUN rm -rf ./*

RUN rm -rf ./.*

RUN mv ../tempDir/* .

RUN rm -rf ../tempDir

CMD ["app.lambdaHandler"]
