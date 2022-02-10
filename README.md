# MLDB Chat APP FE - Next.js

## 📖 Project description

A chat messaging app built using Next.js.

## 📖 Setup
### 1. Chat Server

Setup Chat Server in locally download it from the [Repo](https://github.com/monstar-lab-bd/mlbd-chat-api-nodejs). Recommended version is 1.1.0

### 2. Frontend Setup
Install dependencies:
- `yarn install`

With the .env file:
```.env
NODE_ENV=
NEXT_PUBLIC_API_HOST=
NEXT_PUBLIC_API_HOST_LOGIN=
```
Modify the following fields to point to the environment to work in. 

- `NODE_ENV`: This indicated app running environment.
- `NEXT_PUBLIC_API_HOST`: This is the url to the api that represents Chat services.
- `NEXT_PUBLIC_API_HOST_LOGIN`: This is the url to the api that represents Users services. 

Run the development server
- `yarn dev`

To build for production:

- `yarn build`

## 🏯 Architecture & frameworks
What architecture does the project follow?

- Unidirectional User Interface Architecture
- Redux

What folder organization strategy are followed?
- Feature First Organization (you can read [great article](https://medium.com/front-end-weekly/the-secret-to-organization-in-functional-programming-913484e85fc9) about this)

What frameworks are followed?

- [Create React App](https://github.com/facebook/create-react-app)
- [TypeScript](https://www.typescriptlang.org/): Programming meta-language for Javascript providing type-safety and maintainability.

## 🔗 Useful links
- [Trello - MLBD Chat](https://trello.com/en)

## 💻 Contributors
- [@somratAtSekaiLab](https://github.com/somratAtSekaiLab)
- [@shimul](https://github.com/shimul)
- [@mamun](https://github.com/mamum)
- [@faquraeshi](https://github.com/faquraeshi)
- [@azmul-ml](https://github.com/azmul-ml)
