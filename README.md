# Welcome to the Dev Days Labs Experience

We are excited to have you join us on this journey to enhance your knowledge and skills in identity management, authentication, and authorization using Auth0. This series of hands-on labs will guide you through securing and improving the **Learn Identity** application.

**Learn Identity** is an educational Next.js web application designed to bridge the gap between identity experts and eager students. The application allows instructors to generate identity-related courses and for students to enroll and learn from them.

**But Learn Identity needs your help!** The application, as it stands, is not secure; anyone can access and edit any content. We have received complaints from users who want to get rid of passwords, but that’s all we offer right now. Admins are eager to enforce that instructors use additional authentication factors such as OTP and security keys.

By downloading the application and completing the labs, you'll help secure and improve the experience for the application.

## Hands-on labs

The Dev Days Labs Experience is structured into a series of progressive and independent labs, each focusing on different aspects of identity management and security. These labs will guide you through a variety of hands-on tasks, from setting up your development environment to implementing advanced authentication mechanisms.

As you work through the labs, you will incrementally enhance the security and functionality of the Learn Identity application. You will start by establishing a solid foundation with basic authentication and gradually progress to more advanced topics such as multifactor authentication, fine-grained access control, and passwordless login methods.

By the end of the series, you will have a secure and well-protected application, ready to handle a variety of authentication and authorization challenges.

Whether you are new to Auth0 or looking to deepen your knowledge, these labs will equip you with practical skills and insights that you can apply to your own projects. Let's embark on this exciting journey to secure and enhance the Learn Identity application together!

[![DevDay24 Labs](https://img.shields.io/badge/Visit-%20DevDay24%20Labs-3f59e4?style=for-the-badge)](https://a0.to/devday24/labs)

## Set Up

We have created a special lab containing all the instructions that you need to set this application up.

Visit the instructions lab at: https://a0.to/devday24/labs/lab-setup

Alternatively, if you are already familiar with setting up a NextJS application with Auth0, here are the specific steps to setup this app.

1. Clone the repository: Navigate to the desired directory on your computer via Terminal or Command-Line, and enter the following command:

```
git clone https://github.com/auth0-developer-hub/devday-24-labs-demo-app.git
```

2. Move into the cloned directory:

```
cd devday-24-labs-demo-app
```

3. Install the required dependencies:

```
npm install
```

4. Set up the environment variables: You will find a `.env.example` file in the root directory. Create a new file `.env` and copy over the contents from `.env.example` file. Fill in the appropriate values.

5. Run the project: Enter the following command in the terminal:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Happy Coding!
