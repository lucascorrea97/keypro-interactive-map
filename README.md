# **Keypro Interactive Map**

Welcome to the **Keypro Interactive Map** project. This project is built using **React** version `18`, and follows best practices for structuring the codebase into reusable modules.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
  - [Fixtures](#fixtures)
  - [Design System](#design-system)
  - [Features](#features)
  - [Navigators](#navigators)
  - [Screens](#screens)

## **Project Overview**

The **Keypro Interactive Map** is a modern web app built using React. It is designed with scalability and maintainability in mind, utilizing a modular structure to ensure easy integration of new features, a consistent design system, and a seamless user experience across different screens.

---

## **Installation & Setup**

To get started with the project, follow these steps:

### **Prerequisites**

- **Docker** (Ensure Docker is installed and running)

### **Step-by-Step Guide**

1. **Clone the repository:**

```bash
   git clone https://github.com/lucascorrea97/keypro-interactive-map.git
   cd keypro-interactive-map
```

2. **Start the application with Docker:**

```bash
   docker-compose up --build
```

## **How to Use the Application**

Follow these steps to effectively navigate and utilize the main features of the **Keypro Interactive Map**:

### Step 1: Register a New Account

1. Open the application in your browser.
2. Fill out the sign-up form with your details:
   - **Email**
   - **Password**
   - **Confirm Password**
3. Submit the form to create your new account.

### Step 2: Sign In

1. Enter your registered **Email** and **Password**.
2. Click the **Sign In** button to access the application using your account.

### Step 3: Create a New Point of Interest (POI)

1. Once signed in, locate the **"+" button** on the bottom left corner of the screen.
2. Click the **"+" button**.
3. Click anywhere on the map where you want to create a marker for your Point of Interest.
4. A marker will be placed at that location.

### Step 4: View and Edit the POI

1. To view or edit an existing Point of Interest, simply click on the marker you previously created on the map.
2. An edit form will appear with the details of the POI.
3. Fill out the necessary fields in the edit form.
4. Click the **"Save"** button to update the Point of Interest with the new details.

---

By following these steps, you can easily register, sign in, create, and manage Points of Interest within the **Keypro Interactive Map**.

## **Folder Structure**

The project is structured into several key directories, each serving a unique purpose in organizing the codebase.

### **Design System**

The `designSystem` folder holds all the reusable styles, components, and themes that help maintain a consistent design across the app. This includes colors, typography, button styles, and other UI elements that follow the app’s design guidelines.

- **Key components include:**
  - **Button:** Buttons with different variants
  - **Colors:** Theme and color palette
  - **Spacing & Layout:** Consistent margin, padding, and layout configurations

### **Features**

The `features` folder houses the primary functionalities or feature sets of the application. Each feature is typically modularized into its own subfolder, which includes its own logic, services, and components.

- **Authentication:** Handles user authentication and management
- **Interactive Map:** Provides a user interface for map interactions and displays geolocation data

#### **Pages**

The `pages` folders holds the individual pages components for the feature. Each pages represents a distinct view or page in the app and is connected to a specific feature.

- **Examples of pages:**

  - **authentication:** The main authentication page
  - **interactive-map:** The main page for the interactive-map

  #### **Containers**

The `containers` folders holds the components used in the pages for each feature.

#### **Services**

The `services` folders is where all the queries, mutations, contexts and types are located for each feature.

### **Future improvements:**

To further improve the project I would focus on the following areas:

- **End-to-End (E2E) Testing:** Currently, we utilize unit tests with mocked data, which does not provide the required confidence in the tests. We should implement E2E tests for the interactive map to ensure comprehensive coverage and reliable functionality.

- **Custom Components:** Transitioning from Chakra UI components to custom-built components will allow us to leverage design system tokens more effectively, providing a tailored experience for our users.

- **GitHub Codespaces:** Finishing the Github Codespaces setup. I have tried setting it up, however, I cannot verify if the setup is working properly due to firewall restrictions. My work laptop is from my current employer and I cannot turn that off.
