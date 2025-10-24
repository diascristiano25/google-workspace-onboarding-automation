# Google Workspace - Automated User Onboarding Script v2.0

A Google Apps Script to automate the creation of new users in Google Workspace directly from a Google Sheet. This tool saves IT administrators hours of manual work, prevents configuration errors, and ensures a secure and consistent onboarding process.

## The Problem
Manually onboarding new employees in the Google Admin Console is a repetitive, time-consuming, and error-prone process. It involves creating the user, setting a password, assigning them to the correct Organizational Unit, adding them to multiple email groups, and notifying their manager—one by one.

## The Solution
This script streamlines the entire process. An administrator simply fills out a row in a Google Sheet with the new employee's information and runs the script. The automation handles the rest.

### Key Features v2.0
* **Automated User Creation:** Creates new user accounts based on data from a Google Sheet.
* **Automatic Organizational Unit (OU) Assignment:** Automatically places new users in the correct OU (e.g., `/Sales`, `/Marketing`) to ensure proper security policies are applied from day one.
* **Bulk Group Assignment:** Adds the new user to multiple groups specified in the sheet (e.g., `all@company.com`, `sales@company.com`).
* **Automated Welcome Email:** Notifies the new user's manager via email once the account is created, including the new email address and temporary password.
* **Secure by Default:** Forces the new user to change their temporary password upon their first login.
* **Status Tracking:** Updates the Google Sheet in real-time with the status ("Success" or "Error"), providing a clear audit trail.
* **Simple Interface:** Adds a custom menu directly into the Google Sheet, so no coding knowledge is required for daily use.

## Live Demo
*(Your GIF is now even more important! Show the new columns `OrganizationalUnitPath` and `ManagerEmail` being used, and the welcome email arriving in your inbox.)*

![Demo GIF](link-para-seu-novo-gif-aqui.gif)

## Setup & Installation (5-Minute Setup)

**1. Create the Google Sheet:**
   - Create a new Google Sheet.
   - Rename the first tab to `New User Onboarding`.
   - Create the following headers in the first row, in this exact order: `FirstName`, `LastName`, `Email`, `TemporaryPassword`, `Groups (comma-separated)`, `JobTitle`, `OrganizationalUnitPath`, `ManagerEmail`, `Status`.

**2. Enable the Required APIs:**
   - This script requires two Google Workspace APIs. This is a critical step.
   - In your Apps Script editor, go to `Services` on the left menu and click `+ Add a service`.
   - Find and add the **Admin Directory API**.
   - Find and add the **Gmail API** (this is new for v2.0 to send the welcome email).

**3. Paste the Code:**
   - In your Google Sheet, go to `Extensions > Apps Script`.
   - Erase any existing code and paste the code from the `Code.gs` file.
   - Save the project.

**4. Reload and Authorize:**
   - Reload your Google Sheet. A new menu named `🚀 Onboarding Automation v2.0` will appear.
   - The first time you run the script, Google will ask for permissions for both the Admin SDK and Gmail. You must grant them.

## How to Use
1.  Fill in the details for one or more new users in the `New User Onboarding` sheet, including the new `OrganizationalUnitPath` and `ManagerEmail` columns.
2.  Go to the `🚀 Onboarding Automation v2.0` menu and click `Create New Users Now`.
3.  The script will process each row and update the `Status` column accordingly.

## License
This project is licensed under the MIT License.

## Contribution
Found a bug or have a suggestion? Feel free to open an "Issue" or submit a "Pull Request".
