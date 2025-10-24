// Copyright 2025 Cristiano A. - MIT License
// Version 2.0 - Added support for Organizational Units and a Welcome Email feature.

/**
 * @OnlyCurrentDoc
 * The onOpen() function runs automatically when the spreadsheet is opened.
 * It creates a custom menu in the spreadsheet UI to easily run the script.
 */
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('🚀 Onboarding Automation v2.0')
      .addItem('Create New Users Now', 'createUsersFromSheet')
      .addToUi();
}

/**
 * Main function that reads the sheet and creates the users.
 */
function createUsersFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("New User Onboarding");
  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();
  const ui = SpreadsheetApp.getUi();

  // Skip the header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Get data from each column
    const firstName = row[0];
    const lastName = row[1];
    const email = row[2];
    const tempPassword = row[3];
    const groups = row[4].toString().split(',').map(group => group.trim());
    const jobTitle = row[5];
    const orgUnitPath = row[6] || "/"; // NEW: Gets the OU from column G. If empty, defaults to the root "/".
    const managerEmail = row[7]; // NEW: Gets the manager's email from column H.
    const statusCell = sheet.getRange(i + 1, 9); // The Status column is now column I (the 9th column).
    const currentStatus = statusCell.getValue();

    // Only process rows where status is empty and an email is provided
    if (currentStatus === "" && email !== "") {
      try {
        const newUser = {
          primaryEmail: email,
          name: {
            givenName: firstName,
            familyName: lastName,
          },
          password: tempPassword,
          changePasswordAtNextLogin: true,
          orgUnitPath: orgUnitPath // NEW: Sets the user's Organizational Unit.
        };

        // Create the user using the Admin SDK API
        AdminDirectory.Users.insert(newUser);
        statusCell.setValue("User Created ✅");

        // Add user to groups
        if (groups.length > 0 && groups[0] !== "") {
          for (const groupEmail of groups) {
            const member = { email: email, role: 'MEMBER' };
            AdminDirectory.Members.insert(member, groupEmail);
          }
          statusCell.setValue(`User Created & Added to Groups ✅`);
        }

        // NEW: Send a welcome email if a manager's email is provided.
        if (managerEmail) {
          const subject = `✅ New Account Created: ${firstName} ${lastName}`;
          const body = `Hello,\n\nThe Google Workspace account for the new employee, ${firstName} ${lastName}, has been successfully created.\n\nDetails:\n- Email: ${email}\n- Temporary Password: ${tempPassword}\n\nPlease instruct them to log in and change their password as soon as possible.\n\nBest regards,\nIT Automation Bot`;
          
          GmailApp.sendEmail(managerEmail, subject, body);
          statusCell.setValue(statusCell.getValue() + " | Welcome Email Sent ✅");
        }
        
        ui.alert(`Success! User ${email} has been created.`);

      } catch (err) {
        // If an error occurs (e.g., user already exists), write the error message to the status cell
        statusCell.setValue(`Error: ${err.message}`);
        Logger.log(`Failed to create user ${email}. Error: ${err.message}`);
        ui.alert(`Failed to create user ${email}. Error: ${err.message}`);
      }
    }
  }
}
