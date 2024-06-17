# Dev Day 24 Labs Demo App

Learn Identity is an educative Next.js web application designed to bridge the gap between identity experts and eager students. The application allows for instructors to generate identity related courses and for students to enroll and learn from them.

**But Learn Identity needs your help!** The application as it stands is not secure, anyone can access and edit any content. We have received complains from users who want to get rid of passwords, but that’s all we offer right now. Admins are eage to enforce instructors would to use additional authentication factors such as OTP and security keys.

By downloading the application and completing the labs, you'll help secure and improve the experience for the application.

So what are you waiting for, complete any of the following labs to get you started:

## Hands-on labs

### Pre-Lab (Mandatory): Project Setup

Welcome to your Auth0 journey! Before we dive into the exciting world of identity management and authentication, it's essential to have your App and Auth0 account up and running. This pre-lab will guide you through the initial setup process so you're ready to tackle the hands-on challenges ahead.

What We'll Cover:

- **Account Creation**: We'll walk you through creating your free Auth0 developer account. It's a quick and easy process.
- **Tenant Setup**: Your Auth0 tenant is your personal space for managing applications, users, and authentication flows. We'll show you how to set up your first tenant and set things up to run this application.
- **Project Setup**: Configure and get this project up and running on your local environment.

[![Pre-Lab (Mandatory): Project Setup](https://img.shields.io/badge/Visit-Pre%20Lab%20%28Mandatory%29%3A%20Project%20Setup-3f59e4?style=for-the-badge)](#todo-add-link)

### Unlock the Future: Passwordless Login with Passkeys

Tired of remembering complex passwords? Ready for a more secure and convenient way to log in? In this lab, you'll:

- **Discover Passkeys**: Learn how passkeys replace traditional passwords with secure cryptographic keys tied to your devices.
- **Test Drive Auth0 Passkey Integration**: Explore how to leverage Auth0 to implement passkey authentication, ensuring the highest level of security for your user accounts in just a few minutes
- **Get Hands-On**: Participate in a guided walkthrough to set up and use passkeys on your own device.

[![Unlock the Future: Passwordless Login with Passkeys](https://img.shields.io/badge/Visit-%20Unlock%20the%20Future%3A%20Passwordless%20Login%20with%20Passkeys-3f59e4?style=for-the-badge)](#todo-add-link)

### Securing Instructor Accounts with Auth0 Actions and Custom MFA

Protect the knowledge-keepers! Join our hands-on lab and dive into the world of adaptive authentication. You'll:

- **Harness the Power of Auth0 Actions**: Discover how to tailor your authentication workflows with code, creating a more secure environment for instructors and their valuable course content.
- **Use Actions to Enrich the Data Available in the UI**: Create an Action to customize the ID Token, including information about the roles the user has assgined.
- **Implement Stronger MFA for Instructors**: Learn how to enforce multi-factor authentication (MFA) specifically for instructor accounts, using methods like OTP or security keys to add an extra layer of protection. (Only if they are not using passkeys, as passkeys won’t need a 2FA)

[![Securing Instructor Accounts with Auth0 Actions and Custom MFA](https://img.shields.io/badge/Visit-%20Securing%20Instructor%20Accounts%20with%20Auth0%20Actions%20and%20Custom%20MFA-3f59e4?style=for-the-badge)](#todo-add-link)

### Fine-Grained Permissions with FGA: Securing Access to Courses and Content

Dive into the world of granular permissions and ensure that the right people have access to the right resources. In this hands-on lab, you'll:

-   **Discover Auth0 Fine-Grained Authorization (FGA):** Explore how FGA empowers you to define precise access rules for your application, safeguarding your data and user experience.

-   **Implement Instructor-Specific Permissions:** Learn how to configure FGA to allow instructors to edit only the courses they have created, preventing unauthorized modifications.

-   **Protect Student Access:** Ensure that students can only access the courses they are enrolled in, maintaining the integrity of your learning environment.

-   **Explore Best Practices:** Discuss strategies for designing a secure and scalable authorization system using FGA.

[![Fine-Grained Permissions with FGA: Securing Access to Courses and Content](https://img.shields.io/badge/Visit-%20Fine%20Grained%20Permissions%20with%20FGA%3A%20Securing%20Access%20to%20Courses%20and%20Content-3f59e4?style=for-the-badge)](#todo-add-link)

### Beyond Login: Personalize and Protect with Auth0 Forms for Actions

Transform your authentication experience! Join us for a hands-on exploration of Auth0 Forms for Actions, a new tool that empowers you to seamlessly integrate custom forms and logic into your login and signup flows. In this lab, you'll:

-   **Discover the Power of Forms for Actions:** Learn how this feature lets you gather valuable user data, present terms and conditions, or create multi-step registration processes -- all within the secure Auth0 environment.

-   **Craft a User Profiling Form:** Design a form to capture additional information from new users (interests, experience levels, etc.) to personalize their onboarding and course recommendations.

-   **Explore Best Practices:** Discuss strategies for designing user-friendly forms that enhance the registration and login process while protecting user privacy.

[![Beyond Login: Personalize and Protect with Auth0 Forms for Actions](https://img.shields.io/badge/Visit-%20Beyond%20Login%3A%C2%A0Personalize%20and%20Protect%20with%20Auth0%20Forms%20for%20Actions-3f59e4?style=for-the-badge)](#todo-add-link)

### Invite workflow using the Auth0 Organizations Invitation feature

Whether you're building a B2B SaaS or a B2C application, in this lab, you'll learn how to leverage the Member Invitation workflow provided by Auth0 Organizations to make onboarding users a whole lot easier!

-   **Discover the flexibility of Invitation** to bring customers into your application(s) in a flexible yet safe and secure manner - especially when it comes to building collaborations that operate in a team-oriented fashion.

-   **Leverage** **Branding** that allows the creation of bespoke email invitations to match the look and feel of your product identity.

-   **Explore Best Practices** and strategies for implementing invitations as part of registration workflows that help mitigate many of the common vulnerabilities from an attack surface perspective.

[![Invite workflow using the Auth0 Organizations Invitation feature](https://img.shields.io/badge/Visit-%20Invite%20workflow%20using%20the%20Auth0%20Organizations%20Invitation%20feature-3f59e4?style=for-the-badge)](#todo-add-link)

## Project Set up

To get started with the project, follow the steps below:

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

(Note: This requires Node.js and npm to be installed on your machine.)

4. Set up the environment variables: You will find a `.env.example` file in the root directory. Create a new file `.env` and copy over the contents from `.env.example` file. Fill in the appropriate values.

If you are not sure how to set this up, please visit the [Pre-Lab (Mandatory): Project Setup](#todo-add-link)

5. Run the project: Enter the following command in the terminal:

```
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Happy Coding!